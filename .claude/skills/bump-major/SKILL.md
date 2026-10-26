---
name: bump-major
description: Bump the major version (X.0.0) of every package.json in the workspace for breaking or headline changes, and write the matching "What's new" release notes. Use when the user says "bump major", "major release", "2.0", "1.0", or when bump-version picks a major.
---

# Bump major version

Major releases (`0.9.3` → `1.0.0`, `1.4.2` → `2.0.0`) mark a breaking or headline change. Every major version **must** have a "What's new" entry in `apps/web/src/core/whats-new/ReleaseNotes.ts`.

## Input

$ARGUMENTS

## When a major is right

"Breaking" means people (or other devices, or agents editing the data) notice something stopped working the old way:

- the local data format changes in a way older app versions can't read (an incompatible change to a collection schema in `core/data/`, the `<collection>/<ULID>.json` layout, or the `AGENTS.md` contract),
- sync or storage changes so people must act (reconnect the folder, re-enter the GitHub token, update every device),
- the backend contract in `packages/api/` changes so an older server or client no longer works,
- a feature is removed or a core workflow works differently,
- a headline milestone the user wants to celebrate (e.g. `1.0.0`).

If none of these apply, confirm with the user before going on — it's probably a minor.

## Steps

1. **Check the tree.** Run `git status --short`. If there are uncommitted changes unrelated to a release, mention them before going on.
2. **Gather what changed** since the previous minor — patches don't get notes, so their user-visible fixes belong in this entry too:

   ```sh
   MINOR=$(node -p 'require("./apps/web/package.json").version.replace(/\.\d+$/, ".0")')
   BASE=$(git log --format=%H -S"\"version\": \"$MINOR\"" -- apps/web/package.json | tail -1)
   git log --oneline --no-merges "$BASE"..HEAD
   ```

   Read the diffs for anything that changes data formats, sync or the API (`apps/web/src/core/data/`, `core/sync/`, `packages/api/`) — those are what make this a major.

3. **Bump the version** everywhere it lives:

   ```sh
   node scripts/bump-version.mjs major
   ```

   This updates every `package.json` in the workspace (they all share one version) plus `VITE_APP_VERSION` in `apps/web/.env.demo`. The script refuses to run if the package versions disagree — fix that first rather than editing by hand.

4. **Write the release notes** for the new `X.0.0` by following `/add-release-notes` (`.claude/commands/add-release-notes.md`). In short:
   - If an entry for this version already exists, extend it; if a pre-written entry exists for a minor that's now being skipped (e.g. `0.10.0` when going to `1.0.0`), fold it into this entry and remove the skipped one.
   - Add a `const vX00 = defineMessages({ ... })` block and an object at the **top** of `RELEASE_NOTES`.
   - Make it feel like a big moment: a tagline and 2–5 highlights with one emoji each, the headline change first.
   - If people need to do something (reconnect the folder, update other devices), say so plainly in a highlight — friendly, not alarming.
   - Use `id: ""` placeholders, then run `pnpm --filter=@app/web lint:fix` to fill them.

5. **Check the data contract**: if the data format changed, make sure `core/sync/AgentsMd.ts` and `docs/data-sync.md` match the new schemas and layout.
6. **Verify**: `pnpm --filter=@app/storybook exec vitest run --project=unit` (runs `WhatsNew.test.ts`) and `pnpm lint`.
7. **Don't commit.** Stage nothing unless asked. Report the old → new version, why it's a major, the highlights you wrote, the files changed, and suggest the commit message `feat!: <new version>`.
