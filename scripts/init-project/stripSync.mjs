import { removeOnce, replaceOnce } from "./textEdit.mjs";

/**
 * Local data + folder/GitHub sync is for projects without a backend. With a
 * backend, the server is the source of truth, so these go.
 */
const DELETE_PATHS = [
  "apps/web/src/core/data",
  "apps/web/src/core/sync",
  "apps/web/src/components/display/sync-status",
  "apps/web/src/components/input/notes-panel",
  "apps/web/src/components/feedback/settings-modal/SettingsSyncSection.tsx",
  "apps/web/src/components/feedback/settings-modal/UseSettingsSyncSection.ts",
  "apps/web/src/components/feedback/settings-modal/SettingsFolderPanel.tsx",
  "apps/web/src/components/feedback/settings-modal/SettingsGitHubPanel.tsx",
  "apps/web/src/components/feedback/settings-modal/SettingsGitHubMessages.ts",
  "apps/web/src/components/feedback/settings-modal/UseGitHubConnectForm.ts",
  "apps/web/src/views/notes",
  "apps/web/src/routes/_authenticated/notes",
  "apps/e2e/src/specs/data.spec.ts",
  "docs/data-sync.md",
];

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/** Removes `export const <name>: Story = { ... };` — the story ends at the first `};` in column 0. */
function removeStory(content, name, label) {
  return removeOnce(
    content,
    new RegExp(`\\nexport const ${escapeRegExp(name)}: Story = \\{[\\s\\S]*?\\n\\};\\n`),
    label
  );
}

function stripProviders(ws) {
  ws.edit("apps/web/src/core/AppProviders.tsx", (content) => {
    content = removeOnce(content, 'import { SyncLifecycle } from "./sync/SyncLifecycle";\n', "AppProviders import");
    return replaceOnce(
      content,
      `<QueryClientProvider client={queryClient}>
            <SyncLifecycle>{children}</SyncLifecycle>
          </QueryClientProvider>`,
      "<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>",
      "AppProviders SyncLifecycle"
    );
  });
}

function stripSettings(ws) {
  ws.edit("apps/web/src/core/settings/SettingsSection.ts", (content) =>
    replaceOnce(content, ' | "sync"', "", "SettingsSection sync")
  );

  ws.edit("apps/web/src/core/settings/UseSettingsModal.ts", (content) => {
    content = replaceOnce(
      content,
      'return ["account", "appearance", "sync", "about"];',
      'return ["account", "appearance", "about"];',
      "UseSettingsModal authenticated sections"
    );
    return replaceOnce(
      content,
      'return ["appearance", "sync", "about"];',
      'return ["appearance", "about"];',
      "UseSettingsModal sections"
    );
  });

  ws.edit("apps/web/src/components/feedback/settings-modal/SettingsModal.tsx", (content) => {
    content = replaceOnce(
      content,
      "import { ArrowPathIcon, InformationCircleIcon,",
      "import { InformationCircleIcon,",
      "SettingsModal icon import"
    );
    content = removeOnce(
      content,
      'import type { SettingsSyncSectionProps } from "./SettingsSyncSection";\nimport { SettingsSyncSection } from "./SettingsSyncSection";\n',
      "SettingsModal section import"
    );
    content = removeOnce(content, "  sync?: SettingsSyncSectionProps;\n", "SettingsModal sync prop");
    content = removeOnce(content, '  sync: <ArrowPathIcon className="h-4 w-4" />,\n', "SettingsModal sync icon");
    content = removeOnce(content, "  sync,\n", "SettingsModal sync destructure");
    content = removeOnce(
      content,
      /      case "sync":\n        return intl\.formatMessage\(\{\n[\s\S]*?\n        \}\);\n/,
      "SettingsModal sync label"
    );
    return removeOnce(
      content,
      '      case "sync":\n        return sync ? <SettingsSyncSection {...sync} /> : <></>;\n',
      "SettingsModal sync section"
    );
  });

  ws.edit("apps/web/src/components/feedback/settings-modal/UseSettingsModalController.ts", (content) => {
    content = removeOnce(content, 'import { useSync } from "~/core/sync/UseSync";\n', "settings controller import");
    content = removeOnce(content, "  const sync = useSync();\n", "settings controller hook");
    return removeOnce(content, /    sync: \{\n[\s\S]*?\n    \},\n/, "settings controller sync props");
  });

  ws.edit("apps/web/src/components/feedback/settings-modal/SettingsModal.stories.tsx", (content) => {
    content = removeOnce(content, 'import { expect, fn, within } from "storybook/test";\n', "settings stories import");
    content = removeOnce(
      content,
      /const syncArgs = \{[\s\S]*?\n\} satisfies Props\["sync"\];\n\n/,
      "settings sync args"
    );
    content = replaceOnce(
      content,
      'const allSections = ["account", "appearance", "sync", "about"]',
      'const allSections = ["account", "appearance", "about"]',
      "settings stories sections"
    );
    content = removeOnce(content, "  sync: syncArgs,\n", "settings stories sync arg");
    for (const story of ["Sync", "SyncWithGitHub", "SyncWithLocalGitRepo"]) {
      content = removeStory(content, story, `settings stories ${story}`);
    }
    return content;
  });
}

