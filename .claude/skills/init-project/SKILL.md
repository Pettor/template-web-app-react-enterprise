---
name: init-project
description: Initialize this React enterprise template after cloning. Walks the user through backend/name/version/color questions and delegates the file changes to scripts/init-project/index.mjs. Use when the user says "init project", "init the project", "set up this template", "initialize the template", or runs this skill right after cloning the repo.
version: 2.0.0
---

# init-project

A guided initialization for the `template-web-app-react-enterprise` monorepo. All the actual file surgery (deleting backend code, bumping versions, rebranding) lives in `scripts/init-project/index.mjs` — a deterministic, cross-platform Node script. This skill's job is to collect the answers via `AskUserQuestion`, invoke the script non-interactively, and handle the one thing the script doesn't: color customization.

> **Important for Claude**: Don't hand-edit any of the files the script touches. Collect answers, then run the script with flags. Only the color-token edit (Question 2 below) is done directly by you.

---

## Question 1 — Core questions

Ask, in order, via `AskUserQuestion`:

1. **Repo name** — used for the root `package.json` name and README links (e.g. `my-app`).
2. **Project name** — human-readable display name (e.g. `My App`). Used in the README title, PWA manifest, browser tab title, and in-app "About" section.
3. **Initial version** — semver, default `0.1.0`.
4. **Dev server port** — default `5173`, or randomize (picks a port between 5000-5400), or let the user set one manually. The script derives the e2e test port as `devPort - 1000` (matching the template's existing convention, e.g. `5173` → `4173`) and updates every e2e config/script that references it — only relevant when backend is kept, since `apps/e2e` is deleted otherwise.
5. **Does this project need a backend?**
   - **No backend** — purely a frontend project. The script deletes the API client, auth, authenticated/public route guards, login/sign-up/forgot-password, dashboard, mock server, and e2e tests, and replaces the home route with a minimal `HomeView`. PWA support and the general app shell (theme, i18n, settings, command palette) are kept.
   - **Has backend** — ask two follow-ups: backend host (default `http://localhost`) and backend port (default `5000`). Nothing is deleted; the script just writes those into `apps/web/.env`.

Once you have all the answers, run:

```bash
node scripts/init-project/index.mjs \
  --repo-name="<repo-name>" \
  --project-name="<project-name>" \
  --version="<version>" \
  --dev-port=<random|N> \
  --backend=<true|false> \
  --backend-host="<host>" \
  --backend-port="<port>" \
  --yes
```

Omit `--dev-port` to keep the default (`5173`). Omit `--backend-host`/`--backend-port` when backend is `false`. The script itself runs `pnpm install`, a routeTree regeneration pass, `pnpm build`, and `pnpm lint`, streaming their output — relay any failures to the user rather than trying to fix them yourself first; the script leaves every edit in place (no self-delete) when verification fails, so it's safe to fix the reported issue and re-run the same command.

On success the script deletes itself (`scripts/init-project/`) and removes the `init-project` entry from root `package.json` — that's expected, not something to undo.

---

## Question 2 — Adjust the project colors?

Use `AskUserQuestion` (Yes / No). The script doesn't touch design tokens, so this step is still yours to run directly, and it can happen before or after invoking the script.

If **No**, skip.

If **Yes**, ask two follow-up questions (free-form via "Other", or sequentially):

- New `default` color (oklch or hex)
- New `accent` color (oklch or hex)

If the user gives hex, convert to oklch — the token files use oklch consistently. Then edit:

- **`design/tokens/src/light.json`**:
  - `color.theme.light.default.DEFAULT.$value`
  - `color.theme.light.accent.DEFAULT.$value`
- **`design/tokens/src/dark.json`**:
  - `color.theme.dark.default.DEFAULT.$value`
  - `color.theme.dark.accent.DEFAULT.$value`

Leave the matching `foreground` values alone unless contrast is obviously broken — if you change them, mention it in the final summary.

Rebuild tokens so the CSS variables propagate:

```bash
pnpm --filter @design/tokens build:libs
pnpm build:libs
```

---

## Final summary + greeting

Print to the user:

- **Choices made** — repo name, project name, version, backend mode (none / configured at host:port), colors changed (with old → new values if yes).
- **High-level files touched** — relay what the script printed; don't re-enumerate every file.
- **Greeting** — a friendly "Your project is ready!" plus next steps:
  - `pnpm dev` to start the dev server
  - `pnpm storybook` to browse the component library
  - `pnpm test` (and `pnpm test:e2e`, if backend was kept) to run the test suites
  - Review with `git status`/`git diff` and commit when happy — the script does not commit anything itself
