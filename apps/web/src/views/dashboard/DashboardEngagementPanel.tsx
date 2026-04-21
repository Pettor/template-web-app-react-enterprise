import type { ReactElement } from "react";
import { EllipsisHorizontalIcon } from "@heroicons/react/20/solid";
import { Button, Card, Separator } from "@heroui/react";
import type { DashboardChannel, DashboardCohort, DashboardStats } from "@package/api";
import { useIntl } from "react-intl";
import { Gauge } from "~/components/display/gauge/Gauge";

type CohortColor = "accent" | "violet" | "success";
type ChannelColor = "accent" | "success" | "violet" | "warning" | "default";

const COHORT_COLORS: Record<DashboardCohort["key"], CohortColor> = {
  dau: "accent",
  wau: "violet",
  mau: "success",
};

const CHANNEL_COLOR_MAP: Record<DashboardChannel["key"], ChannelColor> = {
  direct: "accent",
  organic: "success",
  referral: "violet",
  paid: "warning",
  other: "default",
};

const CHANNEL_COLORS: Record<ChannelColor, string> = {
  accent: "bg-accent",
  success: "bg-success",
  violet: "bg-violet-500",
  warning: "bg-warning",
  default: "bg-default-300",
};

function CohortBar({ pct, color }: { pct: number; color: CohortColor }): ReactElement {
  const fillClass = color === "accent" ? "bg-accent" : color === "violet" ? "bg-violet-500" : "bg-success";
  return (
    <div className="bg-default-100 h-1.5 w-full overflow-hidden rounded-full">
      <div className={`h-full rounded-full ${fillClass} transition-all`} style={{ width: `${pct}%` }} />
    </div>
  );
}

interface StackedBarItem {
  key: string;
  pct: number;
  color: ChannelColor;
}

function StackedBar({ items }: { items: StackedBarItem[] }): ReactElement {
  return (
    <div className="bg-default-100 flex h-2 gap-0.5 overflow-hidden rounded-full">
      {items.map((it) => (
        <div key={it.key} className={`${CHANNEL_COLORS[it.color]} rounded-sm`} style={{ flex: it.pct }} />
      ))}
    </div>
  );
}

export interface DashboardEngagementPanelProps {
  stats: DashboardStats;
  cohorts: DashboardCohort[];
  channels: DashboardChannel[];
}

export function DashboardEngagementPanel({ stats, cohorts, channels }: DashboardEngagementPanelProps): ReactElement {
  const intl = useIntl();

  function cohortLabel(key: DashboardCohort["key"]): string {
    if (key === "dau") {
      return intl.formatMessage({
        description: "DashboardEngagementPanel: label - daily active",
        defaultMessage: "Daily active",
        id: "QJeFl3",
      });
    }
    if (key === "wau") {
      return intl.formatMessage({
        description: "DashboardEngagementPanel: label - weekly active",
        defaultMessage: "Weekly active",
        id: "H1qtpC",
      });
    }
    return intl.formatMessage({
      description: "DashboardEngagementPanel: label - monthly active",
      defaultMessage: "Monthly active",
      id: "kSnq7U",
    });
  }

  function channelLabel(key: DashboardChannel["key"]): string {
    switch (key) {
      case "direct":
        return intl.formatMessage({
          description: "DashboardEngagementPanel: label - direct channel",
          defaultMessage: "Direct",
          id: "68HYcJ",
        });
      case "organic":
        return intl.formatMessage({
          description: "DashboardEngagementPanel: label - organic channel",
          defaultMessage: "Organic",
          id: "weh/dP",
        });
      case "referral":
        return intl.formatMessage({
          description: "DashboardEngagementPanel: label - referral channel",
          defaultMessage: "Referral",
          id: "8jBcbV",
        });
      case "paid":
        return intl.formatMessage({
          description: "DashboardEngagementPanel: label - paid channel",
          defaultMessage: "Paid",
          id: "OWux9Q",
        });
      default:
        return intl.formatMessage({
          description: "DashboardEngagementPanel: label - other channel",
          defaultMessage: "Other",
          id: "jkYyXW",
        });
    }
  }

  const stackedItems: StackedBarItem[] = channels.map((c) => ({
    key: c.key,
    pct: c.pct,
    color: CHANNEL_COLOR_MAP[c.key],
  }));

  return (
    <Card variant="secondary">
      <Card.Header className="flex-row items-start justify-between">
        <div>
          <Card.Title>
            {intl.formatMessage({
              description: "DashboardEngagementPanel: heading - engagement card",
              defaultMessage: "Engagement",
              id: "7ZF5iI",
            })}
          </Card.Title>
          <Card.Description>
            {intl.formatMessage({
              description: "DashboardEngagementPanel: body - engagement description",
              defaultMessage: "Activation funnel and channels",
              id: "5vZaul",
            })}
          </Card.Description>
        </div>
        <Button variant="ghost" size="sm" isIconOnly aria-label="More">
          <EllipsisHorizontalIcon className="h-4 w-4" />
        </Button>
      </Card.Header>
      <Card.Content className="flex flex-col gap-4">
        <div className="flex items-center gap-5">
          <Gauge
            value={stats.activeUsers}
            total={stats.totalUsers}
            subLabel={intl.formatMessage({
              description: "DashboardEngagementPanel: gauge - active rate",
              defaultMessage: "active rate",
              id: "S1wkQA",
            })}
          />
          <div className="flex flex-1 flex-col gap-3">
            {cohorts.map((c) => (
              <div key={c.key}>
                <div className="mb-1.5 flex justify-between text-xs">
                  <span className="text-default-500">{cohortLabel(c.key)}</span>
                  <span className="font-mono font-medium tabular-nums">
                    {c.value.toLocaleString()}
                    <span className="text-default-400"> / {c.total.toLocaleString()}</span>
                  </span>
                </div>
                <CohortBar pct={c.total > 0 ? (c.value / c.total) * 100 : 0} color={COHORT_COLORS[c.key]} />
              </div>
            ))}
          </div>
        </div>

        <Separator />

        <div>
          <div className="text-default-500 mb-2.5 flex justify-between text-[11px] tracking-wider uppercase">
            <span>
              {intl.formatMessage({
                description: "DashboardEngagementPanel: heading - acquisition channels",
                defaultMessage: "Acquisition channels",
                id: "FArdUe",
              })}
            </span>
            <span className="font-mono normal-case">
              {intl.formatMessage(
                {
                  description: "DashboardEngagementPanel: label - total users count",
                  defaultMessage: "{count} users",
                  id: "iFG54D",
                },
                { count: stats.totalUsers.toLocaleString() }
              )}
            </span>
          </div>
          <StackedBar items={stackedItems} />
          <div className="mt-3 grid grid-cols-2 gap-x-3 gap-y-1.5">
            {channels.map((c) => (
              <div key={c.key} className="flex items-center justify-between text-xs">
                <span className="text-default-500 flex items-center gap-2">
                  <span className={`h-1.5 w-1.5 rounded-full ${CHANNEL_COLORS[CHANNEL_COLOR_MAP[c.key]]}`} />
                  {channelLabel(c.key)}
                </span>
                <span className="font-mono font-medium tabular-nums">{c.pct}%</span>
              </div>
            ))}
          </div>
        </div>
      </Card.Content>
    </Card>
  );
}
