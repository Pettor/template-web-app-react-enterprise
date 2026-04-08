import type { ReactElement } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { aboutLoader } from "../../_public/about/-AboutLoader";
import { useAboutModalPage } from "./-UseAboutModalPage";
import { AboutModal } from "~/components/feedback/about-modal/AboutModal";

export const Route = createFileRoute("/_authenticated/version")({
  loader: async ({ context }) => {
    const { queryClient } = context;
    return aboutLoader(queryClient);
  },
  component: VersionModalRoute,
});

function VersionModalRoute(): ReactElement {
  const { serverVersion } = Route.useLoaderData();
  const aboutProps = useAboutModalPage(serverVersion);
  return <AboutModal {...aboutProps} />;
}
