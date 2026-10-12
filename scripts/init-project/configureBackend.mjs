/**
 * backend = true path: no deletions, just point the vite dev-server proxy at
 * the user's backend.
 */
export function configureBackend(ws, { backendHost, backendPort }) {
  ws.edit("apps/web/.env", (content) => {
    content = content.replace(/^VITE_CONNECT_HOST=.*$/m, () => `VITE_CONNECT_HOST=${backendHost}`);
    content = content.replace(/^VITE_CONNECT_PORT=.*$/m, () => `VITE_CONNECT_PORT=${backendPort}`);
    return content;
  });
}
