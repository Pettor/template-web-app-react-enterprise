import { replaceOnce } from "./textEdit.mjs";

/**
 * Updates every doc reference to the dev-server port (the e2e port is handled
 * separately in applyE2EPort). Runs regardless of the backend choice.
 */
export function applyDevPortBranding(ws, { devPort }) {
  ws.edit("README.md", (content) =>
    replaceOnce(
      content,
      "Your application will be available at `http://localhost:5173` with hot reload enabled.",
      `Your application will be available at \`https://localhost:${devPort}\` with hot reload enabled.`,
      "README dev server URL"
    )
  );

  ws.edit("CLAUDE.md", (content) => {
    content = replaceOnce(
      content,
      "- `pnpm dev` - Start development server (main app at https://localhost:5173)",
      `- \`pnpm dev\` - Start development server (main app at https://localhost:${devPort})`,
      "CLAUDE.md pnpm dev command"
    );
    content = replaceOnce(
      content,
      "- **URL**: https://localhost:5173 (HTTPS enabled via `vite-plugin-basic-ssl`)",
      `- **URL**: https://localhost:${devPort} (HTTPS enabled via \`vite-plugin-basic-ssl\`)`,
      "CLAUDE.md apps/web URL"
    );
    return content;
  });

  ws.edit("docs/packages.md", (content) =>
    replaceOnce(
      content,
      "| `apps/web` | React 19, Vite 8, Tailwind 4, HeroUI v3, TanStack Router | `src/main.tsx` | 5173 (HTTPS) |",
      `| \`apps/web\` | React 19, Vite 8, Tailwind 4, HeroUI v3, TanStack Router | \`src/main.tsx\` | ${devPort} (HTTPS) |`,
      "docs/packages.md apps/web row"
    )
  );
}

/**
 * Patches the port in the EXISTING apps/web/vite.config.ts. Only called for
 * backend=true — when backend=false, stripBackend.mjs fully rewrites this
 * file from its own template (which already carries devPort), so patching
 * here first would just be discarded.
 */
export function patchViteConfigPort(ws, { devPort }) {
  ws.edit("apps/web/vite.config.ts", (content) =>
    replaceOnce(content, "port: 5173,", `port: ${devPort},`, "vite.config.ts server port")
  );
}

/**
 * Propagates the derived e2e port (devPort - 1000) across every file that
 * hardcodes the old 4173 value. Runs regardless of the backend choice — must
 * run before stripBackend, which edits some of the same files.
 */
export function applyE2EPort(ws, { e2ePort }) {
  ws.edit("apps/web/package.json", (content) =>
    content.split("--port 4173 --strictPort").join(`--port ${e2ePort} --strictPort`)
  );

  for (const relPath of ["apps/e2e/playwright.config.ts", "apps/e2e/playwright.coverage.config.ts"]) {
    ws.edit(relPath, (content) => content.split("https://localhost:4173").join(`https://localhost:${e2ePort}`));
  }

  ws.edit("apps/e2e/global-setup.ts", (content) =>
    replaceOnce(
      content,
      'await page.goto("https://localhost:4173", {',
      `await page.goto("https://localhost:${e2ePort}", {`,
      "global-setup.ts page.goto"
    )
  );

  ws.edit("apps/e2e/global-setup.ui.ts", (content) =>
    replaceOnce(
      content,
      'waitForPort(4173, "localhost", timeout)',
      `waitForPort(${e2ePort}, "localhost", timeout)`,
      "global-setup.ui.ts waitForPort"
    )
  );

  ws.edit("CLAUDE.md", (content) => {
    content = replaceOnce(
      content,
      "- **Config**: `apps/e2e/playwright.config.ts`, base URL https://localhost:5173, 1 retry, screenshots/traces on failure",
      `- **Config**: \`apps/e2e/playwright.config.ts\`, base URL https://localhost:${e2ePort}, 1 retry, screenshots/traces on failure`,
      "CLAUDE.md apps/e2e config line"
    );
    content = replaceOnce(
      content,
      "- Uses `https://localhost:5173` with HTTPS certificate bypass",
      `- Uses \`https://localhost:${e2ePort}\` with HTTPS certificate bypass`,
      "CLAUDE.md E2E Tests URL"
    );
    return content;
  });

  ws.edit("docs/packages.md", (content) =>
    replaceOnce(
      content,
      "| `apps/e2e` | Playwright 1.58, Chromium | `src/specs/*.spec.ts` | — (runs against 5173) |",
      `| \`apps/e2e\` | Playwright 1.58, Chromium | \`src/specs/*.spec.ts\` | — (runs against ${e2ePort}) |`,
      "docs/packages.md apps/e2e row"
    )
  );
}

/**
 * Replaces the template's Storybook port (9050) with the per-project random
 * one. Runs after stripBackend, so files it deleted are skipped.
 */
export function applyStorybookPort(ws, { storybookPort }) {
  ws.editJson("apps/storybook/package.json", (data) => {
    const script = data.scripts.storybook;
    if (!script.includes("-p 9050")) {
      throw new Error('Could not find expected text for "apps/storybook storybook script port". The file may have changed.');
    }
    data.scripts.storybook = script.replace("-p 9050", `-p ${storybookPort}`);
  });

  const screenshotsConfig = "apps/e2e/playwright.screenshots.config.ts";
  if (ws.exists(screenshotsConfig)) {
    ws.edit(screenshotsConfig, (content) =>
      content.split("http://localhost:9050").join(`http://localhost:${storybookPort}`)
    );
  }

  ws.edit("CLAUDE.md", (content) => {
    content = replaceOnce(
      content,
      "- `pnpm storybook` - Start Storybook development server (localhost:9050)",
      `- \`pnpm storybook\` - Start Storybook development server (localhost:${storybookPort})`,
      "CLAUDE.md pnpm storybook command"
    );
    content = replaceOnce(
      content,
      "- **URL**: localhost:9050",
      `- **URL**: localhost:${storybookPort}`,
      "CLAUDE.md apps/storybook URL"
    );
    content = replaceOnce(
      content,
      "Available at `http://localhost:9050/mcp`",
      `Available at \`http://localhost:${storybookPort}/mcp\``,
      "CLAUDE.md Storybook MCP URL"
    );
    return content;
  });

  ws.edit("docs/packages.md", (content) =>
    replaceOnce(
      content,
      "| `apps/storybook` | Storybook 10 + Vite builder | `main.ts` | 9050 |",
      `| \`apps/storybook\` | Storybook 10 + Vite builder | \`main.ts\` | ${storybookPort} |`,
      "docs/packages.md apps/storybook row"
    )
  );
}
