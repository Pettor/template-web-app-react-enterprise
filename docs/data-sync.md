# Local data and sync

Projects initialized **without a backend** keep their data in the browser and can sync it to a folder on disk or a GitHub repository, so the data lives with the user, works offline, and stays readable by people, scripts and AI agents. (Projects initialized with a backend have this removed by `init-project`; the backend is the source of truth there.)

The template ships one example collection, **notes**, shown on the Notes page (`/notes`, or the home page in a no-backend project).

## Data model (`core/data/`)

| File           | What it is                                                                                                                                                 |
| -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `AppData.ts`   | `AppData` (every collection, records by id), the `COLLECTIONS` registry, pure mutations (`createNote`, `updateNote`, `archiveNote`, …) and `normalizeData` |
| `Note.ts`      | `NoteFileSchema` (Zod, schema id `app.note/v1`) and the `Note` type                                                                                        |
| `RecordId.ts`  | `createRecordId()` (ULID) and `toUtcTimestamp()`                                                                                                           |
| `DataAtoms.ts` | `appDataAtom`, persisted to `localStorage` (`app-data`), normalized on read                                                                                |
| `UseNotes.ts`  | `useNotes()`: active notes plus `add`, `togglePinned`, `archive`                                                                                           |

Every record has `schema`, `id` (ULID), `createdAt` and `updatedAt` (ISO 8601 UTC, no milliseconds). Mutations are pure functions that stamp `updatedAt`. Records are **never deleted**, only archived (`status: "archived"`): a deleted file would come back from any device that still has the record, while an archive syncs like any other edit.

Schemas parse **leniently**: optional fields fall back to defaults with `.catch()`, so files written by hand, by an agent, or by an older version still load, and the next push rewrites them in the current format (without touching `updatedAt`).

### Adding a collection

1. Add `core/data/<Thing>.ts` with a Zod `<Thing>FileSchema` (start with `schema`, `id`, then your fields, then `createdAt`/`updatedAt` — keys are written in schema order).
2. Add the key to `AppData` and `createEmptyData()`, and an entry to `COLLECTIONS` (`key`, `dir`, `schema`, `fileSchema`).
3. Add mutations next to the note ones, and a `Use<Things>.ts` hook.
4. Document the collection in `core/sync/AgentsMd.ts` — it's what agents read.

Sync, storage and conflict handling pick the collection up from `COLLECTIONS`; nothing in `core/sync/` changes.

## Folder layout

The same layout is used for a local folder and a GitHub repository. It's designed for Git: one small, pretty-printed file per record, stable key order, LF line endings, and file names that never change.

```
<data folder>/
├── app.json            # Manifest: { schema: "app.data/v1", collections: { notes: { schema, path } } }
├── AGENTS.md           # The data model and rules, for agents and people (rewritten when it changes)
├── .gitattributes      # * text=auto eol=lf
├── notes/<ULID>.json   # One note per file
└── .conflicts/         # Losing versions of conflicting edits: .conflicts/notes/<id>-<updatedAt>.json
```

`AGENTS.md` is generated from `core/sync/AgentsMd.ts`. Keep it in step with `core/data/` — it's the contract for anything that edits the folder without the app.

## Sync (`core/sync/`)

| File                                        | What it is                                                                                                                               |
| ------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `FolderSync.ts`                             | The engine: `pull()` merges changed files into `AppData`, `push()` writes changed records. Talks only to `FolderBackend`                 |
| `FolderBackend.ts`                          | The file-access interface (`list`, `stat`, `read`, `write`, `remove`)                                                                    |
| `BrowserFolderBackend.ts`                   | A folder picked with the File System Access API (Chrome, Edge, other Chromium browsers on a computer)                                    |
| `GitHubBackend.ts`                          | A GitHub repository through the REST API, as an in-memory snapshot of the default branch; `commit()` pushes staged changes as one commit |
| `GitClone.ts`                               | Reads `.git/HEAD` and `.git/config` so the UI can show a local clone's branch and remote                                                 |
| `AgentsMd.ts`                               | `AGENTS.md` and `.gitattributes` content                                                                                                 |
| `SyncAtoms.ts`                              | Connection, status, settings and "sync now" atoms                                                                                        |
| `UseSync.ts`                                | `useSync()` for the settings UI: connect a folder or GitHub, reconnect, disconnect, sync now                                             |
| `UseSyncLifecycle.ts` / `SyncLifecycle.tsx` | Runs the sync; mounted once in `AppProviders`                                                                                            |
| `UseSyncStatusCard.ts`                      | Props for `SyncStatusCard`: the live status, opening Settings → Sync on press                                                            |

### Methods (Settings → Sync)

- **Local folder or Git repo** — the user picks a folder. The handle is kept in IndexedDB; after a browser restart the user clicks **Reconnect** to grant access again. The app reads the folder every 4 s while visible (only files whose `lastModified` changed) and writes 400 ms after a change (only files whose content changed). When the folder is a **Git clone**, Settings shows its branch and remote. Browsers can't run Git, so commits, pulls and pushes are done with the user's own Git tools; pulled changes show up within seconds.
- **GitHub** — works in every browser, including phones. The user enters a username, a repository and a **fine-grained personal access token** limited to that repository with _Contents: Read and write_ (GitHub's API doesn't accept passwords, and OAuth needs a server). Only private repositories are accepted, and read-only tokens are refused. The connection, token included, is kept in this browser's `localStorage` (`app-sync-github`) only. Syncs when the app opens, every minute while visible, 5 s after the last change, when the app is hidden with unpushed changes, and on **Sync now**. Each sync refreshes the branch (an `If-None-Match` request that costs nothing when unchanged), merges, and pushes one commit (`data: update from <device>`) through the Git Data API. When another device pushed first, the sync refreshes, merges and retries, up to 3 times.
- **This browser only** — no sync. Data stays in `localStorage`.

A local clone and a GitHub connection can share the same repository: one computer works in the clone, phones sync through the API.

### Conflicts

Each record is its own file, so devices editing different records never collide. When the same record changed on both sides, the newer `updatedAt` wins and the other version is copied to `.conflicts/`. On first connect, local data and the folder are merged.

### Status

`syncStatusAtom` holds `SyncStatus`: `state` (`local`, `syncing`, `synced`, `error`, `needs-permission`), `method`, the folder or repository name, `lastSyncedAt`, `error`, `conflicts`, `hasPendingChanges` (GitHub) and `git` (branch, remote, GitHub error kind, `isLocalClone`).

`components/display/sync-status/SyncStatusCard` renders it as a card or as an icon button with a tooltip; both open Settings → Sync. The navbar shows the icon, the Notes page and the navigation drawer show the card.

## Testing

- `core/sync/FolderSync.test.ts` runs the engine against an in-memory File System Access fake.
- `core/sync/GitHubBackend.test.ts` runs it against an in-memory fake of GitHub's REST API, including the "another device pushed first" path.
- `core/sync/GitClone.test.ts`, `core/data/AppData.test.ts` cover the parsers and the data model.
- `apps/e2e/src/specs/data.spec.ts` adds notes, reloads, and opens Settings → Sync from the status indicator.
