import { readFileSync, readdirSync, writeFileSync } from "node:fs";
import path from "node:path";

const SKIP_DIRS = new Set([
  "node_modules",
  ".git",
  "dist",
  "build",
  "output",
  "storybook-static",
  ".turbo",
  "coverage",
]);

function findPackageJsonFiles(rootDir) {
  const results = [];

  function walk(dir) {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      if (entry.isDirectory()) {
        if (SKIP_DIRS.has(entry.name)) continue;
        walk(path.join(dir, entry.name));
      } else if (entry.isFile() && entry.name === "package.json") {
        results.push(path.join(dir, entry.name));
      }
    }
  }

  walk(rootDir);
  return results;
}

function writeJson(filePath, data) {
  writeFileSync(filePath, `${JSON.stringify(data, null, 2)}\n`, "utf8");
}

/**
 * Sets `version` on every package.json in the workspace, and `name` on the
 * root package.json only — the scoped workspace package names (@app/web,
 * @package/api, ...) are left alone since they're referenced throughout
 * imports, `pnpm --filter=`, and CI.
 */
export function applyPackageJsonUpdates(rootDir, { repoName, version }) {
  const files = findPackageJsonFiles(rootDir);
  const rootPackageJsonPath = path.join(rootDir, "package.json");
  const touched = [];

  for (const filePath of files) {
    const data = JSON.parse(readFileSync(filePath, "utf8"));
    let changed = false;

    if (data.version !== version) {
      data.version = version;
      changed = true;
    }

    if (filePath === rootPackageJsonPath && data.name !== repoName) {
      data.name = repoName;
      changed = true;
    }

    if (changed) {
      writeJson(filePath, data);
      touched.push(path.relative(rootDir, filePath));
    }
  }

  return touched;
}
