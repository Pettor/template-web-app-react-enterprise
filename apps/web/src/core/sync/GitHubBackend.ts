import type { FolderBackend, FolderFileInfo } from "./FolderBackend";
import { MANIFEST_FILE } from "./FolderSync";

const API = "https://api.github.com";
const FILE_MODE = "100644";
const PREFETCH_CONCURRENCY = 6;
/** Generated or write-only files; read on demand instead of prefetched. */
const SKIP_PREFETCH = /^AGENTS\.md$/;

export interface GitHubRepoRef {
  owner: string;
  repo: string;
  token: string;
}

/**
 * What went wrong talking to GitHub, so the UI can explain it:
 * - `unauthorized`: the token is wrong, expired or revoked
 * - `not-found`: no such repository, or the token can't see it
 * - `forbidden`: the token lacks permission (e.g. read-only)
 * - `rate-limited`: too many requests; sync resumes after `resetAt`
 * - `conflict`: another device pushed first; pull and try again
 * - `network`: no connection
 * - `http`: anything else
 */
export type GitHubErrorKind =
  "unauthorized" | "not-found" | "forbidden" | "rate-limited" | "conflict" | "network" | "http";

export class GitHubError extends Error {
  constructor(
    readonly kind: GitHubErrorKind,
    message: string,
    /** Rate limits only: when requests are allowed again (ms since the epoch). */
    readonly resetAt?: number
  ) {
    super(message);
    this.name = "GitHubError";
  }
}

export interface GitHubRepoInfo {
  isPrivate: boolean;
  canPush: boolean;
  defaultBranch: string;
}

interface StagedChange {
  /** `null` removes the file. */
  content: string | null;
  sha: string | null;
  /** The file's sha in the snapshot when the change was staged; `undefined` when it didn't exist. */
  base: string | undefined;
}

type FetchLike = (input: string, init?: RequestInit) => Promise<Response>;

const encoder = new TextEncoder();
const decoder = new TextDecoder();

