import type { ReactElement } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { RouterProvider, createHashHistory, createRouter } from "@tanstack/react-router";
import { routeTree } from "../../routeTree.gen";
import { RouteLoading } from "./logic/RouteLoading";

const hashHistory = createHashHistory();

const router = createRouter({
  routeTree,
  history: hashHistory,
  context: {
    queryClient: undefined!,
    authStatus: undefined!,
  },
  defaultPreload: "intent",
  defaultPreloadStaleTime: 0,
  defaultPendingComponent: RouteLoading,
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export function AppRoutes(): ReactElement {
  const queryClient = useQueryClient();

  return <RouterProvider router={router} context={{ queryClient, authStatus: "idle" }} />;
}