function stripNavigation(ws) {
  ws.edit("apps/web/src/components/navigation/navbar-content/NavbarContent.tsx", (content) => {
    content = removeOnce(
      content,
      'import type { SyncStatusCardProps } from "~/components/display/sync-status/SyncStatusCard";\nimport { SyncStatusCard } from "~/components/display/sync-status/SyncStatusCard";\n',
      "NavbarContent import"
    );
    content = removeOnce(
      content,
      "  /** Shows where the data is synced; opens the sync settings when pressed. */\n  syncStatus?: SyncStatusCardProps;\n",
      "NavbarContent prop"
    );
    content = removeOnce(content, "  syncStatus,\n", "NavbarContent destructure");
    content = removeOnce(
      content,
      '      {syncStatus && <SyncStatusCard {...syncStatus} variant="icon" />}\n',
      "NavbarContent sync icon"
    );
    return removeOnce(
      content,
      /\n *\{syncStatus && <SyncStatusCard \{\.\.\.syncStatus\} \/>\}/,
      "NavbarContent sync card"
    );
  });

  ws.edit("apps/web/src/components/navigation/navbar-content/NavbarContent.stories.tsx", (content) => {
    content = replaceOnce(
      content,
      'import { expect, fn, within } from "storybook/test";',
      'import { expect, within } from "storybook/test";',
      "NavbarContent stories import"
    );
    return removeStory(content, "WithSyncStatus", "NavbarContent sync story");
  });

  ws.edit("apps/web/src/components/navigation/navbar-content/NavMenuItems.tsx", (content) => {
    content = replaceOnce(
      content,
      "ChartBarSquareIcon, DocumentTextIcon, HomeIcon",
      "ChartBarSquareIcon, HomeIcon",
      "NavMenuItems icon import"
    );
    return removeOnce(content, /    \{\n      id: "notes",[\s\S]*?\n    \},\n/, "NavMenuItems notes item");
  });

  ws.edit("apps/web/src/routes/_authenticated/-UseAuthenticatedRoute.ts", (content) => {
    content = removeOnce(
      content,
      'import type { UseSyncStatusCardResult } from "~/core/sync/UseSyncStatusCard";\nimport { useSyncStatusCard } from "~/core/sync/UseSyncStatusCard";\n',
      "authenticated route imports"
    );
    content = removeOnce(content, "  syncStatus: UseSyncStatusCardResult;\n", "authenticated route result type");
    content = removeOnce(content, "  const syncStatus = useSyncStatusCard();\n", "authenticated route hook");
    content = removeOnce(
      content,
      ' else if (pathname.startsWith("/notes")) {\n    activeTab = "notes";\n  }',
      "authenticated route notes tab"
    );
    content = removeOnce(
      content,
      '    if (id === "notes") {\n      navigate({ to: "/notes" });\n      return;\n    }\n',
      "authenticated route notes navigation"
    );
    return removeOnce(content, "    syncStatus,\n", "authenticated route return");
  });

  ws.edit("apps/web/src/routes/_authenticated/route.tsx", (content) => {
    content = replaceOnce(
      content,
      "const { activeTab, onTabChange, sessionContent, socialLinks, syncStatus, githubLink, linkedInLink } =\n    useAuthenticatedRoute();",
      "const { activeTab, onTabChange, sessionContent, socialLinks, githubLink, linkedInLink } = useAuthenticatedRoute();",
      "authenticated layout destructure"
    );
    return removeOnce(content, "          syncStatus={syncStatus}\n", "authenticated layout sync prop");
  });
}

