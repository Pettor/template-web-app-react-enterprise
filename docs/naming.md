# Naming conventions

These conventions are enforced by ESLint, Prettier, and the TanStack Router file-based routing plugin. Follow them so tooling and humans agree on where things live.

## Files and folders

| Kind | Convention | Example |
| --- | --- | --- |
| Component file | `PascalCase.tsx` | `LoginView.tsx`, `CommandPalette.tsx` |
| Component folder | `kebab-case` | `command-palette/`, `input-field/` |
| Hook file | `UsePascalCase.ts(x)` | `UseAuth.ts`, `UseLoginRoute.ts` |
| Hook export | `camelCase` | `useAuth`, `useLoginRoute` |
| Jotai atom file | `PascalCaseAtoms.ts` | `ThemeAtoms.ts`, `AuthAtoms.ts` |
| Jotai atom export | `camelCase + Atom` | `themeModeAtom`, `authStateAtom` |
| Domain type file | `PascalCase.ts` | `AuthState.ts`, `ThemeMode.ts` |
| Props interface | `PascalCaseProps` | `NavbarProps`, `LoginFormProps` |
| Storybook story | co-located `.stories.tsx` | `Logo.stories.tsx` |
| Unit test | co-located `.test.ts(x)` | `Schema.test.ts`, `Convert.test.ts` |

## Route-specific naming

TanStack's file-based router treats filenames as meaningful:

| Pattern | Meaning |
| --- | --- |
| `route.tsx` | The route file — exports `Route = createFileRoute(...)({ ... })` |
| `_folder/` | Layout segment — wraps child routes, does not add a URL segment |
| `$/` | Splat (catch-all) route |
| `$param/` | URL parameter segment |
| `-UseXxxRoute.ts` | Private hook (prefix `-` = ignored by router) |
| `-XxxLoader.ts` | Private loader (prefix `-` = ignored by router) |

**Route hook naming:** `-Use<RouteName>Route.ts` exporting `use<RouteName>Route()`.

## Controller pattern naming

See [patterns.md#controller-pattern](./patterns.md#controller-pattern). Three files:

| File | Convention |
| --- | --- |
| Presentational | `<ComponentName>.tsx` |
| Hook | `Use<ComponentName>Controller.ts(x)` exporting `use<ComponentName>Controller` |
| Wrapper | `<ComponentName>Controller.tsx` exporting `<ComponentName>Controller` |

## Story titles

Story titles use the pattern `Top-Level / Category / Component Name`. Every token is **Title Case with spaces**, and the hierarchy should match the mental model of a developer browsing Storybook — not the file path.

| Top-level | Used for |
| --- | --- |
| `Actions/` | `components/actions/*` — action surfaces (command palette, theme selector) |
| `Display/` | `components/display/*` — presentation-only UI |
| `Feedback/` | `components/feedback/*` — dialogs, toasts, modals, PWA prompts |
| `Forms/` | `components/forms/*` — full-flow forms |
| `Input/` | `components/input/*` — reusable inputs |
| `Navigation/` | `components/navigation/*` — in-app navigation |
| `Views/` | `views/*` — page-level compositions |
| `Core/` | app shell / router-level UI (loading, error) |
| `Shared/` | `packages/ui` — cross-app shared UI |
| `Design System/` | foundation tokens (colors, typography) |

Examples:

```
Actions/Command Palette
Feedback/Settings Modal
Feedback/PWA Offline
Forms/Login
Input/Input Field
Views/Dashboard
Core/Route Loading
Shared/Branding/Logo/Full
Shared/Layout/Basic
Design System/Typography
```

## Test IDs

Use `data-testid="<component-name>__<element-name>"` with a **double underscore** separator. Kebab-case for both halves.

```tsx
<button data-testid="login-form__submit">…</button>
<div data-testid="command-palette__item-logout">…</div>
```

This is the primary selector for Storybook play functions and Playwright E2E specs.

## Import order

Enforced by ESLint `import/order`:

1. React / framework (`react`, `react-intl`, `@tanstack/*`, `@heroui/react`)
2. External packages (alphabetical)
3. Internal workspace packages (`@package/*`, `@config/*`, `@design/*`)
4. Aliased internals (`~/…`)
5. Relative (`./…`, `../…`)

Within each group, type-only imports use `import type` and sort together with runtime imports.

## Barrel exports

Every workspace package (`packages/*`, `design/tokens`) exports its public surface from a hand-maintained `src/index.ts`. When you add a new public file, add an `export * from "./Path/To/File"` entry. Consumers can also skip the barrel entirely via the subpath export pattern (`import { Foo } from "@package/<name>/<Path/To/File>"`).

**`apps/web` has no barrel** — it is a leaf application, not a library. Use the `~/` alias for cross-layer imports.
