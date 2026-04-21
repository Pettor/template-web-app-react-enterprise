import type { ReactElement } from "react";
import { ArrowRightIcon, SparklesIcon, XMarkIcon } from "@heroicons/react/20/solid";
import { Button } from "@heroui/react";
import { useIntl } from "react-intl";

export function DashboardInsightBanner(): ReactElement {
  const intl = useIntl();
  return (
    <div className="flex flex-col items-start gap-3 rounded-xl border border-[color-mix(in_oklab,var(--accent)_25%,transparent)] bg-gradient-to-r from-[color-mix(in_oklab,var(--accent)_10%,transparent)] via-[color-mix(in_oklab,var(--accent)_4%,transparent)] to-transparent p-3 md:flex-row md:items-center md:gap-4">
      <span className="bg-accent/15 text-accent grid h-8 w-8 shrink-0 place-items-center rounded-lg">
        <SparklesIcon className="h-4 w-4" />
      </span>
      <div className="min-w-0 flex-1">
        <div className="mb-0.5 text-sm">
          {intl.formatMessage(
            {
              description: "DashboardInsightBanner: banner - insight headline",
              defaultMessage: "Revenue is {pct} above target this month, driven by {driver}.",
              id: "W1Ay6i",
            },
            {
              pct: <span className="text-accent font-medium">20.1%</span>,
              driver: <span className="font-medium">38% lift in enterprise plan conversions</span>,
            }
          )}
        </div>
        <div className="text-default-500 text-xs">
          {intl.formatMessage({
            description: "DashboardInsightBanner: banner - insight subtext",
            defaultMessage:
              "Conversion rate slipped 0.3pp — likely attributable to the new pricing page A/B test. Consider reviewing variant B.",
            id: "KmWP72",
          })}
        </div>
      </div>
      <div className="flex items-center gap-1">
        <Button variant="secondary" size="sm">
          {intl.formatMessage({
            description: "DashboardInsightBanner: button - view analysis",
            defaultMessage: "View analysis",
            id: "twRE0Y",
          })}
          <ArrowRightIcon className="ml-1 h-3 w-3" />
        </Button>
        <Button variant="ghost" size="sm" isIconOnly aria-label="Dismiss">
          <XMarkIcon className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
