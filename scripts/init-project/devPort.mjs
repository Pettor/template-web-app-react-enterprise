import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { replaceOnce } from "./textEdit.mjs";

function edit(rootDir, relPath, fn) {
  const full = path.join(rootDir, relPath);
  const content = readFileSync(full, "utf8");
  writeFileSync(full, fn(content), "utf8");
}

/**
 * Updates every doc reference to the dev-server port (not the e2e port —
 * those are handled separately in applyE2EPort, since apps/e2e doesn't
 * exist when backend=false). Runs regardless of the backend choice.
 */
export function applyDevPortBranding(rootDir, { devPort }) {
  edit(rootDir, "README.md", (content) =>
    replaceOnce(
      content,
      "Your application will be available at `http://localhost:5173` with hot reload enabled.",
      `Your application will be available at \`https://localhost:${devPort}\` with hot reload enabled.`,
      "README dev server URL"
    )
  );

  edit(rootDir, "CLAUDE.md", (content) => {
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

  edit(rootDir, "docs/packages.md", (content) =>
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
export function patchViteConfigPort(rootDir, { devPort }) {
  edit(rootDir, "apps/web/vite.config.ts", (content) =>
    replaceOnce(content, "port: 5173,", `port: ${devPort},`, "vite.config.ts server port")
  );
}

/**
 * Propagates the derived e2e port (devPort - 1000) across every file that
 * hardcodes the old 4173 value. Only called for backend=true — apps/e2e is
 * deleted entirely otherwise.
 */
export function applyE2EPort(rootDir, { e2ePort }) {
  edit(rootDir, "apps/web/package.json", (content) =>
    content.split("--port 4173 --strictPort").join(`--port ${e2ePort} --strictPort`)
  );

  for (const relPath of ["apps/e2e/playwright.config.ts", "apps/e2e/playwright.coverage.config.ts"]) {
    edit(rootDir, relPath, (content) => content.split("https://localhost:4173").join(`https://localhost:${e2ePort}`));
  }

  edit(rootDir, "apps/e2e/global-setup.ts", (content) =>
    replaceOnce(
      content,
      'await page.goto("https://localhost:4173", {',
      `await page.goto("https://localhost:${e2ePort}", {`,
      "global-setup.ts page.goto"
    )
  );

  edit(rootDir, "apps/e2e/global-setup.ui.ts", (content) =>
    replaceOnce(
      content,
      'waitForPort(4173, "localhost", timeout)',
      `waitForPort(${e2ePort}, "localhost", timeout)`,
      "global-setup.ui.ts waitForPort"
    )
  );

  edit(rootDir, "CLAUDE.md", (content) => {
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

  edit(rootDir, "docs/packages.md", (content) =>
    replaceOnce(
      content,
      "| `apps/e2e` | Playwright 1.58, Chromium | `src/specs/*.spec.ts` | — (runs against 5173) |",
      `| \`apps/e2e\` | Playwright 1.58, Chromium | \`src/specs/*.spec.ts\` | — (runs against ${e2ePort}) |`,
      "docs/packages.md apps/e2e row"
    )
  );
}
