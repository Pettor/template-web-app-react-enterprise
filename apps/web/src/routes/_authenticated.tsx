import type { ReactElement } from "react";
import { Suspense } from "react";
import { Outlet, createFileRoute, redirect } from "@tanstack/react-router";
import { RouteLoading } from "~/core/routes/logic/RouteLoading";

export const Route = createFileRoute("/_authenticated")({
  beforeLoad: async ({ context }) => {
    const { authStatus } = context;

    // Redirect to login if user is not authenticated
    if (authStatus === "unauthenticated" || authStatus === "authenticating") {
      throw redirect({
        to: "/login",
      });
    }
  },
  component: AuthenticatedLayout,
});

function AuthenticatedLayout(): ReactElement {
  return (
    <Suspense fallback={<RouteLoading />}>
      <Outlet />
    </Suspense>
  );
}
