import { beforeEach, describe, expect, it } from "vitest";
import { FolderSync, serialize } from "./FolderSync";
import { GitHubBackend, GitHubError, gitBlobSha, parseRepository } from "./GitHubBackend";
import type { AppData } from "~/core/data/AppData";
import { addNote, createEmptyData, createNote, updateNote } from "~/core/data/AppData";

const TOKEN = "github_pat_test";

interface FakeCommit {
  tree: Map<string, string>;
}

/** Just enough of GitHub's REST API, kept in memory. */
class FakeGitHub {
  readonly blobs = new Map<string, string>();
  readonly commits = new Map<string, FakeCommit>();
  readonly trees = new Map<string, Map<string, string>>();
  head: string | null = null;
  isPrivate = true;
  requests: string[] = [];
  private nextId = 1;

  private id(prefix: string): string {
    return `${prefix}${String(this.nextId++).padStart(39, "0")}`;
  }

  private respond(status: number, body?: unknown, headers: Record<string, string> = {}): Response {
    return new Response(body === undefined ? null : JSON.stringify(body), { status, headers });
  }

  /** Test helper: the file at `path` on the branch, or `undefined`. */
  file(path: string): string | undefined {
    const sha = this.head ? this.commits.get(this.head)!.tree.get(path) : undefined;
    return sha ? this.blobs.get(sha) : undefined;
  }

  /** Test helper: commits a change as another device would. */
  async push(files: Record<string, string>): Promise<void> {
    const tree = new Map(this.head ? this.commits.get(this.head)!.tree : []);
    for (const [path, content] of Object.entries(files)) {
      const sha = await gitBlobSha(content);
      this.blobs.set(sha, content);
      tree.set(path, sha);
    }
    this.head = this.commit(tree);
  }

  private commit(tree: Map<string, string>): string {
    const sha = this.id("c");
    this.commits.set(sha, { tree });
    return sha;
  }

  readonly fetch = async (input: string, init: RequestInit = {}): Promise<Response> => {
    const headers = init.headers as Record<string, string>;
    if (headers.Authorization !== `Bearer ${TOKEN}`) {
      return this.respond(401, { message: "Bad credentials" });
    }
    const url = new URL(input);
    const method = init.method ?? "GET";
    const path = url.pathname.replace("/repos/you/app-data", "");
    this.requests.push(`${method} ${path}`);
    const body = init.body ? JSON.parse(init.body as string) : undefined;

    if (!url.pathname.startsWith("/repos/you/app-data")) {
      return this.respond(404, { message: "Not Found" });
    }
    if (path === "") {
      return this.respond(200, { private: this.isPrivate, default_branch: "main", permissions: { push: true } });
    }
    if (path === "/git/ref/heads/main") {
      if (!this.head) {
        return this.respond(409, { message: "Git Repository is empty." });
      }
      if (headers["If-None-Match"] === `"${this.head}"`) {
        return this.respond(304);
      }
      return this.respond(200, { object: { sha: this.head } }, { etag: `"${this.head}"` });
    }
    const commitMatch = /^\/git\/commits\/(\w+)$/.exec(path);
    if (commitMatch) {
      const treeSha = this.id("t");
      this.trees.set(treeSha, this.commits.get(commitMatch[1]!)!.tree);
      return this.respond(200, { tree: { sha: treeSha } });
    }
    const treeMatch = /^\/git\/trees\/(\w+)$/.exec(path);
    if (treeMatch && method === "GET") {
      const tree = this.trees.get(treeMatch[1]!)!;
      return this.respond(200, {
        truncated: false,
        tree: [...tree].map(([entryPath, sha]) => ({ path: entryPath, type: "blob", sha })),
      });
    }
    const blobMatch = /^\/git\/blobs\/(\w+)$/.exec(path);
    if (blobMatch) {
      const content = this.blobs.get(blobMatch[1]!)!;
      const bytes = new TextEncoder().encode(content);
      return this.respond(200, { encoding: "base64", content: btoa(String.fromCharCode(...bytes)) });
    }
    if (path.startsWith("/contents/") && method === "PUT") {
      if (this.head) {
        return this.respond(422, { message: "sha wasn't supplied" });
      }
      const bytes = Uint8Array.from(atob(body.content), (char) => char.charCodeAt(0));
      const content = new TextDecoder().decode(bytes);
      const sha = await gitBlobSha(content);
      this.blobs.set(sha, content);
      const tree = new Map([[decodeURIComponent(path.slice("/contents/".length)), sha]]);
      this.head = this.commit(tree);
      const treeSha = this.id("t");
      this.trees.set(treeSha, tree);
      return this.respond(201, { content: { sha }, commit: { sha: this.head, tree: { sha: treeSha } } });
    }
    if (path === "/git/trees" && method === "POST") {
      const tree = new Map(this.trees.get(body.base_tree)!);
      for (const entry of body.tree as { path: string; sha?: string | null; content?: string }[]) {
        if (entry.content === undefined) {
          tree.delete(entry.path);
        } else {
          const sha = await gitBlobSha(entry.content);
          this.blobs.set(sha, entry.content);
          tree.set(entry.path, sha);
        }
      }
      const sha = this.id("t");
      this.trees.set(sha, tree);
      return this.respond(201, { sha });
    }
    if (path === "/git/commits" && method === "POST") {
      const sha = this.id("c");
      this.commits.set(sha, { tree: this.trees.get(body.tree)! });
      (this.commits.get(sha) as FakeCommit & { parent?: string }).parent = body.parents[0];
      return this.respond(201, { sha });
    }
    if (path === "/git/refs/heads/main" && method === "PATCH") {
      const parent = (this.commits.get(body.sha) as FakeCommit & { parent?: string }).parent;
      if (parent !== this.head) {
        return this.respond(422, { message: "Update is not a fast forward" });
      }
      this.head = body.sha;
      return this.respond(200, { object: { sha: body.sha } });
    }
    return this.respond(404, { message: "Not Found" });
  };
}

