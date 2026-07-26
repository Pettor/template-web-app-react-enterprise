import { readFileSync, rmSync, writeFileSync } from "node:fs";
import path from "node:path";

/**
 * Removes this script and its root package.json entry. Only called after a
 * successful verify() — this is a one-time template bootstrap, not a
 * permanent tool, so it shouldn't linger (or be re-runnable) once the
 * project is live.
 */
export function selfDestruct(rootDir) {
  const rootPackageJsonPath = path.join(rootDir, "package.json");
  const data = JSON.parse(readFileSync(rootPackageJsonPath, "utf8"));
  delete data.scripts["init-project"];
  writeFileSync(rootPackageJsonPath, `${JSON.stringify(data, null, 2)}\n`, "utf8");

  rmSync(path.join(rootDir, "scripts/init-project"), { recursive: true, force: true });
}
