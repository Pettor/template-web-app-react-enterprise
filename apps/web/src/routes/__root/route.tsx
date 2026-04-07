import type { ReactElement } from "react";
import type { QueryClient } from "@tanstack/react-query";
import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import type { AuthStatus } from "~/classes/auth/AuthStatus";
import { RouteProviders } from "~/core/routes/RouteProviders";

export interface RouterContext {
  queryClient: QueryClient;
  authStatus: AuthStatus;
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootComponent,
});

function RootComponent(): ReactElement {
  return (
    <RouteProviders>
      <Outlet />
    </RouteProviders>
  );
}