function seed(): AppData {
  return addNote(createEmptyData(), createNote({ title: "Plan the launch" }, new Date("2026-10-21T08:00:00Z"), "N1"));
}

function backend(github: FakeGitHub, token = TOKEN): GitHubBackend {
  return new GitHubBackend({ owner: "you", repo: "app-data", token }, github.fetch);
}

describe("parseRepository", () => {
  it("accepts a name, owner/name or a URL", () => {
    expect(parseRepository("you", "app-data")).toEqual({ owner: "you", repo: "app-data" });
    expect(parseRepository("you", "team/app-data")).toEqual({ owner: "team", repo: "app-data" });
    expect(parseRepository("", "https://github.com/team/app-data.git")).toEqual({ owner: "team", repo: "app-data" });
    expect(parseRepository("", "git@github.com:team/app-data.git")).toEqual({ owner: "team", repo: "app-data" });
  });
});

describe("GitHubBackend", () => {
  let github: FakeGitHub;

  beforeEach(() => {
    github = new FakeGitHub();
  });

  it("computes the same blob sha as git", async () => {
    // `printf 'hello\n' | git hash-object --stdin`
    expect(await gitBlobSha("hello\n")).toBe("ce013625030ba8dba906f756967f9e9ca394464a");
  });

  it("pushes the first sync into an empty repository, starting with the manifest", async () => {
    const repo = backend(github);
    const sync = new FolderSync(repo);
    await repo.refresh();
    await sync.push(seed());

    expect(await repo.commit("data: sync")).toBe(true);
    expect(JSON.parse(github.file("app.json")!)).toMatchObject({ schema: "app.data/v1" });
    expect(JSON.parse(github.file("notes/N1.json")!)).toMatchObject({ id: "N1" });
    expect(github.file("AGENTS.md")).toContain("# Data folder");
    expect(repo.hasChanges).toBe(false);
    const puts = github.requests.filter((request) => request.startsWith("PUT"));
    expect(puts).toEqual(["PUT /contents/app.json"]);
  });

  it("brings another device's changes in and doesn't download its own files again", async () => {
    const phone = backend(github);
    const phoneSync = new FolderSync(phone);
    await phone.refresh();
    await phoneSync.push(seed());
    await phone.commit("data: sync");

    const laptop = backend(github);
    const laptopSync = new FolderSync(laptop);
    await laptop.refresh();
    const pulled = await laptopSync.pull(createEmptyData());
    expect(pulled.data.notes.N1?.title).toBe("Plan the launch");

    github.requests = [];
    expect(await phone.refresh()).toBe(false);
    expect(github.requests).toEqual(["GET /git/ref/heads/main"]);
    const again = await phoneSync.pull(seed());
    expect(again.changed).toBe(false);
  });

  it("drops a staged file another device changed, so the pull merges it by updatedAt", async () => {
    const phone = backend(github);
    const phoneSync = new FolderSync(phone);
    let phoneData = seed();
    await phone.refresh();
    await phoneSync.push(phoneData);
    await phone.commit("data: sync");

    // The laptop renames the note and pushes first.
    const remote = updateNote(phoneData, "N1", { title: "Remote title" }, new Date("2026-10-21T09:00:00Z"));
    await github.push({ "notes/N1.json": serialize(remote.notes.N1) });

    // Meanwhile the phone pins it, a bit later.
    phoneData = updateNote(phoneData, "N1", { pinned: true }, new Date("2026-10-21T09:05:00Z"));
    await phoneSync.push(phoneData);
    await expect(phone.commit("data: sync")).rejects.toMatchObject({ kind: "conflict" });

    await phone.refresh();
    const pulled = await phoneSync.pull(phoneData);
    await phoneSync.push(pulled.data);
    expect(await phone.commit("data: sync")).toBe(true);

    expect(JSON.parse(github.file("notes/N1.json")!)).toMatchObject({ pinned: true });
    const conflicts = [...github.commits.get(github.head!)!.tree.keys()].filter((path) =>
      path.startsWith(".conflicts/")
    );
    expect(conflicts).toEqual([".conflicts/notes/N1-2026-10-21T090000Z.json"]);
  });

  it("reports a wrong token and a missing repository", async () => {
    await expect(backend(github, "wrong").info()).rejects.toMatchObject({ kind: "unauthorized" });
    const missing = new GitHubBackend({ owner: "you", repo: "nope", token: TOKEN }, github.fetch);
    await expect(missing.info()).rejects.toBeInstanceOf(GitHubError);
    await expect(missing.info()).rejects.toMatchObject({ kind: "not-found" });
  });
});
