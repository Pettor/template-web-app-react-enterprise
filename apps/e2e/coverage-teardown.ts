import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readdirSync, renameSync } from "node:fs";
import path from "node:path";

/**
 * Playwright global teardown that converts the per-test Istanbul JSON files
 * collected by the coverage fixture into a single Cobertura XML report at
 * `output/coverage/e2e.xml` (relative to the repo root).
 *
 * Runs only when .nyc_output/ contains coverage data (i.e. the coverage
 * fixture was active via COVERAGE=true).
 */
export default async function coverageTeardown(): Promise<void> {
  const cwd = process.cwd();
  const nycOutputDir = path.resolve(cwd, ".nyc_output");

  if (!existsSync(nycOutputDir) || readdirSync(nycOutputDir).length === 0) {
    console.log("[coverage] No .nyc_output data found — skipping E2E coverage report.");
    return;
  }

  // Run nyc from the repo root so that relative paths stored by Istanbul
  // (e.g. "apps/web/src/...") resolve correctly to actual source files.
  const repoRoot = path.resolve(cwd, "../..");
  const reportDir = path.resolve(repoRoot, "output/coverage");
  mkdirSync(reportDir, { recursive: true });

  const nyc = path.resolve(cwd, "node_modules/.bin/nyc");

  console.log("[coverage] Generating E2E coverage report…");
  execFileSync(nyc, ["report", `--temp-dir=${nycOutputDir}`, "--reporter=cobertura", `--report-dir=${reportDir}`], {
    stdio: "inherit",
    cwd: repoRoot,
  });

  const src = path.join(reportDir, "cobertura-coverage.xml");
  const dest = path.join(reportDir, "e2e.xml");
  if (existsSync(src)) {
    renameSync(src, dest);
    console.log(`[coverage] E2E coverage written to ${dest}`);
  }
}
