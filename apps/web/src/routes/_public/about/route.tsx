import type { ReactElement } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useIntl } from "react-intl";
import { aboutLoader } from "./AboutLoader";
import { useAboutPage } from "./UseAboutPage";
import { AboutView } from "~/components/views/about/AboutView";

export const Route = createFileRoute("/_public/about")({
  loader: async ({ context }) => {
    const { queryClient } = context;
    return aboutLoader(queryClient);
  },
  component: AboutPageRoute,
  errorComponent: AboutPageError,
});

function AboutPageRoute(): ReactElement {
  const { serverVersion } = Route.useLoaderData();
  const aboutProps = useAboutPage(serverVersion);
  return <AboutView {...aboutProps} />;
}

function AboutPageError(): ReactElement {
  const intl = useIntl();
  const serverVersion = intl.formatMessage({
    description: "AboutPage - Error server version N/A",
    defaultMessage: "N/A",
    id: "Chil1S",
  });
  const aboutProps = useAboutPage(serverVersion);
  return <AboutView {...aboutProps} />;
}
