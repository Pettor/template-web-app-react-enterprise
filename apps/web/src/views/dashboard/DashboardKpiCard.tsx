import type { ReactElement, SVGProps } from "react";
import { ArrowTrendingDownIcon, ArrowTrendingUpIcon } from "@heroicons/react/20/solid";
import { Card, Chip } from "@heroui/react";
import { Sparkline } from "~/components/display/sparkline/Sparkline";

type KpiAccent = "accent" | "violet" | "success" | "warning";

const ACCENT_CLASSES: Record<KpiAccent, { tileBg: string; tileFg: string; sparkStroke: string; sparkFill: string }> = {
  accent: {
    tileBg: "bg-accent/15",
    tileFg: "text-accent",
    sparkStroke: "var(--accent)",
    sparkFill: "var(--accent)",
  },
  violet: {
    tileBg: "bg-violet-500/15",
    tileFg: "text-violet-400",
    sparkStroke: "#9353d3",
    sparkFill: "#9353d3",
  },
  success: {
    tileBg: "bg-success/15",
    tileFg: "text-success",
    sparkStroke: "var(--success)",
    sparkFill: "var(--success)",
  },
  warning: {
    tileBg: "bg-warning/15",
    tileFg: "text-warning",
    sparkStroke: "var(--warning)",
    sparkFill: "var(--warning)",
  },
};

export { type KpiAccent, ACCENT_CLASSES };

export interface DashboardKpiCardProps {
  label: string;
  value: string;
  accent: KpiAccent;
  icon: ReactElement<SVGProps<SVGSVGElement>>;
  deltaPct: number;
  deltaAbsLabel: string;
  vsLabel: string;
  spark: number[];
}

export function DashboardKpiCard({
  label,
  value,
  accent,
  icon,
  deltaPct,
  deltaAbsLabel,
  vsLabel,
  spark,
}: DashboardKpiCardProps): ReactElement {
  const up = deltaPct >= 0;
  const classes = ACCENT_CLASSES[accent];
  return (
    <Card variant="secondary" className="transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg">
      <Card.Content className="flex flex-col gap-3.5 p-5">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2.5">
            <span className={`flex h-7 w-7 items-center justify-center rounded-lg ${classes.tileBg} ${classes.tileFg}`}>
              {icon}
            </span>
            <span className="text-default-500 text-xs font-medium">{label}</span>
          </div>
          <Chip size="sm" variant="soft" color={up ? "success" : "danger"} className="gap-0.5 px-1.5">
            {up ? <ArrowTrendingUpIcon className="h-3 w-3" /> : <ArrowTrendingDownIcon className="h-3 w-3" />}
            <span className="font-mono text-[11px] tabular-nums">
              {up ? "+" : ""}
              {deltaPct.toFixed(1)}%
            </span>
          </Chip>
        </div>

        <div className="font-mono text-3xl font-semibold tracking-tight tabular-nums">{value}</div>

        <div className="flex items-center justify-between gap-3">
          <div className="text-default-400 flex items-center gap-1.5 text-[11px]">
            <span className={`font-mono font-medium ${up ? "text-success" : "text-danger"}`}>{deltaAbsLabel}</span>
            <span>{vsLabel}</span>
          </div>
          <Sparkline data={spark} stroke={classes.sparkStroke} fill={classes.sparkFill} />
        </div>
      </Card.Content>
    </Card>
  );
}
