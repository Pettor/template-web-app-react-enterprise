# Packages

This document tours the workspace packages. Packages differ from apps in two ways:

- They export a public API through a hand-maintained `src/index.ts` barrel.
- They use `PascalCase` folder names internally (historical — kept consistent across packages).

For the `apps/web` layered structure, see [structure.md](./structure.md).

## Workspace layout

```
packages/
├── api/         # @package/api     — API client, auth, endpoints
├── ui/          # @package/ui      — cross-app UI (logos, layouts, icons)
├── mocks/       # @package/mocks   — mock server admin client + helpers
└── storybook/   # @package/storybook — Storybook decorators and helpers

configs/
├── eslint/      # @config/eslint       — shared ESLint configs
├── tailwind/    # @config/tailwind     — shared Tailwind config
├── typescript/  # @config/typescript   — shared tsconfig bases
└── vite/        # @config/vite         — Vite config factory functions

design/
└── tokens/      # @design/tokens       — Style Dictionary design tokens
```

## `@package/api`

API client, authentication, and endpoint services. All API calls are delegated to a **Web Worker** so the main thread stays free.

```
packages/api/src/
├── Api/                 # One folder per endpoint
│   ├── ApplicationInfo/
│   ├── Dashboard/
│   ├── ForgotPassword/
│   ├── Login/
│   ├── Logout/
│   ├── PersonalProfile/
│   ├── RefreshToken/
│   └── SelfRegister/
├── Client/              # HTTP clients
│   ├── ApiClient.ts          # Delegates to the Worker
│   └── FetchClient.ts        # Low-level fetch wrapper
├── Service/
│   ├── CreateServiceError.ts
│   └── ServiceError.ts
├── Token/
│   ├── JwtToken.ts
│   └── TokenStorage.ts       # ⚠ NOT exported from index.ts — worker-scope only
├── Worker/
│   ├── ApiWorker.ts          # The Web Worker entry point
│   ├── ApiWorkerAllowedUrls.ts
│   ├── ApiWorkerClient.ts
│   └── …
└── index.ts             # Public barrel
```

### Endpoint folder layout

Every endpoint under `Api/` follows the same file set:

| File | Purpose |
| --- | --- |
| `Classes.ts` | Domain types and query keys (`QUERY_KEY_XXX`) |
| `Schema.ts` | Zod schema + inferred `XxxDto` type |
| `Convert.ts` | `xxxConvertFromDto(dto) → domain` |
| `Get.ts` / `Post.ts` | Service function + React Query hook (`useFetchXxxQuery`, `usePostXxxMutate`) |

### Security note — `TokenStorage`

`TokenStorage` is deliberately **not** re-exported from `src/index.ts`. The access token lives only in Web Worker memory. Importing it from a component or from outside the worker scope would defeat the isolation and is blocked by convention.

### Testing

Co-located `*.test.ts` files run under Vitest with a Node.js environment. See [`/add-api-test`](../.claude/commands/add-api-test.md).

## `@package/ui`

Cross-app shared UI. Components here must be consumable by **any** app (not just `apps/web`).

```
packages/ui/src/
├── Branding/
│   ├── Logo/
│   └── LogoFull/
├── Icons/
│   └── Social/           # GithubIcon, LinkedInIcon
├── Layout/
│   ├── Background/       # BlueFadeBackground, GridBackground
│   ├── BasicLayout/
│   └── NavbarLayout/
├── Navigation/
│   └── Navbar/
├── Storybook/            # UI-specific story helpers
├── main.css              # Tailwind layer the package contributes
└── index.ts
```

Every component folder has `<ComponentName>.tsx` + `<ComponentName>.stories.tsx`. Stories use the `Shared/<Category>/<ComponentName>` title pattern — see [naming.md#story-titles](./naming.md#story-titles).

## `@package/mocks`

Client for controlling the Mocks Server at runtime, plus helpers used by `apps/mock` and `apps/e2e`.

```
packages/mocks/src/
├── AdminApiClient.ts     # Talks to the Mocks Server admin API
├── Helpers.ts            # Shared helpers for spec setup
├── Types.ts
└── index.ts
```

E2E tests use `mocksClient.useRouteVariant("<OperationId>:<variant-name>")` to switch mock responses per test. See [`/add-e2e-test`](../.claude/commands/add-e2e-test.md).

## `@package/storybook`

Storybook decorators consumed by stories in both `apps/web` and `packages/ui`.

Notable export:

- `ContainerDecorator` — centres a component inside a sized container. Use it for form/card stories that would otherwise render at full width.

## `@design/tokens`

Design tokens built with **Style Dictionary 5** in W3C token format.

Exports:

- `@design/tokens/css` → `variables.css` (CSS custom properties — imported in `apps/web/src/main.css`).
- `@design/tokens/tailwind` → `theme.js` (Tailwind colour palette consumed by `@config/tailwind`).

## Configs

Each `configs/*` package is a small shared config used by apps and other packages:

| Package | Purpose |
| --- | --- |
| `@config/eslint` | Base ESLint configs (root, React, Node) |
| `@config/tailwind` | Shared Tailwind config including the design tokens palette |
| `@config/typescript` | `tsconfig` bases (`base.json`, `react.json`, `node.json`) |
| `@config/vite` | Vite config factories (web, library, storybook) |

## Apps at a glance

| App | Stack | Entry | Port |
| --- | --- | --- | --- |
| `apps/web` | React 19, Vite 8, Tailwind 4, HeroUI v3, TanStack Router | `src/main.tsx` | 5173 (HTTPS) |
| `apps/storybook` | Storybook 10 + Vite builder | `main.ts` | 9050 |
| `apps/e2e` | Playwright 1.58, Chromium | `src/specs/*.spec.ts` | — (runs against 5173) |
| `apps/mock` | Mocks Server 4.1 | `mocks.config.js` | 3100 |

For app-specific architecture, see [architecture.md](./architecture.md).
