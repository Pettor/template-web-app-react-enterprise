import { postRefreshToken } from "@package/api";
import type { AuthStatus } from "./AuthStatus";

let authStatus: AuthStatus = "idle";
let authInitPromise: Promise<AuthStatus> | null = null;

/**
 * Returns the current auth status.
 */
export function getAuthStatus(): AuthStatus {
  return authStatus;
}

/**
 * Sets the auth status. Called by login/logout to update the cached state.
 */
export function setAuthStatus(status: AuthStatus): void {
  authStatus = status;
}

/**
 * Initializes auth by attempting a token refresh.
 * Only runs once — subsequent calls return the cached result.
 */
export async function initializeAuth(): Promise<AuthStatus> {
  if (authInitPromise) {
    return authInitPromise;
  }

  authInitPromise = (async () => {
    if (import.meta.env.VITE_DEMO_MODE === "true") {
      authStatus = "unauthenticated";
      return authStatus;
    }

    try {
      await postRefreshToken();
      authStatus = "authenticated";
    } catch {
      authStatus = "unauthenticated";
    }
    return authStatus;
  })();

  return authInitPromise;
}
