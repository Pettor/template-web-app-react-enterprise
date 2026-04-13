import type { ReactElement } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useDocumentTitle } from "usehooks-ts";
import { CommandPaletteModule } from "~/components/modules/command-palette-module/CommandPaletteModule";
import { SettingsModalModule } from "~/components/modules/settings-modal/SettingsModalModule";
import { HomeView } from "~/components/views/home/HomeView";
import { RouteError } from "~/core/routes/logic/RouteError";

export const Route = createFileRoute("/_authenticated/")({
  component: HomePageRoute,
  errorComponent: ({ error }) => <RouteError error={error} />,
});

function HomePageRoute(): ReactElement {
  useDocumentTitle("Home");

  return (
    <>
      <HomeView />
      <SettingsModalModule />
      <CommandPaletteModule />
    </>
  );
}
