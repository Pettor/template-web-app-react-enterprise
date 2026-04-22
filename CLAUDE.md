# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Documentation index

Deeper structural detail lives in the [`docs/`](./docs/) folder. When making architectural decisions or adding new features, consult:

- [`docs/architecture.md`](./docs/architecture.md) — layered architecture and provider hierarchy
- [`docs/structure.md`](./docs/structure.md) — full directory tree for `apps/web`
- [`docs/patterns.md`](./docs/patterns.md) — Controller pattern, route hooks, atom co-location
- [`docs/naming.md`](./docs/naming.md) — file, folder, hook, atom, story, and test-id conventions
- [`docs/packages.md`](./docs/packages.md) — every workspace package and its responsibilities

This file is the **rules** layer (what you must do); `docs/` is the **reference** layer (how the system is shaped). If they disagree, `docs/` is authoritative for structure — update this file to match.

## Essential Commands

### Development

- `pnpm dev` - Start development server (main app at https://localhost:5173)
- `pnpm dev:mocks` - Start development with mock server enabled (API on port 3100)
- `pnpm dev:mocks:cli` - Start standalone mock server only
- `pnpm storybook` - Start Storybook development server (localhost:9050)

### Build & Deploy

- `pnpm build` - Build all apps for production
- `pnpm deploy` - Build and prepare deployment artifacts in `output/deployment/`
- `pnpm storybook:build` - Build Storybook static files

### Testing

- `pnpm test` - Run all unit/component tests with Vitest (browser-based via Playwright)
- `pnpm test:coverage` - Run tests with Cobertura coverage report
- `pnpm test:e2e` - Run Playwright E2E tests (auto-starts dev server)
- `pnpm test:e2e:headless` - Run E2E tests in headless mode

### Code Quality

- `pnpm lint` - Run ESLint across all packages
- `pnpm lint:fix` - Auto-fix linting issues (also runs `sherif --fix` for dependency consistency)
- `pnpm format` - Format code with Prettier

### Utilities

- `pnpm clean` - Clean build artifacts

### Package-Scoped Commands

- `pnpm --filter=@app/web [script]` - Run script in a specific package
- `pnpm -w run [script]` - Run script in workspace root context

## Repository Structure

This is a **Turborepo monorepo** managed with **pnpm workspaces** (pnpm 10.33.0, Node 18–<25).

```
root/
├── apps/
│   ├── web/          # Main React application (Vite + React 19)
│   ├── storybook/    # Storybook configuration and stories
│   ├── e2e/          # Playwright end-to-end tests
│   └── mock/         # Mocks Server for API mocking
├── packages/
│   ├── ui/           # (@package/ui) Shared UI components
│   ├── api/          # (@package/api) API client, auth, data fetching
│   ├── react/        # (@package/react) Reusable React 19 hooks
│   ├── mocks/        # (@package/mocks) Mock data and test utilities
│   └── storybook/    # (@package/storybook) Storybook decorators
├── configs/
│   ├── eslint/       # (@config/eslint) Shared ESLint configs
│   ├── tailwind/     # (@config/tailwind) Shared Tailwind config
│   ├── typescript/   # (@config/typescript) Shared tsconfig bases
│   └── vite/         # (@config/vite) Vite config factory functions
├── design/
│   └── tokens/       # (@design/tokens) Style Dictionary design tokens
├── output/           # Build artifacts (gitignored)
└── .husky/           # Git hooks (pre-commit, commit-msg)
```

## Apps

### `apps/web` — Main React Application

- **URL**: https://localhost:5173 (HTTPS enabled via `vite-plugin-basic-ssl`)
- **Stack**: React 19, React Router v6, Vite 8, Tailwind CSS 4, HeroUI, React Query 5, Jotai 2, React Intl 10, Zod 4, TanStack Form
- **Features**: PWA (workbox), offline support, dark/light theme, i18n, hash-based routing, lazy-loaded routes

### `apps/storybook` — Component Documentation

- **URL**: localhost:9050
- **Stack**: Storybook 10 with React/Vite builder, addon-vitest (Playwright/Chromium), addon-a11y, addon-docs, addon-mcp
- **MCP Server**: Available at `http://localhost:9050/mcp` when Storybook dev server is running (enables AI agents to query component docs and run story tests)
- **Stories**: Pulls from `@app/web` and `@package/ui` node_modules

### `apps/e2e` — End-to-End Tests

- **Stack**: Playwright 1.58, Chromium, JUnit XML reporter
- **Config**: `apps/e2e/playwright.config.ts`, base URL https://localhost:5173, 1 retry, screenshots/traces on failure

### `apps/mock` — API Mock Server

- **Stack**: Mocks Server 4.1, runs on port 3100
- **Activation**: `pnpm dev:mocks` sets `--mode mocks` which switches `VITE_CONNECT_PORT` to 3100

## Packages

### `@package/api` — API Client & Authentication

Key exports:

- `ApiClient` — Main HTTP client that offloads requests to a **Web Worker** for non-blocking execution
- `FetchClient` — Low-level fetch wrapper
- `JwtToken` — JWT token type
- `ServiceError`, `createServiceError` — Typed error handling

> **Security note**: `TokenStorage` is intentionally NOT exported. The access token lives only in worker memory — `TokenStorage.ts` is excluded from the public barrel and must only be imported from worker-scope modules.
- API endpoint services: `Login`, `Logout`, `RefreshToken`, `ForgotPassword`, `SelfRegister`, `ApplicationInfo`, `PersonalProfile`
- Types (Zod schemas + inferred DTOs + domain types co-located in `Types.ts`), Converters, Fetch utilities

### `@package/react` — Reusable React 19 Hooks

Zero runtime dependencies beyond React. Use these hooks instead of re-implementing common patterns.

Key exports: `useDocumentTitle`, `useLocalStorage`, `useMediaQuery`, `useBreakpoint`, `useCopyToClipboard`, `useEventListener`, `useClickOutside`, `useIntersectionObserver`, `useDebounce`, `useIsMounted`, `useIsFirstRender`

### `@package/ui` — Shared UI Components

Key exports: `Logo`, `LogoFull`, `GithubIcon`, `LinkedInIcon`, `BasicLayout`, `NavbarLayout`, `BlueFadeBackground`, `GridBackground`, `Navbar`

### `@package/mocks` — Mock Data & Test Utilities

Key exports: `AdminApiClient`, helpers for mock server integration (used in `apps/mock`)

### `@design/tokens` — Design System Tokens

- Built with **Style Dictionary 5** in W3C token format
- Exports: `./css` → `variables.css` (CSS custom properties), `./tailwind` → `theme.js` (Tailwind color palette)
- Provides semantic color system for light/dark themes

## Web App Architecture (`apps/web/src/`)

`apps/web` follows a **four-layer architecture**. Every file belongs to exactly one layer; `core/` never imports from the UI layers.

```
apps/web/src/
├── main.tsx              # Mounts <App /> into #root
├── main.css              # Imports Tailwind + design tokens
├── routeTree.gen.ts      # Auto-generated by TanStack Router — do not edit
├── assets/               # Static assets (images, fonts)
├── storybook/            # Storybook decorators and helpers scoped to apps/web
│
├── core/                 # Domain modules + app shell (see below)
├── components/           # Reusable UI — categorised by intent
├── views/                # Page-level compositions consumed only by routes
└── routes/               # TanStack file-based routes
```

**Layer responsibilities:**

- **`core/`** — app shell (`App.tsx`, `AppProviders.tsx`, `AppLocales.tsx`, `AppTheme.tsx`) plus domain modules (`auth/`, `theme/`, `settings/`, `pwa/`, `session/`, `config/`, `social-links/`, `routes/`). No rendered UI components except domain-inseparable ones (`AuthInitializer`, `PwaLifecycle`).
- **`components/`** — reusable UI in categorised folders: `actions/`, `display/`, `feedback/`, `forms/`, `input/`, `navigation/`. Each component lives in its own `kebab-case` folder with a co-located `.stories.tsx`.
- **`views/`** — page-level compositions (`LoginView`, `DashboardView`, etc.). Pure presentational — never calls hooks from `core/`. Consumed only by routes.
- **`routes/`** — TanStack file-based routes. Each leaf has `route.tsx` (the binding) and `-UseXxxRoute.ts` (the route hook). Layout segments (`_authenticated`, `_public`) apply guards.

**Full detail:** see [`docs/structure.md`](./docs/structure.md) for the complete directory tree and [`docs/architecture.md`](./docs/architecture.md) for layer rules and data flow.

### Provider Hierarchy

```
ToastProvider (@heroui/react)
  └── AppLocales (react-intl)
        └── PwaLifecycle
              └── QueryClientProvider (@tanstack/react-query)
                    └── AppTheme (Jotai atomEffect)
                          └── AppRoutes (RouterProvider from @tanstack/react-router)
```

Auth state uses **Jotai atoms** (`core/auth/AuthAtoms.ts`) — not a React Context provider.

## Key Architectural Patterns

### Controller Pattern

Components that need to reach into `core/` for data and actions (modals, overlays, app-wide action surfaces) use a **three-file Controller pattern** so the presentational component stays pure and testable:

```
components/<category>/<component-name>/
├── <ComponentName>.tsx              # Pure, props-in/JSX-out
├── Use<ComponentName>Controller.ts  # Hook that builds props from core/ hooks
└── <ComponentName>Controller.tsx    # Two-line wrapper: useController() → <Component {...props} />
```

Routes mount the **wrapper** (`<SettingsModalController />`, `<CommandPaletteController />`) — they never import the presentational component directly. Full detail: [`docs/patterns.md#controller-pattern`](./docs/patterns.md#controller-pattern).

### Route Hook Pattern

Every route that has any logic splits into two files:

- `route.tsx` — `createFileRoute(...)({ component })` plus a tiny component that calls the hook and renders the view.
- `-UseXxxRoute.ts` — all the data fetching, mutations, and navigation callbacks, returning a props-shaped object the view can spread.

Files prefixed with `-` are ignored by TanStack Router. Detail: [`docs/patterns.md#route-hook-pattern`](./docs/patterns.md#route-hook-pattern).

### Authentication Flow

- JWT-based with refresh token mechanism stored in **Web Worker memory** via `TokenStorage` (deliberately not exported from the barrel).
- Auth state lives in Jotai atoms (`core/auth/AuthAtoms.ts`); `AuthInitializer` hydrates on mount.
- Route guards are applied by **layout segments**: `_authenticated/route.tsx` redirects unauthenticated users, `_public/route.tsx` redirects authenticated users away from login.

### Routing Strategy

- **TanStack Router** with file-based routing under `apps/web/src/routes/`.
- **Hash history** (`#/`) via `createHashHistory()`.
- Routes auto-regenerate `routeTree.gen.ts` at dev-time via `@tanstack/router-vite-plugin`.
- Route-level data fetching uses React Query via `-XxxLoader.ts` files referenced from the route's `loader`.

### State Management

| Scope | Mechanism | Location |
| --- | --- | --- |
| Global, persisted UI state | Jotai atoms + `atomEffect` | `core/<feature>/XxxAtoms.ts` |
| Feature-local UI state | Jotai atoms | next to the component (e.g. `components/actions/command-palette/CommandPaletteAtoms.ts`) |
| Server state | `@tanstack/react-query` | `packages/api` hooks; route loaders |
| Auth state | Jotai atoms + initializer | `core/auth/` |
| Component-local state | `useState`, `useReducer` | inline |

**Atoms co-locate with their consumer.** There is no central `src/atoms/` folder. See [`docs/patterns.md#atoms-co-location`](./docs/patterns.md#atoms-co-location).

### API Client Pattern

- API calls are delegated to a **Web Worker** (`ApiWorker`) to avoid blocking the main thread.
- Each endpoint is a folder under `packages/api/src/Api/<EndpointName>/` with `Classes.ts`, `Schema.ts` (Zod), `Convert.ts` (DTO → domain), and `Get.ts` / `Post.ts` (service + React Query hook).
- Errors are normalized through `ServiceErrorFactory.create()`.

### Styling Conventions

- **Tailwind CSS 4** utility classes, ordered by `prettier-plugin-tailwindcss`
- **HeroUI** components for design system consistency (Button, Input, Modal, etc.)
- Dark mode toggled by adding/removing `.dark` class on `<html>` via `atomEffect`
- Design tokens (CSS variables) imported globally in `main.css`
- Line length: 120 chars; use `clsx()` for conditional classes

## Naming & File Conventions

| Thing | Convention | Example |
| --- | --- | --- |
| React components | PascalCase file + function declaration | `LoginView.tsx`, `function LoginView()` |
| Component folders | `kebab-case` | `command-palette/`, `input-field/` |
| Hooks | PascalCase file with `Use` prefix | `UseAuth.ts`, `UseDocumentTitle.ts` |
| Route files | `route.tsx` (TanStack requirement) | `routes/_public/login/route.tsx` |
| Route hooks | `-Use<Name>Route.ts` (leading `-` hides from router) | `-UseLoginRoute.ts` |
| Controllers | `<Component>Controller.tsx` + `Use<Component>Controller.ts(x)` | `SettingsModalController.tsx` |
| Utilities / classes | PascalCase | `TokenStorage.ts`, `JwtToken.ts` |
| Jotai atom files | `PascalCaseAtoms.ts` | `ThemeAtoms.ts`, `AuthAtoms.ts` |
| Jotai atom exports | `camelCase + Atom` suffix | `themeModeAtom` |
| Views | `<Name>View.tsx` under `views/<name>/` | `LoginView.tsx`, `DashboardView.tsx` |
| Stories | Co-located `<Component>.stories.tsx` | `Logo.stories.tsx` |
| Props interfaces | `<ComponentName>Props` | `NavbarProps` |

**Function style**: Prefer **function declarations** over arrow functions for components and named utilities. Arrow functions are acceptable for callbacks and inline handlers. (ESLint enforces this.)

**Import order**: React/framework first, then external packages alphabetically, then internal packages, then `~/` aliased internals, then relative imports. ESLint enforces ordering automatically.

**`~/` alias** resolves to `apps/web/src/` — use it for all cross-layer imports. Relative imports (`./`, `../`) are reserved for files within the same folder.

**Story titles** follow `Top-Level / Category / Component Name` in Title Case. Full list of top-level buckets in [`docs/naming.md#story-titles`](./docs/naming.md#story-titles).

## TypeScript Guidelines

- Strict mode is enabled across all packages
- Explicit return types required on public APIs
- Prefer `interface` over `type` for object shapes
- Use `import type` for type-only imports
- Schemas defined with Zod; converters map API responses to domain types

## Testing Guidelines

### Unit/Component Tests (Vitest + Storybook)

- Tests run in **Chromium browser** via Playwright (not jsdom)
- Test files co-located with components as `*.test.ts(x)` or via Storybook play functions
- Coverage: Cobertura format, excludes stories, index barrels, and `.d.ts` files
- Run: `pnpm test`

### E2E Tests (Playwright)

- Located in `apps/e2e/src/**/*.spec.ts`
- Dev server auto-starts on test run
- Uses `https://localhost:5173` with HTTPS certificate bypass
- Screenshots, videos, and traces captured on failure
- Run: `pnpm test:e2e`

### Storybook Component Testing

- Stories serve as visual + interactive documentation
- Accessibility tested via `@storybook/addon-a11y`
- Every new UI component in `@package/ui` or `apps/web` **must** have a story

## Build Pipeline (Turbo)

Task execution order enforced by Turborepo:

1. `build:libs` — compiles upstream library packages (e.g. `@design/tokens`, `@config/vite`)
2. `build` — Vite bundles apps (depends on `build:libs`)
3. `storybook:build` — builds Storybook static site
4. `deploy` — copies `dist/` and `storybook-static/` to `output/deployment/`

Turborepo caches outputs; use `--force` to bypass cache when debugging build issues.

## Environment Variables

| Variable            | Default            | Mocks              |
| ------------------- | ------------------ | ------------------ |
| `VITE_APP_VERSION`  | `0.6.0`            | `0.6.0`            |
| `VITE_CONNECT_HOST` | `http://localhost` | `http://127.0.0.1` |
| `VITE_CONNECT_PORT` | `5000`             | `3100`             |

- `.env` — development defaults
- `.env.mocks` — overrides for mock server mode
- `.env.*.local` — local overrides (gitignored), invalidate Turbo cache

## Code Quality & Git Hooks

**Pre-commit** (`lint-staged`): Runs Prettier on staged `*.js`, `*.ts`, `*.tsx`, `*.scss` files.

**Commit-msg** (`commitlint`): Enforces Conventional Commits format:

```
feat: add user profile page
fix: correct token refresh timing
docs: update API usage examples
refactor: simplify auth reducer
```

**Prettier** settings: printWidth 120, tabWidth 2, double quotes, trailingComma es5, `prettier-plugin-tailwindcss` for class ordering.

**Sherif**: Checks monorepo dependency consistency. Run `pnpm lint:fix` to auto-fix mismatches.

## Reusability and Decomposition — Always Ask First

**Before writing any new code, ask two questions:**

1. **Is this component reusable?** If a component takes only props and renders UI with no view-specific logic, it likely belongs in `components/display/`, `components/feedback/`, etc. — not embedded in a view. Examples: a sparkline chart, a circular gauge, a status badge. If you can imagine using it in two different views, extract it.

2. **Should this logic be a hook?** If a component has multiple `useState` calls, derived state via `useMemo`, or a non-trivial event handler, extract that logic to a `UseXxxHook.ts` co-located with the component. The component file should read clearly — just JSX and prop wiring, not state management.

**Rule of thumb:** A view file (`XxxView.tsx`) should read like a layout — it imports panels, passes props, and renders them. A panel file should read like a form — it calls one hook and renders JSX. State goes in hooks, not in the render tree.

**View decomposition pattern:**

Large views should be split into focused sub-components co-located in the view's folder. Each panel gets its own file:

```
views/<name>/
├── <Name>View.tsx              # Orchestrates panels, passes props down
├── <Name>PageHeader.tsx        # Header / breadcrumb
├── <Name>SomePanel.tsx         # A logical section of the view
├── Use<Name>SomePanel.ts       # Hook for panel-local state (filter, sort, derived data)
├── <Name>Utils.ts              # Pure utility functions shared across panels
└── <Name>View.stories.tsx      # Story covering the full view
```

Hooks for panel-local state (filter, sort, range selection, derived totals) live alongside the panel, not inside it. The naming convention is `Use<PanelName>.ts`.

## Adding New Features — Checklist

1. **New package export**: Add file → add `export * from "./Path/To/File"` to the package's `src/index.ts`. Consumers can also bypass the barrel via the subpath export (`@package/<name>/<Path/To/File>`).
2. **New shared UI component**: Create `packages/ui/src/<Category>/<ComponentName>/` with `.tsx` + `.stories.tsx`. Story title: `Shared/<Category>/<ComponentName>`.
3. **New app-specific component**: Create `apps/web/src/components/<category>/<component-name>/` with `<ComponentName>.tsx` + `.stories.tsx`. Use the Controller pattern if it needs to reach into `core/` — see [`docs/patterns.md`](./docs/patterns.md).
4. **New view**: Create `apps/web/src/views/<name>/<Name>View.tsx` + `.stories.tsx`. Views are pure — all hooks live in the route hook. Decompose large views into panel sub-components and `Use<Panel>.ts` hooks in the same folder (see Reusability section above).
5. **New route**: Create `apps/web/src/routes/<segment>/<name>/route.tsx` + `-Use<Name>Route.ts`. File layout determines the URL; prefix `-` files are ignored by the router.
6. **New API endpoint**: Add `packages/api/src/Api/<EndpointName>/` with `Classes.ts`, `Schema.ts`, `Convert.ts`, `Get.ts`/`Post.ts`. Export via the package barrel.
7. **New Jotai atom**: Co-locate next to the feature — `core/<feature>/XxxAtoms.ts` for global state, or beside the owning component for feature-local state. Do **not** create `src/atoms/`.
8. **New hook**: Co-locate with the feature it's used by.

## MANDATORY: HeroUI v3 Components

**All UI components in this project MUST use HeroUI v3.** Do NOT use raw HTML elements, other component libraries, or HeroUI v2 patterns when a HeroUI v3 component exists for the purpose.

### Before Writing Any Component

1. **Fetch the HeroUI v3 LLM reference** to understand available components and APIs:
   - `https://heroui.com/docs/react/getting-started/llms-txt` — overview of all components
   - `https://heroui.com/docs/react/getting-started/llms-full.txt` — complete API documentation
2. If the `heroui-migration` MCP server is available, use its tools (`list_component_migration_guides`, `get_component_migration_guides`) to check for relevant guidance

### HeroUI v3 Key Rules

- **No Provider required** — HeroUI v3 components work directly without wrapping in a Provider
- **Compound components** — Use dot notation: `Card.Header`, `Card.Content`, `Card.Footer`, `Table.Header`, `Table.Body`, etc.
- **`onPress` not `onClick`** — Use `onPress` for HeroUI interactive components (Button, Link, etc.) for better accessibility
- **React 19+ compatible** — Built on modern React features
- **Tailwind CSS 4** — HeroUI v3 requires Tailwind CSS v4 (which this project uses)
- **Import from `@heroui/react`** — All components are available from the main package

### Icons: Use Heroicons

**All icons MUST use [Heroicons](https://heroicons.com/) via `@heroicons/react`.** Do not use other icon libraries or inline SVGs when a Heroicon exists.

- **Outline icons** (24px): `import { IconName } from "@heroicons/react/24/outline"`
- **Solid icons** (20px): `import { IconName } from "@heroicons/react/20/solid"`
- Browse available icons at https://heroicons.com/

### When to Use HeroUI Components

| Need | HeroUI Component |
|---|---|
| Buttons | `Button`, `ButtonGroup` |
| Forms | `Input`, `Textarea`, `Select`, `Checkbox`, `Radio`, `RadioGroup`, `Switch` |
| Layout | `Card`, `Divider`, `Spacer` |
| Navigation | `Navbar`, `Tabs`, `Breadcrumbs`, `Link`, `Pagination` |
| Feedback | `Modal`, `Popover`, `Tooltip`, `Alert`, `Spinner`, `Progress`, `Skeleton` |
| Data display | `Table`, `Chip`, `Badge`, `Avatar`, `Accordion`, `Listbox` |
| Overlay | `Dropdown`, `Modal`, `Drawer` |

Always check the LLM docs first — HeroUI v3 may have components not listed here.

## MANDATORY: Internationalization with react-intl

**All user-visible strings MUST be internationalized using `react-intl`.** Components must NEVER contain raw hardcoded strings for labels, placeholders, error messages, button text, headings, or any other text visible to the user.

### How to Use

```tsx
import { useIntl } from "react-intl";

export function MyComponent(): ReactElement {
  const intl = useIntl();

  return (
    <Button>
      {intl.formatMessage({
        description: "MyComponent - Submit button label",
        defaultMessage: "Submit",
        id: "uniqueId",
      })}
    </Button>
  );
}
```

### Key Rules

- Use `useIntl()` hook to get the `intl` object
- Use `intl.formatMessage({ description, defaultMessage, id })` for all visible strings
- **`description`**: Context for translators — format as `"ComponentName - What this string is"`
- **`defaultMessage`**: The English fallback text shown to users
- **`id`**: A unique identifier for the message (use a short hash or descriptive key)
- This applies to: labels, placeholders, button text, headings, error messages, tooltips, aria-labels, validation messages, and any other user-facing text
- Strings used only in code logic (API keys, route paths, CSS classes) do NOT need intl

## MANDATORY: Stories for All New Components

**Every new UI component MUST have a co-located Storybook story file.** This is non-negotiable.

### Requirements

- Story file: `<ComponentName>.stories.tsx` in the same directory as the component
- Must include `tags: ["autodocs"]` in meta for automatic documentation
- Must have at least one story per meaningful component state/variant
- Interactive components MUST include play functions for automated testing
- Use `/add-component-test` skill for guidance on writing play functions

### Story Discovery

Stories are discovered by Storybook from:
- `apps/web/src/**/*.stories.tsx` (via node_modules symlink)
- `packages/ui/src/**/*.stories.tsx` (via node_modules symlink)

## Available Skills (Slash Commands)

Use these skills to follow established patterns when adding to the project:

| Skill | Purpose |
|---|---|
| `/add-component` | Add a new UI component with HeroUI v3, Tailwind, React, and Storybook story |
| `/add-e2e-test` | Add Playwright E2E tests, with optional new API services and mock definitions |
| `/add-component-test` | Add component tests using Storybook play functions |
| `/add-api-test` | Add unit tests for API schemas, converters, and utilities in `packages/api/` |

## Important Notes

- **pnpm only** — do not use npm or yarn; enforced via `packageManager` field
- **HTTPS in dev** — the dev server uses a self-signed cert; browser will show a warning on first visit
- **Hash routing** — all routes use `#/` prefix; account for this in links and tests
- **Barrel index files** — each package's `src/index.ts` is hand-maintained; add new public exports there
- **React Compiler** — enabled during production builds for automatic memoization; disabled in dev for faster HMR
- **Web Worker API** — API calls go through `ApiWorker`; do not call `FetchClient` directly from components
