import { useEffect, useEffectEvent, useRef } from "react";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { BrowserFolderBackend } from "./BrowserFolderBackend";
import { queryFolderPermission } from "./FileSystemAccess";
import type { FolderBackend } from "./FolderBackend";
import { loadFolderHandle } from "./FolderHandleStore";
import { FolderSync } from "./FolderSync";
import { readGitClone } from "./GitClone";
import { GitHubBackend, GitHubError } from "./GitHubBackend";
import type { SyncConnection, SyncStatus } from "./SyncAtoms";
import {
  folderPermissionAtom,
  githubConnectionAtom,
  syncConnectionAtom,
  syncRequestAtom,
  syncSettingsAtom,
  syncStatusAtom,
} from "./SyncAtoms";
import type { AppData } from "~/core/data/AppData";
import { COLLECTIONS } from "~/core/data/AppData";
import { appDataAtom } from "~/core/data/DataAtoms";
import { toUtcTimestamp } from "~/core/data/RecordId";

/** Folder: read the folder this often while visible, and write this long after the last change. */
const PULL_INTERVAL_MS = 4_000;
const PUSH_DEBOUNCE_MS = 400;
/**
 * GitHub: check for new commits this often while the app is visible (an
 * unchanged branch costs one request that doesn't count against the rate
 * limit), and commit this long after the last change.
 */
const GITHUB_PULL_INTERVAL_MS = 60_000;
const GITHUB_COMMIT_DELAY_MS = 5_000;
const GITHUB_SYNC_ATTEMPTS = 3;

type Collections = Record<string, Record<string, unknown>>;

/**
 * Applies what a pull changed (`pulled` vs `base`) on top of `current`, so
 * edits made while the pull was running are kept.
 */
export function rebase(base: AppData, pulled: AppData, current: AppData): AppData {
  if (base === current) {
    return pulled;
  }
  const next = { ...current } as unknown as Collections;
  for (const { key } of COLLECTIONS) {
    const records = { ...(current as unknown as Collections)[key] };
    const before = (base as unknown as Collections)[key] ?? {};
    for (const [id, record] of Object.entries((pulled as unknown as Collections)[key] ?? {})) {
      if (record !== before[id]) {
        records[id] = record;
      }
    }
    next[key] = records;
  }
  return next as unknown as AppData;
}

function describe(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}

function createBackend(connection: SyncConnection): FolderBackend {
  return connection.kind === "github" ? new GitHubBackend(connection) : new BrowserFolderBackend(connection.handle);
}

