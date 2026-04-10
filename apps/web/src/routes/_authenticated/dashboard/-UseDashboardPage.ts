import type { DashboardData } from "@package/api";
import type { DashboardViewProps } from "~/components/views/dashboard/DashboardView";
import { useAppSessionContent } from "~/core/session/UseAppSessionContent";

export function useDashboardPage(
  dashboardData: DashboardData,
  githubLink: string,
  linkedInLink: string
): DashboardViewProps {
  const sessionContent = useAppSessionContent();

  return {
    navbarContentProps: {
      quickMenu: {
        onSettings: sessionContent.onSettings,
        onLogout: sessionContent.onLogout,
      },
      socialLinks: { github: githubLink, linkedIn: linkedInLink },
      avatarName: sessionContent.name,
      activeTab: "dashboard",
    },
    stats: dashboardData.stats,
    chartData: dashboardData.chartData,
    recentTransactions: dashboardData.recentTransactions,
  };
}
