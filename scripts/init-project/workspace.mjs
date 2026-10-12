import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import path from "node:path";

function normalize(relPath) {
  return path.posix.normalize(relPath.split(path.sep).join("/")).replace(/\/+$/, "");
}

function isUnder(relPath, dir) {
  return relPath === dir || relPath.startsWith(`${dir}/`);
}

/**
 * Staged view of the repo: every read/write/delete goes through this object
 * and is kept in memory until `commit()`. If any edit throws (e.g. a
 * `replaceOnce` that no longer matches because the template drifted), nothing
 * has touched disk yet, so the repo stays clean and the script can simply be
 * re-run once fixed. It also makes `--dry-run` free: run every step, skip the
 * commit.
 */
export function createWorkspace(rootDir) {
  /** relPath -> staged file content */
  const writes = new Map();
  /** relPaths (files or dirs) staged for deletion */
  const deletions = new Set();

  function isDeleted(relPath) {
    for (const dir of deletions) if (isUnder(relPath, dir)) return true;
    return false;
  }

  function exists(relPath) {
    const rel = normalize(relPath);
    if (writes.has(rel)) return true;
    if (isDeleted(rel)) return false;
    return existsSync(path.join(rootDir, rel));
  }

  function read(relPath) {
    const rel = normalize(relPath);
    if (writes.has(rel)) return writes.get(rel);
    if (isDeleted(rel)) throw new Error(`Cannot read "${rel}": it was deleted earlier in this run.`);
    return readFileSync(path.join(rootDir, rel), "utf8");
  }

  function write(relPath, content) {
    writes.set(normalize(relPath), content);
  }

  function edit(relPath, fn) {
    write(relPath, fn(read(relPath)));
  }

  function editJson(relPath, fn) {
    const data = JSON.parse(read(relPath));
    fn(data);
    write(relPath, `${JSON.stringify(data, null, 2)}\n`);
  }

  function rm(relPath) {
    const rel = normalize(relPath);
    for (const key of [...writes.keys()]) if (isUnder(key, rel)) writes.delete(key);
    deletions.add(rel);
  }

  /** Lists what commit() would do, relative to rootDir. */
  function changes() {
    const deleted = [...deletions].filter((rel) => existsSync(path.join(rootDir, rel))).sort();
    const written = [...writes.keys()].sort();
    return { deleted, written };
  }

  /** Flushes staged changes to disk: deletions first, then writes. */
  function commit() {
    for (const rel of deletions) rmSync(path.join(rootDir, rel), { recursive: true, force: true });
    for (const [rel, content] of writes) {
      const full = path.join(rootDir, rel);
      mkdirSync(path.dirname(full), { recursive: true });
      writeFileSync(full, content, "utf8");
    }
    writes.clear();
    deletions.clear();
  }

  return { rootDir, exists, read, write, edit, editJson, rm, changes, commit };
}
