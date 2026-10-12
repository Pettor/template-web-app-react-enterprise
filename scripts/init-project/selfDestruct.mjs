import { existsSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import path from "node:path";
import { removeYamlJob } from "./textEdit.mjs";

/**
 * Removes this script, its root package.json entry, and the CI job that
 * guards it. Only called after a
 * successful verify() — this is a one-time template bootstrap, not a
 * permanent tool, so it shouldn't linger (or be re-runnable) once the
 * project is live.
 */
export function selfDestruct(rootDir) {
  const rootPackageJsonPath = path.join(rootDir, "package.json");
  const data = JSON.parse(readFileSync(rootPackageJsonPath, "utf8"));
  delete data.scripts["init-project"];
  writeFileSync(rootPackageJsonPath, `${JSON.stringify(data, null, 2)}\n`, "utf8");

  const ciPath = path.join(rootDir, ".github/workflows/ci.yml");
  if (existsSync(ciPath)) {
    const ci = readFileSync(ciPath, "utf8");
    if (/^  init-project:\s*$/m.test(ci))
      writeFileSync(ciPath, removeYamlJob(ci, "init-project", "ci.yml init-project job"), "utf8");
  }

  rmSync(path.join(rootDir, "scripts/init-project"), { recursive: true, force: true });
}
