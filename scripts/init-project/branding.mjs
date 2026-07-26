import { existsSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { htmlEscape, jsStringLiteral, removeOnce, replaceOnce } from "./textEdit.mjs";

const OLD_REPO_NAME_LONG = "template-web-app-react-enterprise";
const OLD_REPO_NAME_SHORT = "template-web-app-react";

function updateReadme(rootDir, { repoName, projectName, backend }) {
  const filePath = path.join(rootDir, "README.md");
  let content = readFileSync(filePath, "utf8");

  // Repo name shows up dozens of times across badges/links — swap the longer,
  // more specific name first so it isn't left half-replaced by the shorter one.
  content = content.split(OLD_REPO_NAME_LONG).join(repoName);
  content = content.split(OLD_REPO_NAME_SHORT).join(repoName);

  content = replaceOnce(content, "# React Web Enterprise Application Template", `# ${projectName}`, "readme title");

  content = removeOnce(
    content,
    `\n## 🔗 Related Templates\n\nExpand your development stack:\n\n- **[.NET 9 Backend Template](https://github.com/Pettor/template-web-api-dotnet)** - Fully integrated C# backend template designed to work seamlessly with this React frontend\n`,
    "related templates section"
  );

  if (!backend) {
    content = removeOnce(
      content,
      "\n- **Mock API Server** - [Mocks Server](https://mocks-server.org/) integration for frontend development",
      "mock api server bullet"
    );
    content = removeOnce(
      content,
      '\n- **[Playwright](https://playwright.dev/)** - Reliable end-to-end testing across all browsers',
      "playwright e2e bullet"
    );
    content = removeOnce(content, "\n- `pnpm test:e2e` - Run end-to-end tests", "test:e2e script bullet");
    content = replaceOnce(
      content,
      "`Lint`, `Build`, `Test Components`, `Test E2E`",
      "`Lint`, `Build`, `Test Components`",
      "required status checks"
    );
    content = replaceOnce(
      content,
      "├── apps/\n" +
        "│   ├── web/                # Main React application (React 19 + Vite 8 + HeroUI v3)\n" +
        "│   ├── storybook/          # Storybook configuration and stories\n" +
        "│   ├── e2e/                # Playwright end-to-end tests\n" +
        "│   └── mock/               # Mocks Server for API mocking\n" +
        "├── packages/\n" +
        "│   ├── api/                # (@package/api) API client, auth, Web Worker\n" +
        "│   ├── ui/                 # (@package/ui) Cross-app UI (logos, layouts, icons)\n" +
        "│   ├── mocks/              # (@package/mocks) Mocks Server admin client\n" +
        "│   └── storybook/          # (@package/storybook) Storybook decorators",
      "├── apps/\n" +
        "│   ├── web/                # Main React application (React 19 + Vite 8 + HeroUI v3)\n" +
        "│   └── storybook/          # Storybook configuration and stories\n" +
        "├── packages/\n" +
        "│   ├── ui/                 # (@package/ui) Cross-app UI (logos, layouts, icons)\n" +
        "│   └── storybook/          # (@package/storybook) Storybook decorators",
      "project structure tree"
    );
    content = removeOnce(content, " && pnpm test:e2e", "contributing test suite mention");
  }

  writeFileSync(filePath, content, "utf8");
}

function updateIndexHtml(rootDir, { projectName }) {
  const filePath = path.join(rootDir, "apps/web/index.html");
  let content = readFileSync(filePath, "utf8");
  content = replaceOnce(
    content,
    "<title>WebTemplate</title>",
    `<title>${htmlEscape(projectName)}</title>`,
    "index.html title"
  );
  writeFileSync(filePath, content, "utf8");
}

function updatePwaConfig(rootDir, { projectName, shortName }) {
  const filePath = path.join(rootDir, "configs/vite/src/pwa.ts");
  let content = readFileSync(filePath, "utf8");
  const name = jsStringLiteral(projectName);
  const short = jsStringLiteral(shortName);

  content = replaceOnce(
    content,
    'description: manifest.description || "React Enterprise Template using Turborepo, TailwindCSS, HeroUI and Vite.",',
    `description: manifest.description || "${name}",`,
    "pwa manifest description"
  );
  content = replaceOnce(
    content,
    'name: manifest.name || "ReactEnterpriseTemplate",',
    `name: manifest.name || "${name}",`,
    "pwa manifest name"
  );
  content = replaceOnce(
    content,
    'label: "WebTemplate on Desktop",',
    `label: "${short} on Desktop",`,
    "pwa desktop screenshot label"
  );
  content = replaceOnce(
    content,
    'label: "WebTemplate on Phone",',
    `label: "${short} on Phone",`,
    "pwa phone screenshot label"
  );
  content = replaceOnce(
    content,
    'short_name: manifest.shortName || "WebTemplate",',
    `short_name: manifest.shortName || "${short}",`,
    "pwa manifest short_name"
  );

  writeFileSync(filePath, content, "utf8");
}

function updateAppInfo(rootDir, { projectName }) {
  const filePath = path.join(rootDir, "apps/web/src/core/config/UseAppInfo.ts");
  let content = readFileSync(filePath, "utf8");
  content = replaceOnce(
    content,
    'const appName = "Web App";',
    `const appName = "${jsStringLiteral(projectName)}";`,
    "appName constant"
  );
  writeFileSync(filePath, content, "utf8");
}

function syncDemoEnvVersion(rootDir, { version }) {
  const filePath = path.join(rootDir, "apps/web/.env.demo");
  if (!existsSync(filePath)) return;
  let content = readFileSync(filePath, "utf8");
  content = content.replace(/^VITE_APP_VERSION=.*$/m, `VITE_APP_VERSION=${version}`);
  writeFileSync(filePath, content, "utf8");
}

/**
 * Applies the human-facing rebrand: README, PWA manifest, <title>, and the
 * in-app display name. Runs regardless of the backend choice.
 */
export function applyBranding(rootDir, answers) {
  updateReadme(rootDir, answers);
  updateIndexHtml(rootDir, answers);
  updatePwaConfig(rootDir, answers);
  updateAppInfo(rootDir, answers);
  syncDemoEnvVersion(rootDir, answers);
}
