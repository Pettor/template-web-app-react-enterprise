import { readdirSync } from "node:fs";
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

/**
 * Sets `version` on every package.json in the workspace, and `name` on the
 * root package.json only — the scoped workspace package names (@app/web,
 * @package/api, ...) are left alone since they're referenced throughout
 * imports, `pnpm --filter=`, and CI.
 */
export function applyPackageJsonUpdates(ws, { repoName, version }) {
  for (const filePath of findPackageJsonFiles(ws.rootDir)) {
    const relPath = path.relative(ws.rootDir, filePath);
    const data = JSON.parse(ws.read(relPath));
    const isRoot = relPath === "package.json";
    if (data.version === version && (!isRoot || data.name === repoName)) continue;

    data.version = version;
    if (isRoot) data.name = repoName;
    ws.write(relPath, `${JSON.stringify(data, null, 2)}\n`);
  }
}
