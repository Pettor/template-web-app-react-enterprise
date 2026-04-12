# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

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
- `pnpm generate:exports` - Regenerate barrel exports for all packages (run after adding new files)

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
│   ├── react/        # (@package/react) React utilities and hooks
│   ├── mocks/        # (@package/mocks) Mock data and test utilities
│   └── storybook/    # (@package/storybook) Storybook decorators
├── configs/
│   ├── eslint/       # (@config/eslint) Shared ESLint configs
│   ├── tailwind/     # (@config/tailwind) Shared Tailwind config
│   ├── typescript/   # (@config/typescript) Shared tsconfig bases
│   ├── vite/         # (@config/vite) Vite config factory functions
│   └── barrelsby/    # (@config/barrelsby) Barrel export generator config
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
- **Stack**: Storybook 10 with React/Vite builder, addon-vitest (Playwright/Chromium), addon-a11y, addon-docs
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
- `TokenStorage`, `JwtToken` — JWT token management
- `ServiceError`, `ServiceErrorFactory` — Typed error handling
- API endpoint services: `Login`, `Logout`, `RefreshToken`, `ForgotPassword`, `SelfRegister`, `ApplicationInfo`, `PersonalProfile`
- Classes, Schemas, Converters, Fetch utilities

### `@package/ui` — Shared UI Components

Key exports: `Logo`, `LogoFull`, `GithubIcon`, `LinkedInIcon`, `BasicLayout`, `NavbarLayout`, `BlueFadeBackground`, `GridBackground`, `Navbar`

### `@package/react` — React Utilities & Hooks

Key exports: `UseMediaQuery`, `UseRunOnce`, `LocalStorage`, `IndexDbStorage`, `GetCrypto`, `Base64`, `SHA256`, `JoinChildren`, `Sleep`

### `@package/mocks` — Mock Data & Test Utilities

Key exports: `AdminApiClient`, helpers for mock server integration (used in `apps/mock`)

### `@design/tokens` — Design System Tokens

- Built with **Style Dictionary 5** in W3C token format
- Exports: `./css` → `variables.css` (CSS custom properties), `./tailwind` → `theme.js` (Tailwind color palette)
- Provides semantic color system for light/dark themes

## Web App Architecture (`apps/web/src/`)

```
src/
├── main.tsx              # Entry point — mounts React into #root
├── main.css              # Global styles (imports Tailwind + design tokens)
├── core/                 # App shell, providers, routing, auth
│   ├── App.tsx           # Root component: wraps AppProviders → AppTheme → AppRoutes
│   ├── AppProviders.tsx  # Provider stack (see hierarchy below)
│   ├── AppTheme.tsx      # Theme initialization hook
│   ├── AppLocales.tsx    # React Intl i18n setup
│   ├── auth/             # Auth context, reducer, provider, useAuth hook
│   ├── config/           # App-level configuration constants
│   └── routes/           # Route definitions and protection logic
│       ├── AppRoutes.tsx
│       ├── PrivateRoutes.tsx
│       ├── PublicRoutes.tsx
│       ├── RouteProviders.tsx
│       └── logic/        # PrivateRouteLogic, PublicRouteLogic
├── atoms/                # Jotai atoms (e.g., ThemeAtoms.ts with atomEffect)
├── classes/              # TypeScript interfaces and business logic classes
│   ├── auth/             # AuthState, AuthStatus
│   ├── theme/            # ThemeMode, UseTheme
│   ├── appbar/
│   ├── app-social-links/
│   └── app-session/
├── pages/                # Route-level components (one folder per route)
│   ├── home/
│   ├── login/
│   ├── sign-up/
│   ├── forgot-password/
│   ├── about/            # Example of nested route with modal
│   └── not-found/
├── components/           # Reusable UI components by category
│   ├── actions/          # Action-triggered components
│   ├── display/          # Presentation-only components
│   ├── feedback/         # Toast notifications, etc.
│   ├── forms/            # Form components
│   ├── input/            # Input controls
│   ├── modules/          # Feature modules (e.g., PWA prompt)
│   ├── navigation/       # Navigation components
│   └── views/            # Page layout wrappers
└── assets/               # Static assets (images, fonts)
```

### Provider Hierarchy

```
HeroUIProvider
  └── ToastProvider
        └── AppLocales (React Intl)
              └── PwaProviderModule
                    └── QueryClientProvider (React Query)
                          └── AuthProvider (React Context)
                                └── AppTheme + AppRoutes
```

