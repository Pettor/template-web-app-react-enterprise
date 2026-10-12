import { jsStringLiteral, removeOnce, removeYamlJob, removeYamlStep, replaceOnce } from "./textEdit.mjs";

const DELETE_PATHS = [
  "packages/api",
  "packages/mocks",
  "tools/mock",
  "apps/e2e",
  "apps/web/src/core/auth",
  "apps/web/src/core/session",
  "apps/web/src/routes/_authenticated",
  "apps/web/src/routes/_public",
  "apps/web/src/views/login",
  "apps/web/src/views/sign-up",
  "apps/web/src/views/forgot-password",
  "apps/web/src/views/dashboard",
  "apps/web/src/storybook/data/DashboardData.ts",
  "apps/web/src/storybook/data/AppSessionData.ts",
  "apps/web/.env.mocks",
];

function deleteBackendFilesAndDirs(ws) {
  for (const relPath of DELETE_PATHS) ws.rm(relPath);
}

function writeHomeRoute(ws) {
  ws.write(
    "apps/web/src/routes/index/route.tsx",
    `import type { ReactElement } from "react";
import { useDocumentTitle } from "@package/react";
import { createFileRoute } from "@tanstack/react-router";
import { CommandPaletteController } from "~/components/actions/command-palette/CommandPaletteController";
import { SettingsModalController } from "~/components/feedback/settings-modal/SettingsModalController";
import { RouteError } from "~/core/routes/logic/RouteError";
import { HomeView } from "~/views/home/HomeView";

export const Route = createFileRoute("/")({
  component: HomePageRoute,
  errorComponent: ({ error }) => <RouteError error={error} />,
});

function HomePageRoute(): ReactElement {
  useDocumentTitle("Home");

  return (
    <>
      <HomeView />
      <SettingsModalController />
      <CommandPaletteController />
    </>
  );
}
`
  );
}

function writeHomeView(ws, { projectName }) {
  const name = jsStringLiteral(projectName);
  ws.write(
    "apps/web/src/views/home/HomeView.tsx",
    `import type { ReactElement } from "react";
import { useIntl } from "react-intl";

export function HomeView(): ReactElement {
  const intl = useIntl();

  return (
    <div className="grid min-h-[60vh] w-full place-items-center px-4 text-center">
      <div className="flex max-w-2xl flex-col items-center gap-4">
        <h1 className="text-4xl font-medium md:text-5xl">
          {intl.formatMessage({
            description: "HomeView: heading - welcome title",
            defaultMessage: "Welcome to ${name}",
            id: "hV2wQ1",
          })}
        </h1>
        <p className="text-default-500 text-lg">
          {intl.formatMessage({
            description: "HomeView: body - getting started copy",
            defaultMessage: "This is your starting point — edit HomeView.tsx to build out your application.",
            id: "pT88Lm",
          })}
        </p>
      </div>
    </div>
  );
}
`
  );
}

function writeRootRoute(ws) {
  ws.write(
    "apps/web/src/routes/__root/route.tsx",
    `import type { QueryClient } from "@tanstack/react-query";
import { createRootRouteWithContext } from "@tanstack/react-router";

export interface RouterContext {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<RouterContext>()({});
`
  );
}

function stripAppRoutes(ws) {
  ws.edit("apps/web/src/core/routes/AppRoutes.tsx", (content) => {
    content = removeOnce(content, "    authStatus: undefined!,\n", "AppRoutes router context stub");
    content = replaceOnce(
      content,
      '<RouterProvider router={router} context={{ queryClient, authStatus: "idle" }} />',
      "<RouterProvider router={router} context={{ queryClient }} />",
      "AppRoutes RouterProvider context"
    );
    return content;
  });
}

function fixNotFoundRoute(ws) {
  ws.edit("apps/web/src/routes/$/route.tsx", (content) => {
    content = replaceOnce(content, 'navigate({ to: "/login" });', 'navigate({ to: "/" });', "404 navigate target");
    content = replaceOnce(
      content,
      `description: "NotFoundRoute: button - go to login",\n          defaultMessage: "Go to login",`,
      `description: "NotFoundRoute: button - go home",\n          defaultMessage: "Go home",`,
      "404 button copy"
    );
    return content;
  });
}

