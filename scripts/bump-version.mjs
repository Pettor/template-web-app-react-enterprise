#!/usr/bin/env node
// Bumps the app version everywhere it lives. They're always kept in sync:
//   - every package.json in the workspace (apps, packages, configs, design, tools and the root all share
//     one version)
//   - VITE_APP_VERSION in apps/web/.env.demo (the demo build can't read $npm_package_version)
//
// Usage: node scripts/bump-version.mjs <patch|minor|major> [--dry-run]

import { execFileSync } from "node:child_process";
import { existsSync, readFileSync, writeFileSync } from "node:fs";

const LEVELS = ["patch", "minor", "major"];
const PACKAGE_VERSION = /^(\s*"version":\s*")(\d+)\.(\d+)\.(\d+)(")/m;
const DEMO_ENV_FILE = "apps/web/.env.demo";
const DEMO_ENV_VERSION = /^(VITE_APP_VERSION=).*$/m;

const [level, ...flags] = process.argv.slice(2);
const dryRun = flags.includes("--dry-run");

if (!LEVELS.includes(level)) {
  console.error(`Usage: node scripts/bump-version.mjs <${LEVELS.join("|")}> [--dry-run]`);
  process.exit(1);
}

const files = execFileSync("git", ["ls-files", "package.json", "**/package.json"], { encoding: "utf8" })
  .split("\n")
  .filter(Boolean)
  .map((file) => {
    const content = readFileSync(file, "utf8");
    const match = content.match(PACKAGE_VERSION);
    if (!match) {
      console.error(`No version found in ${file}`);
      process.exit(1);
    }
    return { file, content, version: match.slice(2, 5).map(Number) };
  });

const versions = new Set(files.map((item) => item.version.join(".")));
if (versions.size !== 1) {
  console.error("Package versions are out of sync — fix them before bumping:");
  for (const item of files) console.error(`  ${item.file}: ${item.version.join(".")}`);
  process.exit(1);
}

const [major, minor, patch] = files[0].version;
const next = {
  patch: [major, minor, patch + 1],
  minor: [major, minor + 1, 0],
  major: [major + 1, 0, 0],
}[level].join(".");

for (const item of files) {
  if (!dryRun) writeFileSync(item.file, item.content.replace(PACKAGE_VERSION, `$1${next}$5`));
  console.log(`${item.file}: ${item.version.join(".")} → ${next}`);
}

let count = files.length;
if (existsSync(DEMO_ENV_FILE)) {
  const content = readFileSync(DEMO_ENV_FILE, "utf8");
  const match = content.match(DEMO_ENV_VERSION);
  if (match) {
    if (!dryRun) writeFileSync(DEMO_ENV_FILE, content.replace(DEMO_ENV_VERSION, `$1${next}`));
    console.log(`${DEMO_ENV_FILE}: ${match[0].slice(match[1].length)} → ${next}`);
    count++;
  }
}

console.log(`\n${dryRun ? "Would bump" : "Bumped"} ${count} files to ${next}`);
