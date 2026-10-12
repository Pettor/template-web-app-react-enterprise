import { htmlEscape, jsStringLiteral, removeOnce, replaceOnce } from "./textEdit.mjs";

const OLD_REPO_NAME_LONG = "template-web-app-react-enterprise";
const OLD_REPO_NAME_SHORT = "template-web-app-react";

function updateReadme(ws, { repoName, projectName, backend }) {
  const filePath = "README.md";
  let content = ws.read(filePath);

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
      "\n- **[Playwright](https://playwright.dev/)** - Reliable end-to-end testing across all browsers",
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

  ws.write(filePath, content);
}

function updateIndexHtml(ws, { projectName }) {
  const filePath = "apps/web/index.html";
  let content = ws.read(filePath);
  content = replaceOnce(
    content,
    "<title>WebTemplate</title>",
    `<title>${htmlEscape(projectName)}</title>`,
    "index.html title"
  );
  ws.write(filePath, content);
}

function updatePwaConfig(ws, { projectName, shortName }) {
  const filePath = "configs/vite/src/pwa.ts";
  let content = ws.read(filePath);
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

  ws.write(filePath, content);
}

function updateAppInfo(ws, { projectName }) {
  const filePath = "apps/web/src/core/config/UseAppInfo.ts";
  let content = ws.read(filePath);
  content = replaceOnce(
    content,
    'const appName = "Web App";',
    `const appName = "${jsStringLiteral(projectName)}";`,
    "appName constant"
  );
  ws.write(filePath, content);
}

function syncDemoEnvVersion(ws, { version }) {
  const filePath = "apps/web/.env.demo";
  if (!ws.exists(filePath)) return;
  let content = ws.read(filePath);
  content = content.replace(/^VITE_APP_VERSION=.*$/m, () => `VITE_APP_VERSION=${version}`);
  ws.write(filePath, content);
}

/**
 * Applies the human-facing rebrand: README, PWA manifest, <title>, and the
 * in-app display name. Runs regardless of the backend choice.
 */
export function applyBranding(ws, answers) {
  updateReadme(ws, answers);
  updateIndexHtml(ws, answers);
  updatePwaConfig(ws, answers);
  updateAppInfo(ws, answers);
  syncDemoEnvVersion(ws, answers);
}
