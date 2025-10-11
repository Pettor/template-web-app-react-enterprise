import type { ReactElement } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { loader } from "~/pages/home/HomeLoader";
import { HomePage, type HomePageProps } from "~/pages/home/HomePage";

export const Route = createFileRoute("/_authenticated/")({
  loader: (): HomePageProps => loader(),
  component: HomePageRoute,
  errorComponent: ({ error }) => <div>Error loading home page: {error.message}</div>,
});

function HomePageRoute(): ReactElement {
  const data = Route.useLoaderData();
  return <HomePage {...data} />;
}
