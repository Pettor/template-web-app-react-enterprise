---
name: bump-patch
description: Bump the patch version (x.y.Z) of every package.json in the workspace for bug fixes and small tweaks. Patches get no "What's new" notes. Use when the user says "bump patch", "patch release", "release a fix", or when bump-version picks a patch.
---

# Bump patch version

Patch releases (`0.8.0` → `0.8.1`) ship fixes and small tweaks. In this app **patches never show "What's new"** — only major and minor versions do (see `docs/patterns.md#whats-new-release-notes`). User-visible fixes from patches roll into the next minor's notes.

## Input

$ARGUMENTS

## Steps

1. **Check the tree.** Run `git status --short`. If there are uncommitted changes unrelated to a release, mention them before going on.
2. **Gather what changed** since the last version bump:

   ```sh
   BASE=$(git log -1 --format=%H -G'"version":' -- apps/web/package.json)
   git log --oneline --no-merges "$BASE"..HEAD
   ```

   If anything there is a new feature or a breaking change, stop and suggest `/bump-minor` or `/bump-major` instead.

3. **Bump the version** everywhere it lives:

   ```sh
   node scripts/bump-version.mjs patch
   ```

   This updates every `package.json` in the workspace (they all share one version) plus `VITE_APP_VERSION` in `apps/web/.env.demo`. The script refuses to run if the package versions disagree — fix that first rather than editing by hand.

4. **No release notes.** Don't add a `RELEASE_NOTES` entry for `x.y.z` — `WhatsNew.test.ts` rejects patch entries. If the user asks for notes, explain that patches stay silent and offer to bump a minor instead (`/bump-minor`). Note any user-visible fixes in the report so they can go into the next minor's notes.
5. **Verify**: `pnpm lint`.
6. **Don't commit.** Stage nothing unless asked. Report the old → new version, the files changed and any user-visible fixes worth mentioning in the next minor, and suggest the commit message `fix: <new version>`.
