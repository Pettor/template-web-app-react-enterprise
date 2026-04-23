import type { ReactElement } from "react";
import { useDocumentTitle } from "@package/react";
import { createFileRoute } from "@tanstack/react-router";
import { dashboardLoader } from "./-DashboardLoader";
import { CommandPaletteController } from "~/components/actions/command-palette/CommandPaletteController";
import { SettingsModalController } from "~/components/feedback/settings-modal/SettingsModalController";
import { DashboardView } from "~/views/dashboard/DashboardView";

export const Route = createFileRoute("/_authenticated/dashboard")({
  loader: ({ context: { queryClient } }) => dashboardLoader(queryClient),
  component: DashboardPageRoute,
  errorComponent: ({ error }) => <div>Error loading dashboard: {error.message}</div>,
});

function DashboardPageRoute(): ReactElement {
  useDocumentTitle("Dashboard");
  const dashboardData = Route.useLoaderData();

  return (
    <>
      <DashboardView
        stats={dashboardData.stats}
        chartData={dashboardData.chartData}
        recentTransactions={dashboardData.recentTransactions}
        kpis={dashboardData.kpis}
        cohorts={dashboardData.cohorts}
        channels={dashboardData.channels}
        activity={dashboardData.activity}
      />
      <SettingsModalController />
      <CommandPaletteController />
    </>
  );
}
