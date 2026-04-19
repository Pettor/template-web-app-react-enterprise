import type { JwtToken } from "./JwtToken";

/**
 * @internal Worker-scoped token storage. Do NOT import from the main thread.
 *
 * This module is intentionally excluded from the public `@package/api` barrel
 * (`packages/api/src/index.ts`). The access token is held only in worker
 * memory and must never be serialized across `postMessage`. Any import from
 * main-thread code would create a separate module instance with a `null`
 * token — the security model only holds when these functions are called from
 * inside the worker.
 */
let authToken: JwtToken = null;

export function getToken(): JwtToken {
  return authToken;
}

export function setToken(token: JwtToken): void {
  authToken = token;
}

export function clearToken(): void {
  authToken = null;
}
