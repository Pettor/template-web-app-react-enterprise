import type { ReactElement } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { RouterProvider, createHashHistory, createRouter } from "@tanstack/react-router";
import { routeTree } from "../../routeTree.gen";
import { useAuth } from "../auth/UseAuth";

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
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export function AppRoutes(): ReactElement {
  const queryClient = useQueryClient();
  const { status } = useAuth();

  return <RouterProvider router={router} context={{ queryClient, authStatus: status }} />;
}
