import type { ReactElement } from "react";
import type { QueryClient } from "@tanstack/react-query";
import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import type { AuthStatus } from "~/classes/auth/AuthStatus";
import { getAuthStatus, initializeAuth } from "~/core/auth/AuthState";
import { RouteProviders } from "~/core/routes/RouteProviders";

export interface RouterContext {
  queryClient: QueryClient;
  authStatus: AuthStatus;
}

export const Route = createRootRouteWithContext<RouterContext>()({
  beforeLoad: async () => {
    await initializeAuth();
    return { authStatus: getAuthStatus() };
  },
  component: RootComponent,
});

function RootComponent(): ReactElement {
  return (
    <RouteProviders>
      <Outlet />
    </RouteProviders>
  );
}
