import type { ReactElement } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { loader } from "~/pages/about/AboutLoader";
import { AboutModalPage } from "~/pages/about/modal/AboutModalPage";

export const Route = createFileRoute("/_authenticated/version")({
  loader: async ({ context }) => {
    const { queryClient } = context;
    return loader(queryClient);
  },
  component: VersionModalRoute,
});

function VersionModalRoute(): ReactElement {
  const data = Route.useLoaderData();
  return <AboutModalPage {...data} />;
}
