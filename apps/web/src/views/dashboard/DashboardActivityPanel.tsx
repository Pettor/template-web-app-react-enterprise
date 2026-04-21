import type { ReactElement } from "react";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import { Button, Card, Chip } from "@heroui/react";
import type { DashboardActivity } from "@package/api";
import { useIntl } from "react-intl";

const ACTIVITY_COLORS: Record<DashboardActivity["color"], string> = {
  success: "bg-success shadow-[0_0_0_3px_rgba(23,201,100,0.18)]",
  accent: "bg-accent shadow-[0_0_0_3px_rgba(0,111,238,0.18)]",
  warning: "bg-warning shadow-[0_0_0_3px_rgba(245,165,36,0.18)]",
  default: "bg-default-400 shadow-[0_0_0_3px_rgba(255,255,255,0.10)]",
};

export interface DashboardActivityPanelProps {
  activity: DashboardActivity[];
}

export function DashboardActivityPanel({ activity }: DashboardActivityPanelProps): ReactElement {
  const intl = useIntl();

  return (
    <Card variant="secondary">
      <Card.Header className="flex-row items-start justify-between">
        <div>
          <Card.Title>
            {intl.formatMessage({
              description: "DashboardActivityPanel: heading - activity feed",
              defaultMessage: "Activity feed",
              id: "Plup8J",
            })}
          </Card.Title>
          <Card.Description>
            {intl.formatMessage({
              description: "DashboardActivityPanel: body - activity description",
              defaultMessage: "System + account events",
              id: "I1wsb0",
            })}
          </Card.Description>
        </div>
        <Chip size="sm" variant="soft" color="default">
          {intl.formatMessage(
            {
              description: "DashboardActivityPanel: chip - new activity count",
              defaultMessage: "{count} new",
              id: "hl9KQc",
            },
            { count: activity.length }
          )}
        </Chip>
      </Card.Header>
      <Card.Content className="flex flex-col gap-0">
        {activity.map((a, i) => (
          <div
            key={a.key}
            className={`flex gap-3 py-2.5 ${i < activity.length - 1 ? "border-border border-b border-dashed" : ""}`}
          >
            <div className="mt-1.5 w-2.5 shrink-0">
              <span className={`block h-2 w-2 rounded-full ${ACTIVITY_COLORS[a.color]}`} />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex justify-between gap-2">
                <div className="text-sm font-medium">{a.title}</div>
                <div className="text-default-400 shrink-0 font-mono text-[11px]">{a.relativeTime}</div>
              </div>
              <div className="text-default-500 mt-0.5 text-xs">{a.detail}</div>
            </div>
          </div>
        ))}
        <Button variant="outline" size="sm" className="mt-3 w-full">
          {intl.formatMessage({
            description: "DashboardActivityPanel: button - view all activity",
            defaultMessage: "View all activity",
            id: "C18Rvb",
          })}
          <ArrowRightIcon className="ml-1.5 h-3 w-3" />
        </Button>
      </Card.Content>
    </Card>
  );
}
