import type { ReactElement } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useDocumentTitle } from "usehooks-ts";
import { dashboardLoader } from "./-DashboardLoader";
import { useDashboardPage } from "./-UseDashboardPage";
import { SettingsModalModule } from "~/components/modules/settings-modal/SettingsModalModule";
import { DashboardView } from "~/components/views/dashboard/DashboardView";

export const Route = createFileRoute("/_authenticated/dashboard")({
  loader: ({ context: { queryClient } }) => dashboardLoader(queryClient),
  component: DashboardPageRoute,
  errorComponent: ({ error }) => <div>Error loading dashboard: {error.message}</div>,
});

function DashboardPageRoute(): ReactElement {
  useDocumentTitle("Dashboard");
  const dashboardData = Route.useLoaderData();
  const dashboardProps = useDashboardPage(
    dashboardData,
    "https://github.com/Pettor/template-web-app-react",
    "https://www.linkedin.com/in/petter-hancock/"
  );

  return (
    <>
      <DashboardView {...dashboardProps} />
      <SettingsModalModule />
    </>
  );
}
