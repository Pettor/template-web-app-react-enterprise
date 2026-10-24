import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import type { FolderPermission } from "./FileSystemAccess";
import type { GitHubErrorKind } from "./GitHubBackend";

/**
 * Where the data is synced:
 * - `local`: this browser only
 * - `folder`: a folder on disk (any folder, a OneDrive/iCloud/Dropbox folder, or a local Git clone)
 * - `github`: a GitHub repository through its REST API; works in any browser, including on phones
 */
export type SyncMethod = "local" | "folder" | "github";

export type SyncState = "local" | "syncing" | "synced" | "error" | "needs-permission";

/** The Git side of a sync: a local clone (read-only info) or a GitHub repository. */
export interface GitSyncStatus {
  remoteUrl?: string;
  branch?: string;
  lastSyncedAt?: string;
  error?: string;
  /** GitHub sync only: what kind of problem `error` is. */
  errorKind?: GitHubErrorKind;
  /** Folder sync only: the folder is a Git clone, committed and pushed with the user's own Git tools. */
  isLocalClone?: boolean;
}

export interface SyncStatus {
  state: SyncState;
  method: SyncMethod;
  /** The folder's name, or `owner/repo` for GitHub. */
  folderName?: string;
  lastSyncedAt?: string;
  error?: string;
  /** Conflicts resolved since sync started; the losing versions are in `.conflicts/`. */
  conflicts?: number;
  /** GitHub sync only: local changes not yet committed. */
  hasPendingChanges?: boolean;
  git?: GitSyncStatus;
}

/**
 * The connected data folder. Browser folders are kept as a handle in
 * IndexedDB (`FolderHandleStore`); a GitHub connection is kept in
 * {@link githubConnectionAtom}.
 */
export type SyncConnection = { kind: "browser-folder"; handle: FileSystemDirectoryHandle } | GitHubConnection;

/** Signs in with a personal access token; GitHub's API doesn't accept account passwords. */
export interface GitHubConnection {
  kind: "github";
  owner: string;
  repo: string;
  token: string;
}

function defaultDeviceName(): string {
  const agent = typeof navigator === "undefined" ? "" : `${navigator.platform} ${navigator.userAgent}`;
  if (/iphone|ipad/i.test(agent)) {
    return "iPhone";
  }
  if (/android/i.test(agent)) {
    return "Android";
  }
  if (/mac/i.test(agent)) {
    return "Mac";
  }
  if (/win/i.test(agent)) {
    return "Windows PC";
  }
  if (/linux/i.test(agent)) {
    return "Linux PC";
  }
  return "This device";
}

export interface SyncSettings {
  /** Named in commit messages, e.g. `data: update from Mac`. */
  deviceName: string;
}

export const syncSettingsAtom = atomWithStorage<SyncSettings>(
  "app-sync-settings",
  { deviceName: defaultDeviceName() },
  undefined,
  { getOnInit: true }
);

/** Kept in this browser's storage so the device stays connected; never written to the data folder. */
export const githubConnectionAtom = atomWithStorage<GitHubConnection | null>("app-sync-github", null, undefined, {
  getOnInit: true,
});

/** The connected data folder, restored on start. */
export const syncConnectionAtom = atom<SyncConnection | null>(null);

/** Browser folders only: whether the browser still lets us open the folder. */
export const folderPermissionAtom = atom<FolderPermission | null>(null);

export const syncStatusAtom = atom<SyncStatus>({ state: "local", method: "local" });

/** Bumped to ask the sync lifecycle for an immediate pull and push (and GitHub commit). */
export const syncRequestAtom = atom<number>(0);
