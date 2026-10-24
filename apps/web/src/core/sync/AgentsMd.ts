/**
 * Written to the root of the data folder so any agent (or person) pointed at
 * it knows the data model and the rules. Not translated: it's for machines.
 * The app rewrites it when it changes between versions, so keep it in step
 * with `core/data/` when adding a collection or a field.
 */
export const AGENTS_MD = `# Data folder

This folder is the app's whole state, as plain JSON files. Read them to see
the data; write them to change it. The app picks up changes within a few
seconds (local folder) or a minute (GitHub), and writes its own changes back.

## Layout

\`\`\`
app.json            Manifest: data format version and the collections below.
AGENTS.md           This file. Rewritten by the app when its version changes.
.gitattributes      Keeps line endings stable (LF) across operating systems.
notes/<id>.json     One note per file, schema "app.note/v1".
.conflicts/         Edits that lost a conflict. Safe to read, review, delete.
\`\`\`

One record per file means two devices editing different records never touch
the same file, and every change is a small, readable Git diff.

## Records

Every record has these fields:

| Field     | Type   | Notes                                                    |
| --------- | ------ | -------------------------------------------------------- |
| schema    | string | The record's format, e.g. "app.note/v1".                 |
| id        | string | ULID (26 chars, Crockford base32). Also the file name.   |
| createdAt | string | ISO 8601 UTC, e.g. "2026-10-21T08:00:00Z". Never change. |
| updatedAt | string | ISO 8601 UTC. Set to now on every change.                |

### notes/<id>.json — "app.note/v1"

| Field  | Type     | Default  | Notes                                         |
| ------ | -------- | -------- | --------------------------------------------- |
| title  | string   | ""       | Shown in the list.                            |
| body   | string   | ""       | Free text.                                    |
| tags   | string[] | []       | Lowercase, no "#".                            |
| pinned | boolean  | false    | Pinned notes are listed first.                |
| status | string   | "active" | "active" or "archived". Archived are hidden.  |

Example:

\`\`\`json
{
  "schema": "app.note/v1",
  "id": "01JB8Z5V6Q3M2K9X7T4R1N0PWS",
  "title": "Plan the launch",
  "body": "Draft the announcement and pick a date.",
  "tags": ["work"],
  "pinned": false,
  "status": "active",
  "createdAt": "2026-10-21T08:00:00Z",
  "updatedAt": "2026-10-21T08:00:00Z"
}
\`\`\`

## Common jobs

- Add a note: create notes/<new ULID>.json with "id", "title",
  "createdAt" and "updatedAt" (both now). Other fields are optional.
- Edit a note: change the fields and set "updatedAt" to now.
- Remove a note: set "status": "archived" and update "updatedAt".
- Find notes by tag: notes whose "tags" array contains the tag.

## Rules

- Always set "updatedAt" (ISO 8601 UTC) when you change a record. When two
  edits of the same record meet, the newer "updatedAt" wins and the other is
  copied to .conflicts/.
- Never delete, rename or reuse a record file; archive instead. A deleted
  file comes back from devices that still have the record.
- Write UTF-8 JSON, 2-space indented, with a trailing newline, to keep diffs
  small. Unknown fields are dropped when the app rewrites a file.
- Do not edit app.json, AGENTS.md or .gitattributes; the app rewrites them.

## Git

When this folder is a Git repository, the app either commits for you (GitHub
sync: one commit per sync, pushed to the default branch) or leaves Git to you
(local folder: commit and push with your own Git tools). Commit messages from
the app start with "data:". Merge conflicts are rare because each record is
its own file; if one happens, keep the version with the newer "updatedAt".
`;

/** Plain text with LF endings everywhere, so a Windows checkout doesn't rewrite every file. */
export const GITATTRIBUTES = `* text=auto eol=lf
*.json text eol=lf
`;
