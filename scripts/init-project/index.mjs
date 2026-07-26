import path from "node:path";
import { applyBranding } from "./branding.mjs";
import { collectAnswers } from "./cli.mjs";
import { configureBackend } from "./configureBackend.mjs";
import { applyDevPortBranding, applyE2EPort, patchViteConfigPort } from "./devPort.mjs";
import { applyPackageJsonUpdates } from "./packageJson.mjs";
import { selfDestruct } from "./selfDestruct.mjs";
import { stripBackend } from "./stripBackend.mjs";
import { verify } from "./verify.mjs";

const rootDir = path.resolve(import.meta.dirname, "../..");

function printSummary(answers) {
  console.log("\n===========================================");
  console.log(" Repo name:     ", answers.repoName);
  console.log(" Project name:  ", answers.projectName);
  console.log(" Version:       ", answers.version);
  console.log(" Dev port:      ", answers.devPort);
  console.log(" Backend:       ", answers.backend ? `yes (${answers.backendHost}:${answers.backendPort})` : "no");
  console.log("===========================================\n");
}

async function main() {
  const answers = await collectAnswers(process.argv.slice(2));
  printSummary(answers);

  console.log("Applying version + name updates across package.json files...");
  applyPackageJsonUpdates(rootDir, answers);

  console.log("Applying branding (README, PWA manifest, app title)...");
  applyBranding(rootDir, answers);
  applyDevPortBranding(rootDir, answers);

  if (answers.backend) {
    console.log("Configuring backend connection...");
    patchViteConfigPort(rootDir, answers);
    configureBackend(rootDir, answers);
    applyE2EPort(rootDir, answers);
  } else {
    console.log("Stripping backend-coupled code (API client, auth, e2e tests, dashboard, login/sign-up)...");
    stripBackend(rootDir, answers);
  }

  console.log("\nVerifying the result (install, build, lint)...");
  verify(rootDir);

  console.log("\nAll checks passed — cleaning up the init script...");
  selfDestruct(rootDir);

  console.log("\nYour project is ready!");
  console.log("Review the changes with `git status` / `git diff`, then commit when you're happy.");
  console.log("Next steps: `pnpm dev` to start the dev server, `pnpm storybook` to browse components.");
}

main().catch((error) => {
  console.error(`\ninit-project failed: ${error.message}`);
  console.error("No cleanup was performed — fix the issue above and re-run `pnpm init-project`.");
  process.exitCode = 1;
});
