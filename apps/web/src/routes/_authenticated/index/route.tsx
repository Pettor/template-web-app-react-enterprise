import type { ReactElement } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useDocumentTitle } from "usehooks-ts";
import { homeLoader } from "./-HomeLoader";
import { useHomePage } from "./-UseHomePage";
import { CommandPaletteModule } from "~/components/modules/command-palette-module/CommandPaletteModule";
import { SettingsModalModule } from "~/components/modules/settings-modal/SettingsModalModule";
import { HomeView } from "~/components/views/home/HomeView";
import { RouteError } from "~/core/routes/logic/RouteError";

export const Route = createFileRoute("/_authenticated/")({
  loader: () => homeLoader(),
  component: HomePageRoute,
  errorComponent: ({ error }) => <RouteError error={error} />,
});

function HomePageRoute(): ReactElement {
  useDocumentTitle("Home");
  const { githubLink, linkedInLink } = Route.useLoaderData();
  const homeProps = useHomePage(githubLink, linkedInLink);

  return (
    <>
      <HomeView {...homeProps} />
      <SettingsModalModule />
      <CommandPaletteModule />
    </>
  );
}
