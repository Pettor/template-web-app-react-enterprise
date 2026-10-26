---
name: bump-minor
description: Bump the minor version (x.Y.0) of every package.json in the workspace for new features, and write the matching "What's new" release notes. Use when the user says "bump minor", "minor release", "release the new features", or when bump-version picks a minor.
---

# Bump minor version

Minor releases (`0.8.2` → `0.9.0`) ship new features and improvements that don't break anything. Every minor version **must** have a "What's new" entry in `apps/web/src/core/whats-new/ReleaseNotes.ts`.

## Input

$ARGUMENTS

## Steps

1. **Check the tree.** Run `git status --short`. If there are uncommitted changes unrelated to a release, mention them before going on.
2. **Gather what changed** since the previous minor — patches don't get notes, so their user-visible fixes belong in this entry too:

   ```sh
   MINOR=$(node -p 'require("./apps/web/package.json").version.replace(/\.\d+$/, ".0")')
   BASE=$(git log --format=%H -S"\"version\": \"$MINOR\"" -- apps/web/package.json | tail -1)
   git log --oneline --no-merges "$BASE"..HEAD
   ```

   Focus on `feat:` and user-visible `fix:` commits, and read the diffs where a commit message doesn't say enough. If something breaks existing data files, sync or workflows, stop and suggest `/bump-major` instead.

3. **Bump the version** everywhere it lives:

   ```sh
   node scripts/bump-version.mjs minor
   ```

   This updates every `package.json` in the workspace (they all share one version) plus `VITE_APP_VERSION` in `apps/web/.env.demo`. The script refuses to run if the package versions disagree — fix that first rather than editing by hand.

4. **Write the release notes** for the new `x.y.0` by following `/add-release-notes` (`.claude/commands/add-release-notes.md`). In short:
   - If an entry for this version already exists (pre-written), extend it instead of adding a second one.
   - Otherwise add a `const vXY0 = defineMessages({ ... })` block and an object at the **top** of `RELEASE_NOTES`.
   - A short upbeat tagline, 2–5 highlights with one emoji each, best feature first, only fixes people would notice. No refactors, dependencies, tests or internal names.
   - Use `id: ""` placeholders, then run `pnpm --filter=@app/web lint:fix` to fill them.

5. **Docs**: if a feature changes how something works that `docs/` describes (architecture, patterns, data sync), update it.
6. **Verify**: `pnpm --filter=@app/storybook exec vitest run --project=unit` (runs `WhatsNew.test.ts`) and `pnpm lint`.
7. **Don't commit.** Stage nothing unless asked. Report the old → new version, the highlights you wrote, the files changed, and suggest the commit message `feat: <new version>`.