function simplifySettingsModal(ws) {
  ws.write(
    "apps/web/src/core/settings/UseSettingsModal.ts",
    `import { useCallback } from "react";
import { useAtom } from "jotai";
import { settingsModalAtom } from "./SettingsAtoms";
import type { SettingsSection } from "./SettingsSection";

const SECTIONS: SettingsSection[] = ["appearance", "about"];

export interface UseSettingsModalResult {
  isOpen: boolean;
  initialSection?: SettingsSection;
  sections: SettingsSection[];
  open: (section?: SettingsSection) => void;
  close: () => void;
}

export function useSettingsModal(): UseSettingsModalResult {
  const [state, setState] = useAtom(settingsModalAtom);

  const open = useCallback(
    (section?: SettingsSection) => {
      setState({ isOpen: true, initialSection: section });
    },
    [setState]
  );

  const close = useCallback(() => {
    setState({ isOpen: false });
  }, [setState]);

  return {
    isOpen: state.isOpen,
    initialSection: state.initialSection,
    sections: SECTIONS,
    open,
    close,
  };
}
`
  );

  ws.write(
    "apps/web/src/components/feedback/settings-modal/UseSettingsModalController.ts",
    `import { useMemo } from "react";
import type { SettingsModalProps } from "./SettingsModal";
import { useThemeSelector } from "~/components/actions/theme-selector/UseThemeSelector";
import { useAppInfo } from "~/core/config/UseAppInfo";
import { useSettingsModal } from "~/core/settings/UseSettingsModal";

export function useSettingsModalController(): SettingsModalProps {
  const { isOpen, initialSection, sections, close } = useSettingsModal();
  const { appName } = useAppInfo();
  const themeSelector = useThemeSelector();

  const aboutDetails = useMemo(
    () => ({
      appName,
      appVersion: import.meta.env.VITE_APP_VERSION,
    }),
    [appName]
  );

  return {
    isOpen,
    sections,
    initialSection,
    onClose: close,
    appearance: { themeSelector },
    aboutDetails,
  };
}
`
  );

  ws.edit("apps/web/src/components/feedback/about-details/AboutDetails.tsx", (content) => {
    content = replaceOnce(
      content,
      "  appVersion: string;\n  serverVersion: string;\n}",
      "  appVersion: string;\n  serverVersion?: string;\n}",
      "AboutDetailsProps.serverVersion optional"
    );
    content = replaceOnce(
      content,
      `            <TableRow key="3">
              <TableCell className="font-semibold">
                {intl.formatMessage({
                  description: "AboutDetails: label - server version",
                  defaultMessage: "Server version",
                  id: "xBAyfF",
                })}
              </TableCell>
              <TableCell>{serverVersion}</TableCell>
            </TableRow>`,
      `            {serverVersion !== undefined && (
              <TableRow key="3">
                <TableCell className="font-semibold">
                  {intl.formatMessage({
                    description: "AboutDetails: label - server version",
                    defaultMessage: "Server version",
                    id: "xBAyfF",
                  })}
                </TableCell>
                <TableCell>{serverVersion}</TableCell>
              </TableRow>
            )}`,
      "AboutDetails server version row"
    );
    return content;
  });
}