## Key Architectural Patterns

### Authentication Flow

- JWT-based with refresh token mechanism stored via `TokenStorage`
- `AuthProvider` wraps auth state in React Context with `useReducer`
- Token refresh is attempted on app initialization via `useRunOnce` hook
- Dispatched actions: `auth/login`, `auth/logout`
- Route guards: `PrivateRouteLogic` (redirects unauthenticated users), `PublicRouteLogic` (redirects authenticated users away from login)

### Routing Strategy

- **Hash-based routing** (`#/`) with React Router v6
- Routes are **lazy-loaded** via `React.lazy()` for code splitting
- Public and private routes defined separately in `PrivateRoutes.tsx` / `PublicRoutes.tsx`
- Route-level data fetching uses React Query via loaders

### State Management

| Scope              | Tool                                                  | Location         |
| ------------------ | ----------------------------------------------------- | ---------------- |
| Theme / global app | Jotai atoms + `atomEffect` (localStorage persistence) | `src/atoms/`     |
| Server / API data  | React Query (`useQuery`, `useMutation`)               | page-level hooks |
| Authentication     | React Context + `useReducer`                          | `src/core/auth/` |
| Component-local    | `useState`, `useReducer`                              | inline           |

### API Client Pattern

- API calls are delegated to a **Web Worker** (`ApiWorker`) to avoid blocking the main thread
- Service classes encapsulate each endpoint (typed request/response)
- Errors are normalized through `ServiceErrorFactory`

### Styling Conventions

- **Tailwind CSS 4** utility classes, ordered by `prettier-plugin-tailwindcss`
- **HeroUI** components for design system consistency (Button, Input, Modal, etc.)
- Dark mode toggled by adding/removing `.dark` class on `<html>` via `atomEffect`
- Design tokens (CSS variables) imported globally in `main.css`
- Line length: 120 chars; use `clsx()` for conditional classes

## Naming & File Conventions

| Thing               | Convention                              | Example                                   |
| ------------------- | --------------------------------------- | ----------------------------------------- |
| React components    | PascalCase file + function declaration  | `LoginRoute.tsx`, `function LoginRoute()` |
| Hooks               | PascalCase with `Use` prefix            | `UseAuth.ts`, `UseRunOnce.ts`             |
| Utilities / classes | PascalCase                              | `TokenStorage.ts`, `JwtToken.ts`          |
| Jotai atoms         | camelCase + `Atom` suffix               | `themeModeAtom`                           |
| Barrel exports      | Auto-generated `index.ts` via barrelsby | do not edit manually                      |
| Page routes         | `[Name]Route.tsx`                       | `LoginRoute.tsx`, `HomeRoute.tsx`         |
| Stories             | Co-located `[Component].stories.tsx`    | `Logo.stories.tsx`                        |
| Props interfaces    | `[ComponentName]Props`                  | `NavbarProps`                             |

**Function style**: Prefer **function declarations** over arrow functions for components and named utilities. Arrow functions are acceptable for callbacks and inline handlers. (ESLint enforces this.)

**Import order**: React/framework first, then external packages alphabetically, then internal packages, then relative imports. ESLint enforces ordering automatically.

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

1. `build:exports` — barrelsby generates `src/index.ts` barrel files
2. `build:libs` — compiles packages with their barrel exports
3. `build` — Vite bundles apps (depends on `build:libs`)
4. `storybook:build` — builds Storybook static site
5. `deploy` — copies `dist/` and `storybook-static/` to `output/deployment/`

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

## Adding New Features — Checklist

1. **New package export**: Add file → run `pnpm generate:exports` to regenerate barrel
2. **New UI component**: Create in `packages/ui/src/` or `apps/web/src/components/`, add `.stories.tsx`
3. **New page/route**: Create folder in `apps/web/src/pages/`, add route entry in `PrivateRoutes.tsx` or `PublicRoutes.tsx`
4. **New API endpoint**: Add service class in `packages/api/src/`, export via barrel
5. **New Jotai atom**: Add to `apps/web/src/atoms/`
6. **New hook**: Add to `packages/react/src/hooks/` or co-locate with feature

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
- **Barrel index files** — never edit `src/index.ts` files manually; they are auto-generated by barrelsby
- **React Compiler** — enabled during production builds for automatic memoization; disabled in dev for faster HMR
- **Web Worker API** — API calls go through `ApiWorker`; do not call `FetchClient` directly from components
