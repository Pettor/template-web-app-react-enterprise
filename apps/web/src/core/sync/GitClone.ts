import type { FolderBackend } from "./FolderBackend";

export interface GitCloneInfo {
  /** The checked-out branch, or the short commit sha when detached. */
  branch: string | null;
  /** `origin`'s URL, else the first remote's; `null` when there is none. */
  remoteUrl: string | null;
}

/** The URL of `origin`, or else the first remote, in a `.git/config` file. */
export function parseRemoteUrl(config: string): string | null {
  let remote: string | null = null;
  const urls = new Map<string, string>();
  for (const line of config.split(/\r?\n/)) {
    const section = /^\s*\[\s*remote\s+"([^"]+)"\s*\]/.exec(line);
    if (section) {
      remote = section[1]!;
      continue;
    }
    if (/^\s*\[/.test(line)) {
      remote = null;
      continue;
    }
    const url = /^\s*url\s*=\s*(.+?)\s*$/.exec(line);
    if (remote && url && !urls.has(remote)) {
      urls.set(remote, url[1]!);
    }
  }
  return urls.get("origin") ?? urls.values().next().value ?? null;
}

/** The branch named by a `.git/HEAD` file. */
export function parseHead(head: string): string | null {
  const text = head.trim();
  const ref = /^ref:\s*refs\/heads\/(.+)$/.exec(text);
  if (ref) {
    return ref[1]!;
  }
  return /^[0-9a-f]{40,64}$/.test(text) ? text.slice(0, 7) : null;
}

/**
 * Whether the data folder is a local Git clone, read from its `.git` folder.
 * The browser can't run Git, so the app only writes the working tree; this
 * lets the UI show where commits will go. Returns `null` for a plain folder.
 */
export async function readGitClone(folder: FolderBackend): Promise<GitCloneInfo | null> {
  let head: string;
  try {
    head = await folder.read(".git/HEAD");
  } catch {
    return null;
  }
  let remoteUrl: string | null = null;
  try {
    remoteUrl = parseRemoteUrl(await folder.read(".git/config"));
  } catch {
    // A clone without a config file has no remote.
  }
  return { branch: parseHead(head), remoteUrl };
}
