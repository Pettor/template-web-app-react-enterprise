import type { ReactElement } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useIntl } from "react-intl";
import { loader } from "~/pages/about/AboutLoader";
import { AboutPage } from "~/pages/about/AboutPage";

export const Route = createFileRoute("/_public/about")({
  loader: async ({ context }) => {
    const { queryClient } = context;
    return loader(queryClient);
  },
  component: AboutPageRoute,
  errorComponent: AboutPageError,
});

function AboutPageRoute(): ReactElement {
  const data = Route.useLoaderData();
  return <AboutPage {...data} />;
}

function AboutPageError(): ReactElement {
  const intl = useIntl();
  return (
    <AboutPage
      serverVersion={intl.formatMessage({
        description: "AbourPage - Error server version N/A",
        defaultMessage: "N/A",
        id: "tDfYMW",
      })}
    />
  );
}