function simplifyCommandPalette(ws) {
  ws.write(
    "apps/web/src/components/actions/command-palette/UseCommandPaletteController.tsx",
    `import { useMemo } from "react";
import { ComputerDesktopIcon, HomeIcon, MoonIcon, SunIcon } from "@heroicons/react/20/solid";
import { useNavigate } from "@tanstack/react-router";
import { useSetAtom } from "jotai";
import { useIntl } from "react-intl";
import type { Command } from "./Command";
import type { CommandPaletteProps } from "./CommandPalette";
import { useCommandPalette } from "./UseCommandPalette";
import { useCommandPaletteShortcut } from "./UseCommandPaletteShortcut";
import { useCommandShortcuts } from "./UseCommandShortcuts";
import { themeModeAtom } from "~/core/theme/ThemeAtoms";
import type { ThemeMode } from "~/core/theme/ThemeMode";

/**
 * Builds the app's default command list (navigation, theme), wires up the
 * Cmd/Ctrl+K shortcut and per-command shortcuts, and returns props ready to
 * spread onto \`<CommandPalette>\`. To add or change commands, extend the array
 * returned from \`useMemo\` below — \`Command\` is intentionally minimal.
 */
export function useCommandPaletteController(): CommandPaletteProps {
  const intl = useIntl();
  const navigate = useNavigate();
  const setThemeMode = useSetAtom(themeModeAtom);
  const { isOpen, close } = useCommandPalette();

  const navigationGroup = intl.formatMessage({
    description: "CommandPaletteController: label - navigation group",
    defaultMessage: "Navigation",
    id: "RCtY7O",
  });
  const appearanceGroup = intl.formatMessage({
    description: "CommandPaletteController: label - appearance group",
    defaultMessage: "Appearance",
    id: "vWoN3+",
  });

  const commands = useMemo<Command[]>(() => {
    function setTheme(mode: ThemeMode): void {
      setThemeMode(mode);
    }

    return [
      {
        id: "goto-home",
        label: intl.formatMessage({
          description: "CommandPaletteController: label - go to home command",
          defaultMessage: "Go to Home",
          id: "0M2q2L",
        }),
        description: intl.formatMessage({
          description: "CommandPaletteController: caption - go to home command",
          defaultMessage: "Navigate to the home view",
          id: "rHCEXQ",
        }),
        group: navigationGroup,
        keywords: ["home", "start"],
        icon: <HomeIcon className="h-4 w-4" />,
        shortcut: { mod: true, shift: true, key: "h" },
        perform: () => {
          void navigate({ to: "/" });
        },
      },
      {
        id: "theme-auto",
        label: intl.formatMessage({
          description: "CommandPaletteController: label - theme system command",
          defaultMessage: "Theme: System",
          id: "xr2NN2",
        }),
        group: appearanceGroup,
        keywords: ["auto", "system", "theme"],
        icon: <ComputerDesktopIcon className="h-4 w-4" />,
        perform: () => setTheme("auto"),
      },
      {
        id: "theme-light",
        label: intl.formatMessage({
          description: "CommandPaletteController: label - theme light command",
          defaultMessage: "Theme: Light",
          id: "MibXHq",
        }),
        group: appearanceGroup,
        keywords: ["light", "theme"],
        icon: <SunIcon className="h-4 w-4" />,
        shortcut: { mod: true, shift: true, key: "l" },
        perform: () => setTheme("light"),
      },
      {
        id: "theme-dark",
        label: intl.formatMessage({
          description: "CommandPaletteController: label - theme dark command",
          defaultMessage: "Theme: Dark",
          id: "5ywSOX",
        }),
        group: appearanceGroup,
        keywords: ["dark", "theme"],
        icon: <MoonIcon className="h-4 w-4" />,
        shortcut: { mod: true, shift: true, key: "k" },
        perform: () => setTheme("dark"),
      },
    ];
  }, [intl, navigate, setThemeMode, navigationGroup, appearanceGroup]);

  useCommandPaletteShortcut();
  useCommandShortcuts(commands);

  return { isOpen, commands, onClose: close };
}
`
  );
}

function stripViteConfig(ws, { devPort }) {
  ws.write(
    "apps/web/vite.config.ts",
    `import { createBaseConfig, createPWAConfig, createReactConfig, mergeConfigs } from "@config/vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import basicSsl from "@vitejs/plugin-basic-ssl";
import { defineConfig, mergeConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  const config = mergeConfigs([
    createBaseConfig(),
    createReactConfig({ enableReactCompiler: command === "build" }),
    createPWAConfig(),
    {
      plugins: [tanstackRouter({ routeToken: "route" })],
    },
    { resolve: { dedupe: ["react", "react-dom"] } },
  ]);

  switch (command) {
    case "build":
      return mergeConfig(config, {
        base: "./",
        build: {
          commonjsOptions: {
            exclude: ["@faker-js/faker"],
          },
        },
      });
    case "serve":
      return mergeConfig(config, {
        server: {
          cors: true,
          // basicSsl() below provides the self-signed cert; https: true signals intent
          https: true,
          port: ${devPort},
        },
        plugins: [basicSsl()],
      });
  }
});
`
  );
}

