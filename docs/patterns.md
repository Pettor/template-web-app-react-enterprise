# Patterns

This document describes the repeatable code patterns used across `apps/web`. Follow these when adding new features so the layers from [architecture.md](./architecture.md) stay intact.

## Controller pattern

Most reusable components take props and render. Some components need to reach into `core/` for data and actions (open/close state, profile info, mutations, navigation). The **Controller pattern** keeps those components pure and reusable while still giving them a self-contained mount point.

A controller has three files:

```
components/<category>/<component-name>/
├── <ComponentName>.tsx              # Pure, props-in/JSX-out — the component
├── Use<ComponentName>Controller.ts  # Hook that builds props from core/ hooks
└── <ComponentName>Controller.tsx    # Two-line wrapper: call hook → render component
```

### When to use it

Use the Controller pattern when **all** of the following are true:

- The component lives in `components/` (not `views/` — views get props from their route hook).
- It consumes domain hooks from `core/` (`useAuth`, `useSettingsModal`, `useCommandPalette`, …).
- It should be mountable from anywhere without threading props through — typically a modal, overlay, toast, or app-wide action surface.

If a component only needs props from its parent, just write the component. No controller.

### The three files

**1. The component (`SettingsModal.tsx`)** — accepts everything it needs as props:

```tsx
export interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  sections: Section[];
  initialSection?: SettingsSection;
  account?: { name: string; email: string };
  appearance: { themeSelector: ThemeSelectorProps };
  aboutDetails: AboutDetails;
}

export function SettingsModal(props: SettingsModalProps): ReactElement {
  // pure render
}
```

**2. The hook (`UseSettingsModalController.ts`)** — assembles the props from `core/` hooks and React Query:

```ts
export function useSettingsModalController(): SettingsModalProps {
  const { isOpen, initialSection, sections, close } = useSettingsModal();
  const { appName } = useAppInfo();
  const { data: profileInfo } = useQuery({ ...fetchPersonalProfileQuery(), enabled: isAuthenticated });
  // …
  return { isOpen, sections, initialSection, onClose: close, account, appearance, aboutDetails };
}
```

**3. The wrapper (`SettingsModalController.tsx`)** — the only thing the route / layout mounts:

```tsx
export function SettingsModalController(): ReactElement {
  const props = useSettingsModalController();
  return <SettingsModal {...props} />;
}
```

### Benefits

- **Testability.** `SettingsModal` renders from pure props — stories and tests mock nothing.
- **Reusability.** The presentational component can be reused in a different wiring if needed.
- **Obvious mount points.** `SettingsModalController` and `CommandPaletteController` are the only symbols that routes import; the logic they encapsulate is opaque to the mount site.

### Examples in the codebase

- `components/feedback/settings-modal/` — settings overlay mounted in `_authenticated/route.tsx` and `_public/login/route.tsx`.
- `components/actions/command-palette/` — Cmd/Ctrl+K overlay mounted in the authenticated layout.

## Route hook pattern

Every TanStack route that has any logic follows this split:

```
routes/_public/login/
├── route.tsx               # createFileRoute + two-line component
└── -UseLoginRoute.ts       # All the logic (prefix `-` hides it from the router)
```

### The route file

Keep it boring — imports, `createFileRoute`, a component that calls the hook and renders the view.

```tsx
export const Route = createFileRoute("/_public/login")({
  component: LoginPageRoute,
  errorComponent: ({ error }) => <RouteError error={error} />,
});

function LoginPageRoute(): ReactElement {
  useDocumentTitle("Login");
  const loginProps = useLoginRoute();
  return (
    <>
      <LoginView {...loginProps} />
      <SettingsModalController />
    </>
  );
}
```

### The route hook

Holds everything URL-specific:

- Data fetching (React Query) and mutations.
- Navigation callbacks (`useNavigate`).
- Form submit handlers, error translation.
- Shaping the props object consumed by the view.

Return a single `XxxViewProps`-shaped object so the route component can spread it directly: `<XxxView {...props} />`.

### The view

Lives in `views/<name>/<Name>View.tsx`. Accepts the props object. Never calls hooks from `core/` or `@package/api` directly — if you find yourself wanting to, move the call into the route hook.

## Atoms co-location

Jotai atoms are feature-scoped, not app-scoped. They live next to whichever layer owns them:

- **Global domain state** → `core/<feature>/XxxAtoms.ts` (e.g. `core/theme/ThemeAtoms.ts`, `core/auth/AuthAtoms.ts`).
- **Feature-local state** → next to the component that owns it (e.g. `components/actions/command-palette/CommandPaletteAtoms.ts`).

Persistence uses `atomEffect` from `jotai-effect`:

```ts
const themeModeBaseAtom = atom<ThemeMode>(readFromStorage());
const themeModeEffect = atomEffect((get) => {
  const mode = get(themeModeBaseAtom);
  localStorage.setItem("theme-mode", mode);
});
export const themeModeAtom = atom(
  (get) => {
    get(themeModeEffect);
    return get(themeModeBaseAtom);
  },
  (_get, set, next: ThemeMode) => set(themeModeBaseAtom, next)
);
```

**Rule:** there is no `src/atoms/` folder. Put the atom where its consumer lives.

## Hook naming and shape

- Hook files are PascalCase with a `Use` prefix: `UseAuth.ts`, `UseLoginRoute.ts`, `UseSettingsModalController.ts`.
- Exported hook function is camelCase: `useAuth`, `useLoginRoute`, `useSettingsModalController`.
- Return an object (not a tuple) so callers can destructure only what they need.
- Explicit return type on every exported hook.

## Component file conventions

- Function declarations, not arrow functions: `export function MyComponent(props: MyComponentProps): ReactElement { … }`.
- Every component has a `<ComponentName>Props` interface.
- Every component has a co-located `.stories.tsx`. Interactive components add play functions. See [`/add-component-test`](../.claude/commands/add-component-test.md).
- Use `data-testid` of the form `component-name__element-name` (double underscore) for elements that stories or E2E tests interact with.

## Internationalisation

Every user-visible string goes through `react-intl`. See CLAUDE.md for the mandatory `intl.formatMessage({ description, defaultMessage, id })` format. Never hard-code a visible string, aria-label, placeholder, or validation message.

## Icons

All icons come from Heroicons:

- Outline (24px): `import { IconName } from "@heroicons/react/24/outline"`.
- Solid (20px): `import { IconName } from "@heroicons/react/20/solid"`.

Don't import icons from other libraries and don't inline SVGs when a Heroicon exists.