/** The sha Git gives a file with this content, so a pushed file isn't downloaded again. */
export async function gitBlobSha(content: string): Promise<string> {
  const body = encoder.encode(content);
  const header = encoder.encode(`blob ${body.byteLength}\0`);
  const bytes = new Uint8Array(header.byteLength + body.byteLength);
  bytes.set(header);
  bytes.set(body, header.byteLength);
  const digest = new Uint8Array(await crypto.subtle.digest("SHA-1", bytes));
  return [...digest].map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

/** {@link FolderFileInfo.lastModified} stands in for the sha: equal shas, equal numbers. */
function shaToNumber(sha: string): number {
  return Number.parseInt(sha.slice(0, 12), 16);
}

function toBase64(text: string): string {
  const bytes = encoder.encode(text);
  let binary = "";
  for (let index = 0; index < bytes.length; index += 0x8000) {
    binary += String.fromCharCode(...bytes.subarray(index, index + 0x8000));
  }
  return btoa(binary);
}

function fromBase64(base64: string): string {
  const binary = atob(base64.replace(/\s/g, ""));
  return decoder.decode(Uint8Array.from(binary, (char) => char.charCodeAt(0)));
}

function isHidden(path: string): boolean {
  return path.split("/").some((part) => part.startsWith("."));
}

/**
 * Accepts `name`, `owner/name`, `github.com/owner/name` or a clone URL and
 * returns the owner and name; a bare name belongs to `owner`.
 */
export function parseRepository(owner: string, repository: string): { owner: string; repo: string } {
  const cleaned = repository
    .trim()
    .replace(/^git@github\.com:/, "")
    .replace(/^(https?:\/\/)?(www\.)?github\.com\//, "")
    .replace(/\.git$/, "")
    .replace(/\/+$/, "");
  const parts = cleaned.split("/").filter(Boolean);
  return parts.length >= 2
    ? { owner: parts[parts.length - 2]!, repo: parts[parts.length - 1]! }
    : { owner: owner.trim(), repo: cleaned };
}

/**
 * The data folder as a GitHub repository, through the REST API; works in any
 * browser, including on phones.
 *
 * Keeps a snapshot of the default branch in memory: {@link refresh} loads the
 * newest commit, reads and writes from {@link FolderSync} only touch the
 * snapshot, and {@link commit} pushes every staged change as one commit. A
 * staged file that changed on GitHub in the meantime is dropped on refresh, so
 * the next pull merges the remote version by `updatedAt`.
 */
export class GitHubBackend implements FolderBackend {
  private branch: string | null = null;
  /** `undefined` until the first refresh; `null` while the repository is empty. */
  private head: string | null | undefined = undefined;
  private treeSha: string | null = null;
  private tree = new Map<string, string>();
  private readonly staged = new Map<string, StagedChange>();
  private readonly blobs = new Map<string, string>();
  private refEtag: string | null = null;
  private blockedUntil = 0;

  constructor(
    private readonly repoRef: GitHubRepoRef,
    private readonly fetcher: FetchLike = (input, init) => fetch(input, init)
  ) {}

  get name(): string {
    return `${this.repoRef.owner}/${this.repoRef.repo}`;
  }

  get currentBranch(): string | null {
    return this.branch;
  }

  /** Local changes not yet pushed. */
  get hasChanges(): boolean {
    return this.staged.size > 0;
  }

  private repoPath(path: string): string {
    return `/repos/${encodeURIComponent(this.repoRef.owner)}/${encodeURIComponent(this.repoRef.repo)}${path}`;
  }

  private async request(path: string, init: RequestInit = {}): Promise<Response> {
    if (Date.now() < this.blockedUntil) {
      throw new GitHubError("rate-limited", "GitHub API rate limit reached", this.blockedUntil);
    }
    let response: Response;
    try {
      response = await this.fetcher(`${API}${path}`, {
        ...init,
        cache: "no-store",
        headers: {
          Accept: "application/vnd.github+json",
          Authorization: `Bearer ${this.repoRef.token}`,
          "X-GitHub-Api-Version": "2022-11-28",
          ...(init.body ? { "Content-Type": "application/json" } : {}),
          ...init.headers,
        },
      });
    } catch (error) {
      throw new GitHubError("network", error instanceof Error ? error.message : String(error));
    }
    if (response.ok || response.status === 304) {
      return response;
    }

    let message = `${response.status} ${response.statusText}`.trim();
    try {
      const body = (await response.json()) as { message?: string };
      message = body.message ?? message;
    } catch {
      // Keep the status line.
    }
    const remaining = response.headers.get("x-ratelimit-remaining");
    if (response.status === 429 || (response.status === 403 && remaining === "0")) {
      const reset = Number(response.headers.get("x-ratelimit-reset"));
      const retryAfter = Number(response.headers.get("retry-after"));
      this.blockedUntil = reset > 0 ? reset * 1000 : Date.now() + (retryAfter > 0 ? retryAfter : 60) * 1000;
      throw new GitHubError("rate-limited", message, this.blockedUntil);
    }
    if (response.status === 401) {
      throw new GitHubError("unauthorized", message);
    }
    if (response.status === 403) {
      throw new GitHubError("forbidden", message);
    }
    if (response.status === 404) {
      throw new GitHubError("not-found", message);
    }
    throw new GitHubError("http", message);
  }

  private async json<T>(path: string, init?: RequestInit): Promise<T> {
    return (await (await this.request(path, init)).json()) as T;
  }

  /** Checks the token and repository before connecting. */
  async info(): Promise<GitHubRepoInfo> {
    const repo = await this.json<{ private: boolean; default_branch: string; permissions?: { push?: boolean } }>(
      this.repoPath("")
    );
    this.branch = repo.default_branch;
    return { isPrivate: repo.private, canPush: repo.permissions?.push ?? false, defaultBranch: repo.default_branch };
  }

  /** The default branch's newest commit, or `null` while the repository is empty. */
  private async fetchHead(): Promise<string | null> {
    if (!this.branch) {
      await this.info();
    }
    let response: Response;
    try {
      response = await this.request(this.repoPath(`/git/ref/heads/${encodeURIComponent(this.branch!)}`), {
        headers: this.refEtag && this.head ? { "If-None-Match": this.refEtag } : {},
      });
    } catch (error) {
      // An empty repository answers 409; a repository without the branch yet answers 404.
      if (error instanceof GitHubError && (error.kind === "not-found" || error.message.includes("empty"))) {
        return null;
      }
      throw error;
    }
    if (response.status === 304) {
      return this.head ?? null;
    }
    this.refEtag = response.headers.get("etag");
    const ref = (await response.json()) as { object: { sha: string } };
    return ref.object.sha;
  }

  /**
   * Loads the newest commit if it changed since the last refresh. Staged
   * changes to files that changed remotely are dropped. Returns whether
   * anything changed.
   */
  async refresh(): Promise<boolean> {
    const head = await this.fetchHead();
    if (head === this.head) {
      return false;
    }

    const tree = new Map<string, string>();
    let treeSha: string | null = null;
    if (head) {
      const commit = await this.json<{ tree: { sha: string } }>(this.repoPath(`/git/commits/${head}`));
      treeSha = commit.tree.sha;
      const listing = await this.json<{ tree: { path: string; type: string; sha: string }[]; truncated: boolean }>(
        this.repoPath(`/git/trees/${treeSha}?recursive=1`)
      );
      if (listing.truncated) {
        throw new GitHubError("http", "The repository has too many files to sync");
      }
      for (const entry of listing.tree) {
        if (entry.type === "blob") {
          tree.set(entry.path, entry.sha);
        }
      }
    }

    for (const [path, change] of this.staged) {
      if (tree.get(path) !== change.base) {
        this.staged.delete(path);
      }
    }
    this.head = head;
    this.treeSha = treeSha;
    this.tree = tree;

    const live = new Set([...tree.values(), ...[...this.staged.values()].map((change) => change.sha)]);
    for (const sha of this.blobs.keys()) {
      if (!live.has(sha)) {
        this.blobs.delete(sha);
      }
    }
    await this.prefetch();
    return true;
  }

  /** Downloads changed files a few at a time, so the pull that follows doesn't wait on each in turn. */
  private async prefetch(): Promise<void> {
    const missing = [...this.tree.entries()]
      .filter(([path, sha]) => !this.blobs.has(sha) && !this.staged.has(path))
      .filter(([path]) => !isHidden(path) && !SKIP_PREFETCH.test(path))
      .map(([, sha]) => sha);
    const queue = [...new Set(missing)];
    const workers = Array.from({ length: Math.min(PREFETCH_CONCURRENCY, queue.length) }, async () => {
      for (let sha = queue.shift(); sha; sha = queue.shift()) {
        await this.readBlob(sha);
      }
    });
    await Promise.all(workers);
  }

  private async readBlob(sha: string): Promise<string> {
    const cached = this.blobs.get(sha);
    if (cached !== undefined) {
      return cached;
    }
    const blob = await this.json<{ content: string; encoding: string }>(this.repoPath(`/git/blobs/${sha}`));
    const content = blob.encoding === "base64" ? fromBase64(blob.content) : blob.content;
    this.blobs.set(sha, content);
    return content;
  }

  /** The file's sha as the app sees it: staged changes over the snapshot. */
  private shaOf(path: string): string | undefined {
    const change = this.staged.get(path);
    if (change) {
      return change.sha ?? undefined;
    }
    return this.tree.get(path);
  }

  private async ensureLoaded(): Promise<void> {
    if (this.head === undefined) {
      await this.refresh();
    }
  }

  async list(dir: string, depth: number): Promise<FolderFileInfo[]> {
    await this.ensureLoaded();
    const prefix = dir ? `${dir.replace(/\/+$/, "")}/` : "";
    const paths = new Set([...this.tree.keys(), ...this.staged.keys()]);
    const files: FolderFileInfo[] = [];
    for (const path of paths) {
      const sha = this.shaOf(path);
      if (!sha || !path.startsWith(prefix)) {
        continue;
      }
      const rest = path.slice(prefix.length);
      if (rest.split("/").length - 1 <= depth && !isHidden(rest)) {
        files.push({ path, lastModified: shaToNumber(sha) });
      }
    }
    return files.sort((a, b) => a.path.localeCompare(b.path));
  }

  async stat(path: string): Promise<number | null> {
    await this.ensureLoaded();
    const sha = this.shaOf(path);
    return sha ? shaToNumber(sha) : null;
  }

  async read(path: string): Promise<string> {
    await this.ensureLoaded();
    const change = this.staged.get(path);
    if (change?.content != null) {
      return change.content;
    }
    const sha = this.shaOf(path);
    if (!sha) {
      throw new GitHubError("not-found", `${path} not found`);
    }
    return this.readBlob(sha);
  }

  async write(path: string, content: string): Promise<number> {
    await this.ensureLoaded();
    const sha = await gitBlobSha(content);
    const base = this.staged.has(path) ? this.staged.get(path)!.base : this.tree.get(path);
    if (sha === base) {
      this.staged.delete(path);
    } else {
      this.staged.set(path, { content, sha, base });
    }
    this.blobs.set(sha, content);
    return shaToNumber(sha);
  }

  async remove(path: string): Promise<void> {
    await this.ensureLoaded();
    const existing = this.staged.get(path);
    const base = existing ? existing.base : this.tree.get(path);
    if (base === undefined) {
      this.staged.delete(path);
    } else {
      this.staged.set(path, { content: null, sha: null, base });
    }
  }

  /** An empty repository has no tree to build on; its first file goes through the contents API. */
  private async initialize(message: string): Promise<void> {
    const [path, change] =
      [...this.staged.entries()].find(([candidate, staged]) => candidate === MANIFEST_FILE && staged.content) ??
      [...this.staged.entries()].find(([, staged]) => staged.content !== null)!;
    let created: { content: { sha: string }; commit: { sha: string; tree: { sha: string } } };
    try {
      created = await this.json(this.repoPath(`/contents/${path.split("/").map(encodeURIComponent).join("/")}`), {
        method: "PUT",
        body: JSON.stringify({ message, content: toBase64(change.content!) }),
      });
    } catch (error) {
      // Another device created the first commit at the same time.
      if (error instanceof GitHubError && error.kind === "http") {
        throw new GitHubError("conflict", error.message);
      }
      throw error;
    }
    this.staged.delete(path);
    this.tree.set(path, created.content.sha);
    this.head = created.commit.sha;
    this.treeSha = created.commit.tree.sha;
    this.refEtag = null;
  }

  /**
   * Pushes every staged change as one commit. Throws a `conflict`
   * {@link GitHubError} when another device pushed first: refresh, pull, push
   * and commit again. Returns whether a commit was made.
   */
  async commit(message: string): Promise<boolean> {
    await this.ensureLoaded();
    if (this.staged.size === 0) {
      return false;
    }
    // Only removals of files that don't exist yet: nothing to do.
    if (this.head === null && [...this.staged.values()].every((change) => change.content === null)) {
      this.staged.clear();
      return false;
    }
    if (this.head === null) {
      await this.initialize(message);
      if (this.staged.size === 0) {
        return true;
      }
    }

    const entries = [...this.staged.entries()].map(([path, change]) =>
      change.content === null
        ? { path, mode: FILE_MODE, type: "blob", sha: null }
        : { path, mode: FILE_MODE, type: "blob", content: change.content }
    );
    const tree = await this.json<{ sha: string }>(this.repoPath("/git/trees"), {
      method: "POST",
      body: JSON.stringify({ base_tree: this.treeSha, tree: entries }),
    });
    const commit = await this.json<{ sha: string }>(this.repoPath("/git/commits"), {
      method: "POST",
      body: JSON.stringify({ message, tree: tree.sha, parents: [this.head] }),
    });
    try {
      await this.request(this.repoPath(`/git/refs/heads/${encodeURIComponent(this.branch!)}`), {
        method: "PATCH",
        body: JSON.stringify({ sha: commit.sha, force: false }),
      });
    } catch (error) {
      if (error instanceof GitHubError && error.kind === "http") {
        throw new GitHubError("conflict", error.message);
      }
      throw error;
    }

    for (const [path, change] of this.staged) {
      if (change.sha) {
        this.tree.set(path, change.sha);
      } else {
        this.tree.delete(path);
      }
    }
    this.staged.clear();
    this.head = commit.sha;
    this.treeSha = tree.sha;
    this.refEtag = null;
    return true;
  }
}
