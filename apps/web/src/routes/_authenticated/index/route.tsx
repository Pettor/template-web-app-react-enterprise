import type { ReactElement } from "react";
import { useDocumentTitle } from "@package/react";
import { createFileRoute } from "@tanstack/react-router";
import { CommandPaletteController } from "~/components/actions/command-palette/CommandPaletteController";
import { SettingsModalController } from "~/components/feedback/settings-modal/SettingsModalController";
import { RouteError } from "~/core/routes/logic/RouteError";
import { HomeView } from "~/views/home/HomeView";

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