/** Keeps the connected data folder or GitHub repository and the app in sync. Mount once, near the app root. */
export function useSyncLifecycle(): void {
  const [data, setData] = useAtom(appDataAtom);
  const settings = useAtomValue(syncSettingsAtom);
  const [connection, setConnection] = useAtom(syncConnectionAtom);
  const storedGitHubConnection = useAtomValue(githubConnectionAtom);
  const [permission, setPermission] = useAtom(folderPermissionAtom);
  const setStatus = useSetAtom(syncStatusAtom);
  const syncRequest = useAtomValue(syncRequestAtom);

  const engineRef = useRef<FolderSync | null>(null);
  const githubRef = useRef<GitHubBackend | null>(null);
  const commitTimerRef = useRef<number | undefined>(undefined);
  const lastGitHubSyncRef = useRef(0);
  const queueRef = useRef<Promise<void>>(Promise.resolve());
  // Queued jobs run later; they read the latest values from here rather than what was current when queued.
  const latestRef = useRef({ data, settings });

  useEffect(() => {
    latestRef.current = { data, settings };
  }, [data, settings]);

  // Restore the connection chosen in an earlier session.
  const restore = useEffectEvent((isCancelled: () => boolean): void => {
    if (storedGitHubConnection) {
      setConnection(storedGitHubConnection);
      return;
    }
    loadFolderHandle()
      .then(async (stored) => {
        if (!stored || isCancelled()) {
          return;
        }
        setConnection({ kind: "browser-folder", handle: stored });
        setPermission(await queryFolderPermission(stored));
      })
      .catch(() => undefined);
  });

  useEffect(() => {
    let cancelled = false;
    restore(() => cancelled);
    return () => {
      cancelled = true;
    };
  }, []);

  function updateStatus(change: (current: SyncStatus) => Partial<SyncStatus>): void {
    setStatus((current) => ({ ...current, ...change(current) }));
  }

  function enqueue(job: (engine: FolderSync) => Promise<void>): void {
    queueRef.current = queueRef.current.then(async () => {
      const engine = engineRef.current;
      if (!engine) {
        return;
      }
      try {
        await job(engine);
      } catch (error) {
        updateStatus(() => ({ state: "error", error: describe(error) }));
      }
    });
  }

  async function pullNow(engine: FolderSync): Promise<void> {
    const base = latestRef.current.data;
    const result = await engine.pull(base);
    if (result.changed) {
      setData((latest) => rebase(base, result.data, latest));
      latestRef.current = { ...latestRef.current, data: rebase(base, result.data, latestRef.current.data) };
    }
    // With GitHub, reading the snapshot isn't a sync yet; githubSync reports once the commit is pushed.
    updateStatus((current) => {
      const conflicts = (current.conflicts ?? 0) + result.conflicts || undefined;
      return githubRef.current
        ? { conflicts }
        : { state: "synced", error: undefined, lastSyncedAt: toUtcTimestamp(new Date()), conflicts };
    });
  }

  async function pushNow(engine: FolderSync): Promise<number> {
    const written = await engine.push(latestRef.current.data);
    const github = githubRef.current;
    updateStatus(() =>
      github
        ? { hasPendingChanges: github.hasChanges }
        : { state: "synced", error: undefined, lastSyncedAt: toUtcTimestamp(new Date()) }
    );
    return written;
  }

  /** Brings in GitHub's newest commit, merges it, and pushes local changes as one commit; retries when beaten to it. */
  async function githubSyncNow(engine: FolderSync, backend: GitHubBackend): Promise<void> {
    for (let attempt = 1; ; attempt += 1) {
      await backend.refresh();
      await pullNow(engine);
      await pushNow(engine);
      try {
        await backend.commit(`data: update from ${latestRef.current.settings.deviceName}`);
        return;
      } catch (error) {
        if (!(error instanceof GitHubError && error.kind === "conflict") || attempt >= GITHUB_SYNC_ATTEMPTS) {
          throw error;
        }
      }
    }
  }

  const pull = useEffectEvent((): void => {
    enqueue(pullNow);
  });

  const githubSync = useEffectEvent((): void => {
    window.clearTimeout(commitTimerRef.current);
    enqueue(async (engine) => {
      const backend = githubRef.current;
      if (!backend) {
        return;
      }
      lastGitHubSyncRef.current = Date.now();
      updateStatus(() => ({ state: "syncing" }));
      try {
        await githubSyncNow(engine, backend);
        const syncedAt = toUtcTimestamp(new Date());
        updateStatus((current) => ({
          state: "synced",
          error: undefined,
          lastSyncedAt: syncedAt,
          hasPendingChanges: backend.hasChanges,
          git: {
            ...current.git,
            branch: backend.currentBranch ?? undefined,
            lastSyncedAt: syncedAt,
            error: undefined,
            errorKind: undefined,
          },
        }));
      } catch (error) {
        const errorKind = error instanceof GitHubError ? error.kind : undefined;
        updateStatus((current) => ({
          state: "error",
          error: describe(error),
          hasPendingChanges: backend.hasChanges,
          git: { ...current.git, error: describe(error), errorKind },
        }));
      }
    });
  });

  const push = useEffectEvent((): void => {
    enqueue(async (engine) => {
      const written = await pushNow(engine);
      if (written > 0 && githubRef.current) {
        window.clearTimeout(commitTimerRef.current);
        commitTimerRef.current = window.setTimeout(githubSync, GITHUB_COMMIT_DELAY_MS);
      }
    });
  });

  const refreshGitClone = useEffectEvent((backend: FolderBackend): void => {
    readGitClone(backend)
      .then((clone) =>
        updateStatus(() => ({
          git: clone
            ? { isLocalClone: true, branch: clone.branch ?? undefined, remoteUrl: clone.remoteUrl ?? undefined }
            : undefined,
        }))
      )
      .catch(() => undefined);
  });

  // Start or stop the engine when the connection or its permission changes.
  useEffect(() => {
    githubRef.current = null;
    if (!connection) {
      engineRef.current = null;
      setStatus({ state: "local", method: "local" });
      return;
    }
    const backend = createBackend(connection);
    const method = connection.kind === "github" ? "github" : "folder";
    if (connection.kind === "browser-folder" && permission !== "granted") {
      engineRef.current = null;
      setStatus({ state: "needs-permission", method, folderName: backend.name });
      return;
    }

    engineRef.current = new FolderSync(backend);
    setStatus({ state: "syncing", method, folderName: backend.name });

    let githubTimer: number | undefined;
    if (backend instanceof GitHubBackend && connection.kind === "github") {
      githubRef.current = backend;
      setStatus((current) => ({ ...current, git: { remoteUrl: `github.com/${connection.owner}/${connection.repo}` } }));
      // Pull GitHub's newest commit before reading the snapshot.
      githubSync();
      githubTimer = window.setInterval(() => {
        if (document.visibilityState === "visible") {
          githubSync();
        }
      }, GITHUB_PULL_INTERVAL_MS);
    } else {
      refreshGitClone(backend);
      pull();
      push();
    }

    function pullWhenVisible(): void {
      if (document.visibilityState === "visible" && !githubRef.current) {
        pull();
      }
    }

    function onFocus(): void {
      pullWhenVisible();
      if (!githubRef.current) {
        refreshGitClone(backend);
      }
    }

    // GitHub on a phone: sync when the app comes back, and push pending changes before it's put away.
    function syncGitHubOnVisibility(): void {
      const github = githubRef.current;
      if (!github) {
        return;
      }
      if (document.visibilityState === "hidden") {
        if (github.hasChanges) {
          githubSync();
        }
      } else if (Date.now() - lastGitHubSyncRef.current > GITHUB_COMMIT_DELAY_MS) {
        githubSync();
      }
    }

    const timer = window.setInterval(pullWhenVisible, PULL_INTERVAL_MS);
    window.addEventListener("focus", onFocus);
    document.addEventListener("visibilitychange", syncGitHubOnVisibility);
    return () => {
      window.clearInterval(timer);
      window.clearInterval(githubTimer);
      window.clearTimeout(commitTimerRef.current);
      window.removeEventListener("focus", onFocus);
      document.removeEventListener("visibilitychange", syncGitHubOnVisibility);
      engineRef.current = null;
      githubRef.current = null;
    };
  }, [connection, permission, setStatus]);

  // Write local changes shortly after they happen.
  useEffect(() => {
    const timer = window.setTimeout(push, PUSH_DEBOUNCE_MS);
    return () => window.clearTimeout(timer);
  }, [data]);

  // "Sync now" from settings.
  useEffect(() => {
    if (syncRequest === 0) {
      return;
    }
    if (githubRef.current) {
      githubSync();
    } else {
      pull();
      push();
    }
  }, [syncRequest]);
}