function stripDocs(ws) {
  ws.edit("CLAUDE.md", (content) => {
    content = removeOnce(
      content,
      "- [`docs/data-sync.md`](./docs/data-sync.md) — local-first data model and folder / Git clone / GitHub sync\n",
      "CLAUDE.md doc index"
    );
    content = replaceOnce(content, " `data/`, `sync/`, `routes/`", " `routes/`", "CLAUDE.md core domains");
    content = replaceOnce(
      content,
      `              └── QueryClientProvider (@tanstack/react-query)
                    └── SyncLifecycle (local data ↔ folder / GitHub)
                          └── AppTheme (Jotai atomEffect)
                                └── AppRoutes (RouterProvider from @tanstack/react-router)`,
      `              └── QueryClientProvider (@tanstack/react-query)
                    └── AppTheme (Jotai atomEffect)
                          └── AppRoutes (RouterProvider from @tanstack/react-router)`,
      "CLAUDE.md provider hierarchy"
    );
    content = removeOnce(
      content,
      "| Local-first app data | Jotai atom in `localStorage`, synced by `core/sync/` | `core/data/` |\n",
      "CLAUDE.md state table"
    );
    content = removeOnce(
      content,
      /### Local Data & Sync\n[\s\S]*?\n(?=### Styling Conventions\n)/,
      "CLAUDE.md sync section"
    );
    content = removeOnce(content, /9\. \*\*New stored data\*\*:.*\n/, "CLAUDE.md checklist item");
    return replaceOnce(
      content,
      "10. **New major or minor version**:",
      "9. **New major or minor version**:",
      "CLAUDE.md checklist numbering"
    );
  });

  ws.edit("docs/README.md", (content) =>
    removeOnce(
      content,
      "| Store data locally and sync it to a folder, a Git clone or GitHub | [data-sync.md](./data-sync.md) |\n",
      "docs/README.md index"
    )
  );

  ws.edit("docs/architecture.md", (content) => {
    content = replaceOnce(
      content,
      " `social-links/`, `data/`, `sync/`.",
      " `social-links/`.",
      "architecture.md core domains"
    );
    content = replaceOnce(
      content,
      `                    └── QueryClientProvider (@tanstack/react-query)
                          └── SyncLifecycle (keeps local data in sync with a folder or GitHub)
                                └── AppTheme (theme bootstrapping via Jotai atomEffect)
                                      └── AppRoutes (RouterProvider from @tanstack/react-router)`,
      `                    └── QueryClientProvider (@tanstack/react-query)
                          └── AppTheme (theme bootstrapping via Jotai atomEffect)
                                └── AppRoutes (RouterProvider from @tanstack/react-router)`,
      "architecture.md provider hierarchy"
    );
    return removeOnce(content, /\| Local-first app data \|.*\n/, "architecture.md state table");
  });

  ws.edit("docs/structure.md", (content) => {
    content = removeOnce(content, /├── data\/ {17}# Local-first data model[\s\S]*?│\n/, "structure.md core/data");
    content = removeOnce(
      content,
      /├── sync\/ {17}# Folder \/ Git clone \/ GitHub sync[\s\S]*?│\n/,
      "structure.md core/sync"
    );
    content = replaceOnce(
      content,
      "│   ├── grid-item/              # Small card for list/grid contexts\n│   └── sync-status/            # Sync status card / icon button",
      "│   └── grid-item/              # Small card for list/grid contexts",
      "structure.md sync-status"
    );
    content = replaceOnce(
      content,
      "│   ├── input-field/            # Tanstack-Form-integrated text field\n│   └── notes-panel/            # Add, pin and archive notes",
      "│   └── input-field/            # Tanstack-Form-integrated text field",
      "structure.md notes-panel"
    );
    content = removeOnce(content, "├── notes/\n│   └── NotesView.tsx\n", "structure.md notes view");
    return removeOnce(
      content,
      /    ├── notes\/\n    │   ├── route\.tsx[^\n]*\n    │   └── -UseNotesRoute\.ts\n/,
      "structure.md notes route"
    );
  });
}

export function stripSync(ws) {
  for (const relPath of DELETE_PATHS) ws.rm(relPath);
  stripProviders(ws);
  stripSettings(ws);
  stripNavigation(ws);
  stripDocs(ws);
}
