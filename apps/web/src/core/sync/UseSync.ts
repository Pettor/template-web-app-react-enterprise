import { useCallback } from "react";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { isFolderAccessSupported, pickFolder, requestFolderPermission } from "./FileSystemAccess";
import { clearFolderHandle, saveFolderHandle } from "./FolderHandleStore";
import type { GitHubErrorKind } from "./GitHubBackend";
import { GitHubBackend, GitHubError, parseRepository } from "./GitHubBackend";
import type { SyncSettings, SyncStatus } from "./SyncAtoms";
import {
  folderPermissionAtom,
  githubConnectionAtom,
  syncConnectionAtom,
  syncRequestAtom,
  syncSettingsAtom,
  syncStatusAtom,
} from "./SyncAtoms";

/** Outcome of picking a folder; anything but `connected` leaves sync as it was. */
export type FolderConnectResult = "connected" | "cancelled" | "failed";

/**
 * Outcome of connecting a GitHub repository; anything but `connected` leaves
 * sync as it was. `public` and `read-only` repositories are refused, and
 * `error` covers a wrong token, a missing repository or no connection.
 */
export type GitHubConnectResult =
  { result: "connected" | "public" | "read-only" } | { result: "error"; errorKind?: GitHubErrorKind; detail: string };

export interface GitHubCredentials {
  /** GitHub username or organization that owns the repository. */
  owner: string;
  /** Repository name, `owner/name` or its URL. */
  repository: string;
  /** Fine-grained personal access token with read and write access to the repository's contents. */
  token: string;
}

export interface UseSyncResult {
  /** Folder sync works here: Chrome, Edge or another Chromium browser on a computer. */
  isFolderSupported: boolean;
  status: SyncStatus;
  settings: SyncSettings;
  /** Opens the folder picker and starts syncing with the chosen folder. Must be called from a user gesture. */
  connectFolder: () => Promise<FolderConnectResult>;
  /** Checks the token and repository, then syncs through GitHub's API. Only private repositories are accepted. */
  connectGitHub: (credentials: GitHubCredentials) => Promise<GitHubConnectResult>;
  /** Re-grants access to the remembered folder after a browser restart. */
  reconnect: () => Promise<void>;
  /** Stops syncing; the data stays in this browser and in the folder or repository. */
  disconnect: () => Promise<void>;
  syncNow: () => void;
  setDeviceName: (name: string) => void;
}

export function useSync(): UseSyncResult {
  const status = useAtomValue(syncStatusAtom);
  const [settings, setSettings] = useAtom(syncSettingsAtom);
  const [connection, setConnection] = useAtom(syncConnectionAtom);
  const setGitHubConnection = useSetAtom(githubConnectionAtom);
  const setPermission = useSetAtom(folderPermissionAtom);
  const setSyncRequest = useSetAtom(syncRequestAtom);

  const connectFolder = useCallback(async (): Promise<FolderConnectResult> => {
    let picked: FileSystemDirectoryHandle;
    try {
      picked = await pickFolder();
      await saveFolderHandle(picked);
    } catch (error) {
      return error instanceof DOMException && error.name === "AbortError" ? "cancelled" : "failed";
    }
    setGitHubConnection(null);
    setConnection({ kind: "browser-folder", handle: picked });
    setPermission("granted");
    return "connected";
  }, [setConnection, setGitHubConnection, setPermission]);

  const connectGitHub = useCallback(
    async ({ owner, repository, token }: GitHubCredentials): Promise<GitHubConnectResult> => {
      const next = { kind: "github" as const, ...parseRepository(owner, repository), token: token.trim() };
      try {
        const info = await new GitHubBackend(next).info();
        if (!info.isPrivate) {
          return { result: "public" };
        }
        if (!info.canPush) {
          return { result: "read-only" };
        }
        await clearFolderHandle();
      } catch (error) {
        return {
          result: "error",
          errorKind: error instanceof GitHubError ? error.kind : undefined,
          detail: error instanceof Error ? error.message : String(error),
        };
      }
      setGitHubConnection(next);
      setConnection(next);
      setPermission(null);
      return { result: "connected" };
    },
    [setConnection, setGitHubConnection, setPermission]
  );

  const reconnect = useCallback(async () => {
    if (connection?.kind === "browser-folder") {
      setPermission(await requestFolderPermission(connection.handle).catch(() => "denied" as const));
    }
  }, [connection, setPermission]);

  const disconnect = useCallback(async () => {
    setGitHubConnection(null);
    await clearFolderHandle().catch(() => undefined);
    setConnection(null);
    setPermission(null);
  }, [setConnection, setGitHubConnection, setPermission]);

  const syncNow = useCallback(() => setSyncRequest((count) => count + 1), [setSyncRequest]);

  const setDeviceName = useCallback(
    (deviceName: string) => setSettings((current) => ({ ...current, deviceName })),
    [setSettings]
  );

  return {
    isFolderSupported: isFolderAccessSupported(),
    status,
    settings,
    connectFolder,
    connectGitHub,
    reconnect,
    disconnect,
    syncNow,
    setDeviceName,
  };
}
