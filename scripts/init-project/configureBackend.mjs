import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

/**
 * backend = true path: no deletions, just point the vite dev-server proxy at
 * the user's backend.
 */
export function configureBackend(rootDir, { backendHost, backendPort }) {
  const filePath = path.join(rootDir, "apps/web/.env");
  let content = readFileSync(filePath, "utf8");
  content = content.replace(/^VITE_CONNECT_HOST=.*$/m, `VITE_CONNECT_HOST=${backendHost}`);
  content = content.replace(/^VITE_CONNECT_PORT=.*$/m, `VITE_CONNECT_PORT=${backendPort}`);
  writeFileSync(filePath, content, "utf8");
}
