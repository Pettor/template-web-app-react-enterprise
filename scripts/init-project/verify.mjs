import { spawnSync } from "node:child_process";

function run(rootDir, command, args, label) {
  console.log(`\n▶ ${label}: ${command} ${args.join(" ")}`);
  const result = spawnSync(command, args, { cwd: rootDir, stdio: "inherit", shell: process.platform === "win32" });
  if (result.status !== 0) {
    throw new Error(`${label} failed (exit code ${result.status ?? "unknown"}).`);
  }
}

/**
 * Regenerates routeTree.gen.ts before running the real build/lint pass.
 *
 * apps/web's `build` script runs `tsc` before `vite build`, but
 * routeTree.gen.ts is only refreshed by the TanStack Router Vite plugin when
 * Vite actually runs. If route folders were added/removed, `tsc` would
 * type-check against a stale routeTree.gen.ts that still imports deleted
 * route files and fail immediately. Forcing one throwaway `vite build` pass
 * first refreshes the file on disk before the real verification runs.
 */
function regenerateRouteTree(rootDir) {
  run(rootDir, "pnpm", ["--filter=@app/web", "exec", "vite", "build"], "Regenerate routeTree.gen.ts");
}

/**
 * Runs pnpm install / build / lint, streaming output directly to the
 * terminal. Throws on the first failure — callers should leave all edits in
 * place (no self-destruct) so the user/agent can fix and re-run.
 */
export function verify(rootDir) {
  run(rootDir, "pnpm", ["install"], "Install dependencies");
  // apps/web resolves workspace packages like @config/vite from their built
  // dist/ output — build those first, or the standalone vite build below
  // (which bypasses Turbo's dependency graph) can't resolve them.
  run(rootDir, "pnpm", ["build:libs"], "Build workspace libraries");
  regenerateRouteTree(rootDir);
  run(rootDir, "pnpm", ["build"], "Build");
  // The generated files write placeholder react-intl `id`s (the real hash
  // depends on the final defaultMessage text, which embeds the user's
  // project name and can't be precomputed) — `lint:fix` corrects them via
  // formatjs/enforce-id's auto-fixer, then the plain run confirms clean.
  run(rootDir, "pnpm", ["lint:fix"], "Lint (auto-fix formatjs ids)");
  run(rootDir, "pnpm", ["lint"], "Lint (verify)");
}
