import type { ReactElement } from "react";
import { Suspense } from "react";
import { BasicLayout, BlueFadeBackground, GridBackground } from "@package/ui";
import { Outlet, createFileRoute, redirect } from "@tanstack/react-router";
import { RouteLoading } from "~/core/routes/logic/RouteLoading";

export const Route = createFileRoute("/_public")({
  beforeLoad: ({ context }) => {
    const { authStatus } = context;
    if (authStatus === "authenticated") {
      throw redirect({
        to: "/",
      });
    }
  },
  component: PublicLayout,
});

function PublicLayout(): ReactElement {
  return (
    <BasicLayout
      backgroundElement={
        <>
          <BlueFadeBackground />
          <GridBackground />
        </>
      }
    >
      <Suspense fallback={<RouteLoading />}>
        <Outlet />
      </Suspense>
    </BasicLayout>
  );
}
