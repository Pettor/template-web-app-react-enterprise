import type { ReactElement } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useDocumentTitle } from "usehooks-ts";
import { CommandPaletteController } from "~/components/actions/command-palette/CommandPaletteController";
import { SettingsModalController } from "~/components/feedback/settings-modal/SettingsModalController";
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
      <SettingsModalController />
      <CommandPaletteController />
    </>
  );
}
