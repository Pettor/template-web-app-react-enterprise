import type { ReactElement } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useDocumentTitle } from "usehooks-ts";
import { homeLoader } from "./HomeLoader";
import { useHomePage } from "./UseHomePage";
import { HomeView } from "~/components/views/home/HomeView";

export const Route = createFileRoute("/_authenticated/")({
  loader: () => homeLoader(),
  component: HomePageRoute,
  errorComponent: ({ error }) => <div>Error loading home page: {error.message}</div>,
});

function HomePageRoute(): ReactElement {
  useDocumentTitle("Home");
  const { githubLink, linkedInLink } = Route.useLoaderData();
  const homeProps = useHomePage(githubLink, linkedInLink);

  return <HomeView {...homeProps} />;
}
