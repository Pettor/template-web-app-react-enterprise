import path from "node:path";
import { applyBranding } from "./branding.mjs";
import { collectAnswers } from "./cli.mjs";
import { configureBackend } from "./configureBackend.mjs";
import { applyDevPortBranding, applyE2EPort, applyStorybookPort, patchViteConfigPort } from "./devPort.mjs";
import { applyPackageJsonUpdates } from "./packageJson.mjs";
import { selfDestruct } from "./selfDestruct.mjs";
import { stripBackend } from "./stripBackend.mjs";
import { verify } from "./verify.mjs";
import { createWorkspace } from "./workspace.mjs";

const rootDir = path.resolve(import.meta.dirname, "../..");

function printSummary(answers) {
  console.log("\n===========================================");
  console.log(" Repo name:     ", answers.repoName);
  console.log(" Project name:  ", answers.projectName);
  console.log(" Version:       ", answers.version);
  console.log(" Dev port:      ", answers.devPort);
  console.log(" E2E port:      ", answers.e2ePort);
  console.log(" Storybook port:", answers.storybookPort);
  console.log(" Backend:       ", answers.backend ? `yes (${answers.backendHost}:${answers.backendPort})` : "no");
  console.log("===========================================\n");
}

async function main() {
  const argv = process.argv.slice(2);
  const dryRun = argv.includes("--dry-run");
  const answers = await collectAnswers(argv.filter((arg) => arg !== "--dry-run"));
  printSummary(answers);

  // Every edit below is staged in memory and only written by ws.commit(), so
  // a failure part-way through leaves the repo exactly as it was.
  const ws = createWorkspace(rootDir);

  console.log("Applying version + name updates across package.json files...");
  applyPackageJsonUpdates(ws, answers);

  console.log("Applying branding (README, PWA manifest, app title)...");
  applyBranding(ws, answers);
  applyDevPortBranding(ws, answers);
  applyE2EPort(ws, answers);

  if (answers.backend) {
    console.log("Configuring backend connection...");
    patchViteConfigPort(ws, answers);
    configureBackend(ws, answers);
  } else {
    console.log("Stripping backend-coupled code (API client, auth, mock server, dashboard, login/sign-up)...");
    stripBackend(ws, answers);
  }

  applyStorybookPort(ws, answers);

  const { deleted, written } = ws.changes();
  if (dryRun) {
    console.log(`\nDry run OK — ${written.length} file(s) would be written, ${deleted.length} path(s) deleted:`);
    for (const rel of deleted) console.log(`  - ${rel}`);
    for (const rel of written) console.log(`  ~ ${rel}`);
    return;
  }

  console.log(`\nWriting changes (${written.length} file(s) written, ${deleted.length} path(s) deleted)...`);
  ws.commit();
  committed = true;

  console.log("\nVerifying the result (install, build, lint)...");
  verify(rootDir);

  console.log("\nAll checks passed — cleaning up the init script...");
  selfDestruct(rootDir);

  console.log("\nYour project is ready!");
  console.log("Review the changes with `git status` / `git diff`, then commit when you're happy.");
  console.log("Next steps: `pnpm dev` to start the dev server, `pnpm storybook` to browse components.");
}

let committed = false;

main().catch((error) => {
  console.error(`\ninit-project failed: ${error.message}`);
  if (committed) {
    console.error("The file changes were applied, but verification failed — the init script was kept so you can");
    console.error(
      "fix the issue and re-run verification, or discard everything with `git checkout . && git clean -fd`."
    );
  } else {
    console.error("No files were modified — fix the issue above and re-run `pnpm init-project`.");
  }
  process.exitCode = 1;
});