function stripWebPackageJson(ws) {
  ws.editJson("apps/web/package.json", (data) => {
    delete data.scripts["dev:mocks"];
    delete data.scripts["test:e2e:env"];
    delete data.scripts["test:e2e:env:coverage"];
    delete data.dependencies["@package/api"];
    delete data.devDependencies["vite-plugin-http2-proxy"];
    delete data.devDependencies["vite-plugin-istanbul"];
    delete data.devDependencies["cross-env"];
  });
}

function stripRootPackageJson(ws) {
  ws.editJson("package.json", (data) => {
    for (const script of [
      "dev:mocks",
      "dev:mocks:cli",
      "generate:screenshots",
      "test:e2e",
      "test:e2e:ci",
      "test:e2e:ui",
      "test:e2e:env",
      "test:e2e:coverage",
      "test:e2e:env:coverage",
    ]) {
      delete data.scripts[script];
    }
  });
}

function stripTurboJson(ws) {
  ws.editJson("turbo.json", (data) => {
    for (const task of [
      "dev:mocks",
      "dev:mocks:cli",
      "test:e2e",
      "test:e2e:ci",
      "test:e2e:ui",
      "test:e2e:coverage",
      "test:e2e:env",
      "test:e2e:env:coverage",
    ]) {
      delete data.tasks[task];
    }
  });
}

function stripWebEnv(ws) {
  ws.edit("apps/web/.env", (content) =>
    removeOnce(
      content,
      /\n+# Vite Proxy options\nVITE_CONNECT_HOST=.*\nVITE_CONNECT_PORT=.*/,
      "apps/web/.env proxy vars"
    )
  );
}

/**
 * Rewrites the `node tools/merge-coverage.js ...` invocation (plus the comment
 * block directly above it) so it only merges the reports that still exist.
 * Located by the command itself rather than exact text, so comment tweaks or
 * re-ordered arguments don't break it.
 */
function rewriteMergeCoverage(content) {
  const lines = content.split("\n");
  const cmd = lines.findIndex((line) => line.trim().startsWith("node tools/merge-coverage.js"));
  if (cmd === -1) {
    throw new Error('Could not find "node tools/merge-coverage.js" in ci.yml. The workflow file may have changed.');
  }
  const indent = lines[cmd].slice(0, lines[cmd].length - lines[cmd].trimStart().length);

  let start = cmd;
  while (start > 0 && lines[start - 1].trim().startsWith("#")) start--;
  let end = cmd;
  while (end < lines.length - 1 && lines[end].trimEnd().endsWith("\\")) end++;

  const replacement = [
    "# Merge cobertura XML files directly using max-hits-per-line strategy,",
    "# taking the max hit count per line across reports.",
    "#   - web.xml: storybook unit tests (V8, correct for unit-tested files)",
    "#   - web-storybook.xml: storybook browser tests (V8, covers packages/ui)",
    "node tools/merge-coverage.js \\",
    "  output/coverage/combined.xml \\",
    "  output/coverage/web.xml \\",
    "  output/coverage/web-storybook.xml",
  ].map((line) => indent + line);

  lines.splice(start, end - start + 1, ...replacement);
  return lines.join("\n");
}

