import type { ReactElement } from "react";
import { EllipsisHorizontalIcon } from "@heroicons/react/20/solid";
import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";
import { Button, Card, Chip } from "@heroui/react";
import type { DashboardChartPoint } from "@package/api";
import { useIntl } from "react-intl";
import { DashboardRevenueChart } from "~/views/dashboard/DashboardRevenueChart";
import { formatCurrency } from "~/views/dashboard/DashboardUtils";
import { RANGE_TABS, UseRevenuePanel } from "~/views/dashboard/UseRevenuePanel";

export interface DashboardRevenuePanelProps {
  chartData: DashboardChartPoint[];
}

export function DashboardRevenuePanel({ chartData }: DashboardRevenuePanelProps): ReactElement {
  const intl = useIntl();
  const { range, setRange, slice, totals } = UseRevenuePanel(chartData);

  const revenueLabel = intl.formatMessage({
    description: "DashboardRevenuePanel: legend - revenue",
    defaultMessage: "Revenue",
    id: "T2il60",
  });
  const expensesLabel = intl.formatMessage({
    description: "DashboardRevenuePanel: legend - expenses",
    defaultMessage: "Expenses",
    id: "afKotD",
  });
  const profitLabel = intl.formatMessage({
    description: "DashboardRevenuePanel: label - profit margin",
    defaultMessage: "Profit margin",
    id: "34J3Qb",
  });

  return (
    <Card variant="secondary" className="col-span-1 md:col-span-2">
      <Card.Header className="flex flex-col items-start justify-between gap-3 md:flex-row md:items-center">
        <div>
          <div className="flex items-center gap-2">
            <Card.Title>
              {intl.formatMessage({
                description: "DashboardRevenuePanel: heading - revenue overview",
                defaultMessage: "Revenue overview",
                id: "BYWk+Z",
              })}
            </Card.Title>
            <Chip size="sm" variant="soft" color="accent">
              {intl.formatMessage({
                description: "DashboardRevenuePanel: chip - live",
                defaultMessage: "Live",
                id: "eFZvVr",
              })}
            </Chip>
          </div>
          <Card.Description>
            {intl.formatMessage(
              {
                description: "DashboardRevenuePanel: body - revenue overview description",
                defaultMessage:
                  "Monthly revenue vs expenses · trailing {count, plural, one {# month} other {# months}}",
                id: "0uAaIu",
              },
              { count: slice.length }
            )}
          </Card.Description>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="border-border bg-surface-secondary flex gap-0.5 rounded-lg border p-0.5">
            {RANGE_TABS.map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setRange(r)}
                className={`rounded-md px-2 py-1 font-mono text-[11px] font-medium transition ${
                  range === r ? "bg-accent text-accent-foreground" : "text-default-500 hover:text-foreground"
                }`}
              >
                {r}
              </button>
            ))}
          </div>
          <Button variant="outline" size="sm" isIconOnly aria-label="Export">
            <ArrowDownTrayIcon className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" isIconOnly aria-label="More">
            <EllipsisHorizontalIcon className="h-4 w-4" />
          </Button>
        </div>
      </Card.Header>
      <Card.Content className="flex flex-col gap-4">
        <div className="border-border grid grid-cols-1 overflow-hidden rounded-lg border sm:grid-cols-3">
          <div className="bg-accent/5 border-border border-b p-3 sm:border-r sm:border-b-0">
            <div className="text-default-500 mb-1 flex items-center gap-1.5 text-[11px] tracking-wider uppercase">
              <span className="bg-accent h-1.5 w-1.5 rounded-full" />
              {revenueLabel}
            </div>
            <div className="font-mono text-lg font-semibold tracking-tight tabular-nums">
              {formatCurrency(totals.revenue)}
            </div>
            <div className="text-default-400 mt-0.5 text-[11px]">
              {intl.formatMessage({
                description: "DashboardRevenuePanel: body - revenue yoy",
                defaultMessage: "+14.2% YoY",
                id: "ytGKoh",
              })}
            </div>
          </div>
          <div className="border-border border-b p-3 sm:border-r sm:border-b-0">
            <div className="text-default-500 mb-1 flex items-center gap-1.5 text-[11px] tracking-wider uppercase">
              <span className="bg-success h-1.5 w-1.5 rounded-full" />
              {expensesLabel}
            </div>
            <div className="font-mono text-lg font-semibold tracking-tight tabular-nums">
              {formatCurrency(totals.expenses)}
            </div>
            <div className="text-default-400 mt-0.5 text-[11px]">
              {intl.formatMessage({
                description: "DashboardRevenuePanel: body - expenses yoy",
                defaultMessage: "+6.1% YoY",
                id: "Kyb3SS",
              })}
            </div>
          </div>
          <div className="p-3">
            <div className="text-default-500 mb-1 flex items-center gap-1.5 text-[11px] tracking-wider uppercase">
              <span className="bg-warning h-1.5 w-1.5 rounded-full" />
              {profitLabel}
            </div>
            <div className="font-mono text-lg font-semibold tracking-tight tabular-nums">
              {totals.margin.toFixed(1)}%
            </div>
            <div className="text-default-400 mt-0.5 text-[11px]">
              {intl.formatMessage({
                description: "DashboardRevenuePanel: body - profit margin hint",
                defaultMessage: "healthy range",
                id: "DpTQ18",
              })}
            </div>
          </div>
        </div>

        <DashboardRevenueChart
          data={slice}
          revenueLabel={revenueLabel}
          expensesLabel={expensesLabel}
          profitLabel={profitLabel}
        />

        <div className="text-default-500 flex items-center gap-5 text-xs">
          <span className="flex items-center gap-1.5">
            <span className="bg-accent h-2.5 w-2.5 rounded-sm" />
            {revenueLabel}
          </span>
          <span className="flex items-center gap-1.5">
            <span className="bg-success h-2.5 w-2.5 rounded-sm" />
            {expensesLabel}
          </span>
          <span className="text-default-400 ml-auto">
            {intl.formatMessage({
              description: "DashboardRevenuePanel: hint - hover for details",
              defaultMessage: "Hover for details",
              id: "fYxcd4",
            })}
          </span>
        </div>
      </Card.Content>
    </Card>
  );
}
