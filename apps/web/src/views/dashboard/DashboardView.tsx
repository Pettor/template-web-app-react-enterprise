import type { ReactElement } from "react";
import { BoltIcon } from "@heroicons/react/20/solid";
import { BanknotesIcon, ChartBarIcon, UserGroupIcon, UserIcon } from "@heroicons/react/20/solid";
import type {
  DashboardActivity,
  DashboardChannel,
  DashboardChartPoint,
  DashboardCohort,
  DashboardKpi,
  DashboardKpiId,
  DashboardStats,
  DashboardTransaction,
} from "@package/api";
import { useIntl } from "react-intl";
import { DashboardActivityPanel } from "~/views/dashboard/DashboardActivityPanel";
import { DashboardEngagementPanel } from "~/views/dashboard/DashboardEngagementPanel";
import { DashboardInsightBanner } from "~/views/dashboard/DashboardInsightBanner";
import { DashboardKpiCard } from "~/views/dashboard/DashboardKpiCard";
import type { KpiAccent } from "~/views/dashboard/DashboardKpiCard";
import { DashboardPageHeader } from "~/views/dashboard/DashboardPageHeader";
import { DashboardRevenuePanel } from "~/views/dashboard/DashboardRevenuePanel";
import { DashboardTransactionsPanel } from "~/views/dashboard/DashboardTransactionsPanel";
import { formatDeltaAbs, kpiBy } from "~/views/dashboard/DashboardUtils";

export interface DashboardViewProps {
  stats: DashboardStats;
  chartData: DashboardChartPoint[];
  recentTransactions: DashboardTransaction[];
  kpis: DashboardKpi[];
  cohorts: DashboardCohort[];
  channels: DashboardChannel[];
  activity: DashboardActivity[];
}

const KPI_ACCENTS: Record<DashboardKpiId, KpiAccent> = {
  revenue: "accent",
  users: "violet",
  active: "success",
  conversion: "warning",
};

export function DashboardView({
  stats,
  chartData,
  recentTransactions,
  kpis,
  cohorts,
  channels,
  activity,
}: DashboardViewProps): ReactElement {
  const intl = useIntl();

  const revenueKpi = kpiBy(kpis, "revenue");
  const usersKpi = kpiBy(kpis, "users");
  const activeKpi = kpiBy(kpis, "active");
  const conversionKpi = kpiBy(kpis, "conversion");

  const vsLastMonth = intl.formatMessage({
    description: "DashboardView: label - vs last month",
    defaultMessage: "vs last month",
    id: "lgNrwt",
  });

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-6 md:px-7">
      <DashboardPageHeader />
      <div className="h-5" />
      <DashboardInsightBanner />

      <div className="mt-4 flex flex-col gap-4">
        <h2 className="sr-only">
          {intl.formatMessage({
            description: "DashboardView: heading - key metrics section (sr-only)",
            defaultMessage: "Key Metrics",
            id: "M5ptc6",
          })}
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <DashboardKpiCard
            label={intl.formatMessage({
              description: "DashboardView: label - total revenue metric",
              defaultMessage: "Revenue",
              id: "wBbxaI",
            })}
            value={`$${stats.totalRevenue.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
            accent={KPI_ACCENTS.revenue}
            icon={<BanknotesIcon className="h-4 w-4" />}
            deltaPct={revenueKpi?.deltaPct ?? 0}
            deltaAbsLabel={formatDeltaAbs(revenueKpi)}
            vsLabel={vsLastMonth}
            spark={revenueKpi?.spark ?? chartData.map((d) => d.revenue)}
          />
          <DashboardKpiCard
            label={intl.formatMessage({
              description: "DashboardView: label - total users metric",
              defaultMessage: "Users",
              id: "kPONPZ",
            })}
            value={stats.totalUsers.toLocaleString()}
            accent={KPI_ACCENTS.users}
            icon={<UserGroupIcon className="h-4 w-4" />}
            deltaPct={usersKpi?.deltaPct ?? 0}
            deltaAbsLabel={formatDeltaAbs(usersKpi)}
            vsLabel={vsLastMonth}
            spark={usersKpi?.spark ?? []}
          />
          <DashboardKpiCard
            label={intl.formatMessage({
              description: "DashboardView: label - active users metric",
              defaultMessage: "Active users",
              id: "LFsCQA",
            })}
            value={stats.activeUsers.toLocaleString()}
            accent={KPI_ACCENTS.active}
            icon={<UserIcon className="h-4 w-4" />}
            deltaPct={activeKpi?.deltaPct ?? 0}
            deltaAbsLabel={formatDeltaAbs(activeKpi)}
            vsLabel={vsLastMonth}
            spark={activeKpi?.spark ?? []}
          />
          <DashboardKpiCard
            label={intl.formatMessage({
              description: "DashboardView: label - conversion rate metric",
              defaultMessage: "Conversion",
              id: "MMlhLp",
            })}
            value={`${stats.conversionRate}%`}
            accent={KPI_ACCENTS.conversion}
            icon={<ChartBarIcon className="h-4 w-4" />}
            deltaPct={conversionKpi?.deltaPct ?? 0}
            deltaAbsLabel={formatDeltaAbs(conversionKpi)}
            vsLabel={vsLastMonth}
            spark={conversionKpi?.spark ?? []}
          />
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <DashboardRevenuePanel chartData={chartData} />
          <DashboardEngagementPanel stats={stats} cohorts={cohorts} channels={channels} />
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <DashboardTransactionsPanel transactions={recentTransactions} />
          <DashboardActivityPanel activity={activity} />
        </div>
      </div>

      <div className="text-default-400 border-border mt-7 border-t pt-4 text-center text-[11px]">
        {intl.formatMessage(
          {
            description: "DashboardView: footer - data freshness",
            defaultMessage: "Data refreshed {time}",
            id: "I19Naa",
          },
          {
            time: (
              <span className="font-mono">
                <BoltIcon className="mr-1 inline h-3 w-3" />
                2m ago
              </span>
            ),
          }
        )}
      </div>
    </div>
  );
}