function stripCiWorkflows(ws) {
  ws.edit(".github/workflows/ci.yml", (content) => {
    content = removeYamlJob(content, "test-e2e", "ci.yml test-e2e job");
    content = removeYamlStep(content, "Run E2E tests with coverage", "ci.yml e2e coverage step");
    content = rewriteMergeCoverage(content);

    content = content
      .split("pnpm --filter=e2e exec playwright install chromium")
      .join("pnpm exec playwright install chromium");
    content = content
      .split("pnpm --filter=e2e exec playwright install-deps chromium")
      .join("pnpm exec playwright install-deps chromium");

    return content;
  });

  ws.edit(".github/workflows/main.yml", (content) => {
    content = replaceOnce(
      content,
      /run: echo "PLAYWRIGHT_VERSION=.*" >> \$GITHUB_OUTPUT/,
      `run: echo "PLAYWRIGHT_VERSION=$(grep -E '^    playwright:' pnpm-workspace.yaml | awk '{print $2}')" >> $GITHUB_OUTPUT`,
      "main.yml playwright version detection"
    );
    content = content
      .split("pnpm --filter=e2e exec playwright install chromium")
      .join("pnpm exec playwright install chromium");
    content = content
      .split("pnpm --filter=e2e exec playwright install-deps chromium")
      .join("pnpm exec playwright install-deps chromium");
    return content;
  });
}

