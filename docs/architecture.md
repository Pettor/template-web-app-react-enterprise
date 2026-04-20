# Architecture

This document describes the high-level architecture of `apps/web`, the main React application. It focuses on how code is organised, how responsibility is split between layers, and how data flows at runtime.

For the detailed directory layout, see [structure.md](./structure.md). For the repeatable code patterns, see [patterns.md](./patterns.md).

## Guiding principles

- **One clear home per concern.** Any given file belongs in exactly one layer. If you can't decide which layer fits, the boundary between layers needs refinement — not a copy in both.
- **Domain logic does not depend on UI.** `core/` may be consumed by `components/`, `views/`, and `routes/`; it must never import from them.
- **Routes compose, they do not implement.** A route file wires together a view, a route hook, and possibly controllers. All interesting logic lives below the route.
- **Co-locate by feature.** Atoms, hooks, stories, sub-components, and types live in the same folder as the component they belong to. Cross-feature sharing is the exception, not the default.

## The four layers

```
apps/web/src/
├── core/         # Domain modules + app shell (auth, theme, settings, pwa, session, routes, config, social-links)
├── components/   # Reusable UI — categorised by intent (actions, display, feedback, forms, input, navigation)
├── views/        # Page-level compositions consumed only by routes
└── routes/       # TanStack file-based routes — the binding from URL to view
```

### `core/` — domain modules and app shell

`core/` holds everything that is **not a rendered UI component** but is still specific to this application:

- App shell entry points: `App.tsx`, `AppProviders.tsx`, `AppLocales.tsx`, `AppTheme.tsx`.
- Feature domains: `auth/`, `theme/`, `settings/`, `pwa/`, `session/`, `config/`, `social-links/`.
- Router setup: `routes/AppRoutes.tsx` and the `routes/logic/` route-level UI (loading, error).

Each feature domain typically contains:

- A Jotai atoms file (`XxxAtoms.ts`) when it holds global state.
- One or more hooks (`UseXxx.ts`) that expose the domain to the UI.
- Plain TypeScript types/interfaces describing the domain (`AuthState.ts`, `ThemeMode.ts`, `SettingsSection.ts`, …).

**Rule of thumb:** if removing the file would break compilation in more than one UI layer (components + views + routes), it belongs in `core/`.

### `components/` — reusable UI

`components/` holds every piece of reusable UI specific to this app. Shared UI that could live in multiple apps belongs in `packages/ui` instead.

Components are organised by **intent**:

| Category | Purpose |
| --- | --- |
| `actions/` | UI that triggers side effects (command palette, theme selector, quick menus) |
| `display/` | Presentation-only building blocks (grid items, cards, chips) |
| `feedback/` | Overlays and dialogs that communicate state (settings modal, PWA dialogs) |
| `forms/` | Form shells for specific flows (login, sign-up, forgot-password) |
| `input/` | Reusable form controls (input field, checkboxes) |
| `navigation/` | In-app navigation (navbar content, menu items) |

Each component lives in its own folder: `components/<category>/<component-name>/` with at least `<ComponentName>.tsx` and `<ComponentName>.stories.tsx`.

See [patterns.md](./patterns.md) for the **Controller pattern** used when a component needs to reach into `core/` for data and actions.

### `views/` — page-level compositions

`views/` holds the top-level visual layout for each route. A view receives props from a route hook and renders the full page: background, layout, component tree.

Views are **only** consumed by route files. They never import from `routes/` and rarely hold state themselves — all state and callbacks are passed in from the route hook.

A typical view folder contains the view component plus any private sub-components that exist only to support it. Example:

```
views/login/
├── LoginView.tsx            # The page composition
├── LoginView.stories.tsx    # Storybook story
└── (private sub-components) # Only if they have no reuse outside this view
```

### `routes/` — TanStack file-based routes

`routes/` is generated-friendly: the directory layout is the URL structure. Each leaf has:

- `route.tsx` — the TanStack `createFileRoute` binding. Imports the view and the route hook, wires them together.
- `-UseXxxRoute.ts` — the route hook (prefixed with `-` so TanStack ignores it). Holds data fetching, mutations, navigation callbacks, and anything URL-specific.
- `-XxxLoader.ts` (optional) — route loaders for data prefetching via React Query.

Layout segments (`_authenticated`, `_public`) apply guards and shared UI to all child routes. See `core/routes/logic/` for the `RouteLoading` and `RouteError` primitives referenced from the router config.

## Provider hierarchy

Providers wrap the app in order of independence — the outermost providers depend on the fewest others.

```
HeroUIProvider (implicit via HeroUI v3 — no Provider component needed)
  └── ToastProvider (@heroui/react)
        └── AppLocales (react-intl)
              └── PwaLifecycle
                    └── QueryClientProvider (@tanstack/react-query)
                          └── AppTheme (theme bootstrapping via Jotai atomEffect)
                                └── AppRoutes (RouterProvider from @tanstack/react-router)
```

Authentication state uses **Jotai atoms** (`core/auth/AuthAtoms.ts`) rather than a React Context provider; `AuthInitializer` hydrates the atom on mount.

## Data flow

### UI → domain

1. A component or view calls a hook from `core/` (e.g. `useAuth`, `useSettingsModal`, `useCommandPalette`).
2. The hook reads atom state or calls into a service.
3. Mutations flow through `@tanstack/react-query` mutations defined in `@package/api`.

### Domain → UI

1. Atoms in `core/<feature>/XxxAtoms.ts` hold global state; `atomEffect` persists relevant slices to localStorage.
2. React Query caches server state; components consume it via the hooks exposed from `@package/api`.
3. Route hooks adapt domain data into the props shape each view expects.

### Route → view

```
route.tsx
  → -UseXxxRoute.ts (builds the props object)
  → XxxView (pure presentation)
```

When a route needs to render a feature that reaches across the app (settings modal, command palette), it mounts a **Controller component** alongside the view. The controller owns its own `useXxxController` hook and does not need props from the route. See [patterns.md#controller-pattern](./patterns.md#controller-pattern).

## State management

| Scope | Mechanism | Where |
| --- | --- | --- |
| Global, persisted UI state | Jotai atoms + `atomEffect` | `core/<feature>/XxxAtoms.ts` |
| Local, ephemeral UI state | Jotai atoms (no persistence) | co-located with the consumer (e.g. `components/actions/command-palette/CommandPaletteAtoms.ts`) |
| Server state | `@tanstack/react-query` | `packages/api` hooks; route loaders |
| Auth state | Jotai atoms + initializer | `core/auth/` |
| Component-local state | `useState`, `useReducer` | inline |

Atoms live **as close to their consumer as possible**. There is no central `src/atoms/` folder — global atoms sit in the relevant `core/` feature, and feature-local atoms sit next to the component that owns the feature.

## API layer

- All API calls are delegated to a **Web Worker** (`ApiWorker`) via `@package/api`'s `ApiClient`, keeping the main thread free.
- Each endpoint is a folder under `packages/api/src/Api/<EndpointName>/` containing `Schema.ts` (Zod), `Classes.ts` (domain types), `Convert.ts` (DTO → domain), and `Post.ts` / `Get.ts` (service + React Query hook).
- `TokenStorage` is intentionally **not exported** from the barrel — access tokens stay inside worker memory.

See [packages.md](./packages.md#packageapi) for the full package tour.
