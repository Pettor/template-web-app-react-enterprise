import type { ReactElement } from "react";
import { CalendarDaysIcon, FunnelIcon, SparklesIcon } from "@heroicons/react/20/solid";
import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";
import { Button, Chip } from "@heroui/react";
import { useIntl } from "react-intl";

export function DashboardPageHeader(): ReactElement {
  const intl = useIntl();
  const dateStr = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  return (
    <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
      <div>
        <div className="text-default-400 mb-1.5 flex items-center gap-2 text-[11px] tracking-wider uppercase">
          <span>
            {intl.formatMessage({
              description: "DashboardPageHeader: eyebrow - workspace",
              defaultMessage: "Workspace · Production",
              id: "adI+UA",
            })}
          </span>
          <span className="bg-default-400 h-[3px] w-[3px] rounded-full" />
          <span className="normal-case">{dateStr}</span>
        </div>
        <div className="flex items-baseline gap-3">
          <h1 className="from-accent to-danger bg-gradient-to-r bg-clip-text text-2xl font-bold tracking-tight text-transparent md:text-3xl">
            {intl.formatMessage({
              description: "DashboardPageHeader: heading - page title",
              defaultMessage: "Dashboard",
              id: "pnxWoC",
            })}
          </h1>
          <span className="text-default-500 text-sm">
            {intl.formatMessage({
              description: "DashboardPageHeader: body - page subtitle",
              defaultMessage: "Your metrics at a glance",
              id: "t2vnfl",
            })}
          </span>
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <Chip size="sm" variant="soft" color="success" className="gap-1.5">
            <span className="bg-success h-1.5 w-1.5 rounded-full shadow-[0_0_0_3px_rgba(23,201,100,0.2)]" />
            {intl.formatMessage({
              description: "DashboardPageHeader: chip - systems operational",
              defaultMessage: "All systems operational",
              id: "G2dX9Y",
            })}
          </Chip>
          <Chip size="sm" variant="soft" color="accent" className="gap-1.5">
            <SparklesIcon className="h-3 w-3" />
            {intl.formatMessage({
              description: "DashboardPageHeader: chip - insights",
              defaultMessage: "3 insights this week",
              id: "A/uVcP",
            })}
          </Chip>
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        <Button variant="outline" size="sm">
          <CalendarDaysIcon className="mr-1.5 h-4 w-4" />
          {intl.formatMessage({
            description: "DashboardPageHeader: button - date range",
            defaultMessage: "Apr 1 – 30, 2026",
            id: "M/QHTL",
          })}
        </Button>
        <Button variant="outline" size="sm">
          <FunnelIcon className="mr-1.5 h-4 w-4" />
          {intl.formatMessage({
            description: "DashboardPageHeader: button - filters",
            defaultMessage: "Filters",
            id: "Q64zWZ",
          })}
        </Button>
        <Button variant="primary" size="sm">
          <ArrowDownTrayIcon className="mr-1.5 h-4 w-4" />
          {intl.formatMessage({
            description: "DashboardPageHeader: button - export report",
            defaultMessage: "Export report",
            id: "t0MFjZ",
          })}
        </Button>
      </div>
    </div>
  );
}
