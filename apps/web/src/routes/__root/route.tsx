import type { QueryClient } from "@tanstack/react-query";
import { createRootRouteWithContext } from "@tanstack/react-router";
import type { AuthStatus } from "~/classes/auth/AuthStatus";
import { getAuthStatus, initializeAuth } from "~/core/auth/AuthState";

export interface RouterContext {
  queryClient: QueryClient;
  authStatus: AuthStatus;
}

export const Route = createRootRouteWithContext<RouterContext>()({
  beforeLoad: async () => {
    await initializeAuth();
    return { authStatus: getAuthStatus() };
  },
});
