import type { QueryClient } from "@tanstack/react-query";
import { createRootRouteWithContext } from "@tanstack/react-router";
import { getAuthStatus, initializeAuth } from "~/core/auth/AuthState";
import type { AuthStatus } from "~/core/auth/AuthStatus";

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
