# Documentation

This folder contains the architectural reference for the repository. Start with the doc that matches your current question:

| I want to… | Read |
| --- | --- |
| Understand the big picture of `apps/web` — layers, provider stack, data flow | [architecture.md](./architecture.md) |
| Find out which folder a new file belongs in | [structure.md](./structure.md) |
| Learn the Controller / route hook / atom co-location patterns | [patterns.md](./patterns.md) |
| Name a file, folder, hook, atom, story, or test id | [naming.md](./naming.md) |
| Tour the workspace packages (`@package/api`, `@package/ui`, …) | [packages.md](./packages.md) |
| Add a new component, test, or E2E spec by following an existing playbook | [`/.claude/commands/`](../.claude/commands/) |

## How the docs fit together

- **`architecture.md`** is the why: the four-layer model (`core` / `components` / `views` / `routes`), provider hierarchy, and state management decisions.
- **`structure.md`** is the what: every folder under `apps/web/src/` with a one-line description.
- **`patterns.md`** is the how: Controller pattern, route hooks, atom co-location, component file conventions.
- **`naming.md`** is the shorthand: file, folder, hook, atom, story title, and test-id conventions.
- **`packages.md`** covers everything outside `apps/web` — packages, configs, design tokens, other apps.

## Keeping the docs in sync

Update the relevant doc **in the same change** as a structural or naming convention shift. The `CLAUDE.md` at the repo root links into `docs/`; the `.claude/commands/*` slash commands reference these docs for anything structural rather than duplicating it.

If you disagree with a convention, change the doc first so the next person (or agent) gets the new rule — don't leave the code and docs out of sync.