function stripClaudeMd(ws) {
  ws.edit("CLAUDE.md", (content) => {
    content = removeOnce(
      content,
      "- `pnpm dev:mocks` - Start development with mock server enabled (API on port 3100)\n",
      "CLAUDE.md dev:mocks command"
    );
    content = removeOnce(
      content,
      "- `pnpm dev:mocks:cli` - Start standalone mock server only\n",
      "CLAUDE.md dev:mocks:cli command"
    );
    content = removeOnce(
      content,
      "- `pnpm test:e2e` - Run E2E tests with Playwright UI (starts dev server + mocks automatically)\n",
      "CLAUDE.md test:e2e command"
    );
    content = removeOnce(
      content,
      "- `pnpm test:e2e:ci` - Run E2E tests headless in the terminal (used by CI)\n",
      "CLAUDE.md test:e2e:ci command"
    );

    content = replaceOnce(
      content,
      `│   ├── web/          # Main React application (Vite + React 19)
│   ├── storybook/    # Storybook configuration and stories
│   ├── e2e/          # Playwright end-to-end tests
│   └── mock/         # Mocks Server for API mocking
├── packages/
│   ├── ui/           # (@package/ui) Shared UI components
│   ├── api/          # (@package/api) API client, auth, data fetching
│   ├── react/        # (@package/react) Reusable React 19 hooks
│   ├── mocks/        # (@package/mocks) Mock data and test utilities
│   └── storybook/    # (@package/storybook) Storybook decorators`,
      `│   ├── web/          # Main React application (Vite + React 19)
│   └── storybook/    # Storybook configuration and stories
├── packages/
│   ├── ui/           # (@package/ui) Shared UI components
│   ├── react/        # (@package/react) Reusable React 19 hooks
│   └── storybook/    # (@package/storybook) Storybook decorators`,
      "CLAUDE.md repository structure tree"
    );

    content = removeOnce(
      content,
      `### \`apps/e2e\` — End-to-End Tests

- **Stack**: Playwright 1.58, Chromium, JUnit XML reporter
- **Config**: \`apps/e2e/playwright.config.ts\`, base URL https://localhost:5173, 1 retry, screenshots/traces on failure

### \`apps/mock\` — API Mock Server

- **Stack**: Mocks Server 4.1, runs on port 3100
- **Activation**: \`pnpm dev:mocks\` sets \`--mode mocks\` which switches \`VITE_CONNECT_PORT\` to 3100

`,
      "CLAUDE.md apps/e2e and apps/mock sections"
    );

    content = removeOnce(
      content,
      `### \`@package/api\` — API Client & Authentication

Key exports:

- \`ApiClient\` — Main HTTP client that offloads requests to a **Web Worker** for non-blocking execution
- \`FetchClient\` — Low-level fetch wrapper
- \`JwtToken\` — JWT token type
- \`ServiceError\`, \`createServiceError\` — Typed error handling

> **Security note**: \`TokenStorage\` is intentionally NOT exported. The access token lives only in worker memory — \`TokenStorage.ts\` is excluded from the public barrel and must only be imported from worker-scope modules.
- API endpoint services: \`Login\`, \`Logout\`, \`RefreshToken\`, \`ForgotPassword\`, \`SelfRegister\`, \`ApplicationInfo\`, \`PersonalProfile\`
- Types (Zod schemas + inferred DTOs + domain types co-located in \`Types.ts\`), Converters, Fetch utilities

`,
      "CLAUDE.md @package/api section"
    );

    content = removeOnce(
      content,
      `### \`@package/mocks\` — Mock Data & Test Utilities

Key exports: \`AdminApiClient\`, helpers for mock server integration (used in \`apps/mock\`)

`,
      "CLAUDE.md @package/mocks section"
    );

    content = removeOnce(
      content,
      "\n\nAuth state uses **Jotai atoms** (`core/auth/AuthAtoms.ts`) — not a React Context provider.",
      "CLAUDE.md auth atoms note"
    );

    content = removeOnce(
      content,
      `### Authentication Flow

- JWT-based with refresh token mechanism stored in **Web Worker memory** via \`TokenStorage\` (deliberately not exported from the barrel).
- Auth state lives in Jotai atoms (\`core/auth/AuthAtoms.ts\`); \`AuthInitializer\` hydrates on mount.
- Route guards are applied by **layout segments**: \`_authenticated/route.tsx\` redirects unauthenticated users, \`_public/route.tsx\` redirects authenticated users away from login.

`,
      "CLAUDE.md Authentication Flow section"
    );

    content = removeOnce(
      content,
      `### API Client Pattern

- API calls are delegated to a **Web Worker** (\`ApiWorker\`) to avoid blocking the main thread.
- Each endpoint is a folder under \`packages/api/src/Api/<EndpointName>/\` with \`Classes.ts\`, \`Schema.ts\` (Zod), \`Convert.ts\` (DTO → domain), and \`Get.ts\` / \`Post.ts\` (service + React Query hook).
- Errors are normalized through \`ServiceErrorFactory.create()\`.

`,
      "CLAUDE.md API Client Pattern section"
    );

    content = removeOnce(
      content,
      `### E2E Tests (Playwright)

- Located in \`apps/e2e/src/**/*.spec.ts\`
- Dev server auto-starts on test run
- Uses \`https://localhost:5173\` with HTTPS certificate bypass
- Screenshots, videos, and traces captured on failure
- Run: \`pnpm test:e2e\` (Playwright UI) or \`pnpm test:e2e:ci\` (headless, for CI)

`,
      "CLAUDE.md E2E Tests section"
    );

    content = removeOnce(
      content,
      "| \`/add-e2e-test\` | Add Playwright E2E tests, with optional new API services and mock definitions |\n",
      "CLAUDE.md add-e2e-test skill row"
    );
    content = removeOnce(
      content,
      "| \`/add-api-test\` | Add unit tests for API schemas, converters, and utilities in \`packages/api/\` |\n",
      "CLAUDE.md add-api-test skill row"
    );

    content = removeOnce(
      content,
      "| \`VITE_CONNECT_HOST\` | \`http://localhost\` | \`http://127.0.0.1\` |\n",
      "CLAUDE.md VITE_CONNECT_HOST env row"
    );
    content = removeOnce(
      content,
      "| \`VITE_CONNECT_PORT\` | \`5000\`             | \`3100\`             |\n",
      "CLAUDE.md VITE_CONNECT_PORT env row"
    );

    return content;
  });
}

/**
 * Strips every backend-coupled piece of the template (API client, auth,
 * authenticated/public route guards, login/sign-up/forgot-password,
 * dashboard, mock server, e2e tests) and replaces the home route with a
 * minimal, non-authenticated HomeView. PWA support and the general app shell
 * (theming, i18n, settings, command palette) are left in place.
 */
export function stripBackend(ws, answers) {
  deleteBackendFilesAndDirs(ws);
  writeHomeRoute(ws);
  writeHomeView(ws, answers);
  writeRootRoute(ws);
  stripAppRoutes(ws);
  fixNotFoundRoute(ws);
  simplifySettingsModal(ws);
  simplifyCommandPalette(ws);
  stripViteConfig(ws, answers);
  stripWebPackageJson(ws);
  stripRootPackageJson(ws);
  stripTurboJson(ws);
  stripWebEnv(ws);
  stripCiWorkflows(ws);
  stripClaudeMd(ws);
}
