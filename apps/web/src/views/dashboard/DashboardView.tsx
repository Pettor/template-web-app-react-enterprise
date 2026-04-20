import type { ReactElement, SVGProps } from "react";
import { useId, useMemo, useState } from "react";
import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowTrendingDownIcon,
  ArrowTrendingUpIcon,
  ArrowUpIcon,
  BanknotesIcon,
  BoltIcon,
  CalendarDaysIcon,
  ChartBarIcon,
  CheckIcon,
  ChevronDownIcon,
  ClockIcon,
  EllipsisHorizontalIcon,
  FunnelIcon,
  PlusIcon,
  SparklesIcon,
  UserGroupIcon,
  UserIcon,
  XMarkIcon,
} from "@heroicons/react/20/solid";
import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";
import { Avatar, Button, Card, Chip, Separator } from "@heroui/react";
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
import { SearchField } from "~/components/input/input-field/SearchField";

export interface DashboardViewProps {
  stats: DashboardStats;
  chartData: DashboardChartPoint[];
  recentTransactions: DashboardTransaction[];
  kpis: DashboardKpi[];
  cohorts: DashboardCohort[];
  channels: DashboardChannel[];
  activity: DashboardActivity[];
}

const RANGE_TABS = ["30d", "3m", "6m", "12m"] as const;
type RangeValue = (typeof RANGE_TABS)[number];

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

const ACTIVITY_COLORS: Record<DashboardActivity["color"], string> = {
  success: "bg-success shadow-[0_0_0_3px_rgba(23,201,100,0.18)]",
  accent: "bg-accent shadow-[0_0_0_3px_rgba(0,111,238,0.18)]",
  warning: "bg-warning shadow-[0_0_0_3px_rgba(245,165,36,0.18)]",
  default: "bg-default-400 shadow-[0_0_0_3px_rgba(255,255,255,0.10)]",
};

const KPI_ACCENTS: Record<DashboardKpiId, KpiAccent> = {
  revenue: "accent",
  users: "violet",
  active: "success",
  conversion: "warning",
};

function sliceByRange(data: DashboardChartPoint[], range: RangeValue): DashboardChartPoint[] {
  if (data.length === 0) return data;
  switch (range) {
    case "30d":
      return data.slice(-1);
    case "3m":
      return data.slice(-3);
    case "6m":
      return data.slice(-6);
    case "12m":
      return data.slice(-12);
    default:
      return data;
  }
}

function formatCurrency(value: number): string {
  return `$${value.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
}

function formatCompactDollars(value: number): string {
  return value >= 1000 ? `$${(value / 1000).toFixed(0)}k` : `$${value}`;
}

function Sparkline({
  data,
  stroke,
  fill,
  width = 86,
  height = 28,
}: {
  data: number[];
  stroke: string;
  fill: string;
  width?: number;
  height?: number;
}): ReactElement | null {
  const gid = useId();
  if (data.length < 2) return null;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const step = width / (data.length - 1);
  const points = data.map<[number, number]>((v, i) => [i * step, height - ((v - min) / range) * (height - 4) - 2]);
  const d = points.map((p, i) => `${i === 0 ? "M" : "L"}${p[0].toFixed(2)},${p[1].toFixed(2)}`).join(" ");
  const areaD = `${d} L ${width},${height} L 0,${height} Z`;
  const last = points[points.length - 1] ?? [0, 0];
  return (
    <svg width={width} height={height} className="block overflow-visible" aria-hidden>
      <defs>
        <linearGradient id={`sg-${gid}`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={fill} stopOpacity="0.35" />
          <stop offset="100%" stopColor={fill} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={areaD} fill={`url(#sg-${gid})`} />
      <path d={d} fill="none" stroke={stroke} strokeWidth={1.75} strokeLinejoin="round" strokeLinecap="round" />
      <circle cx={last[0]} cy={last[1]} r={2.5} fill={stroke} />
    </svg>
  );
}

interface KpiCardProps {
  label: string;
  value: string;
  accent: KpiAccent;
  icon: ReactElement<SVGProps<SVGSVGElement>>;
  deltaPct: number;
  deltaAbsLabel: string;
  vsLabel: string;
  spark: number[];
}

function KpiCard({ label, value, accent, icon, deltaPct, deltaAbsLabel, vsLabel, spark }: KpiCardProps): ReactElement {
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

interface RevenueChartProps {
  data: DashboardChartPoint[];
  revenueLabel: string;
  expensesLabel: string;
  profitLabel: string;
}

function RevenueChart({ data, revenueLabel, expensesLabel, profitLabel }: RevenueChartProps): ReactElement {
  const [hover, setHover] = useState<number | null>(null);
  const gid = useId();
  const intl = useIntl();
  const W = 720;
  const H = 240;
  const pad = { t: 16, r: 16, b: 28, l: 44 };
  const iw = W - pad.l - pad.r;
  const ih = H - pad.t - pad.b;

  const max = data.length > 0 ? Math.max(...data.flatMap((d) => [d.revenue, d.expenses])) * 1.1 : 1;
  const xStep = data.length > 0 ? iw / data.length : iw;
  function xCenter(i: number): number {
    return pad.l + xStep * i + xStep / 2;
  }
  function yScale(v: number): number {
    return pad.t + ih - (v / max) * ih;
  }

  const grid = Array.from({ length: 5 }, (_, i) => (i * max) / 4);

  const revenuePts = data.map<[number, number]>((d, i) => [xCenter(i), yScale(d.revenue)]);
  const expensePts = data.map<[number, number]>((d, i) => [xCenter(i), yScale(d.expenses)]);

  function smoothPath(pts: Array<[number, number]>): string {
    if (pts.length < 2) return "";
    const first = pts[0]!;
    let path = `M ${first[0]} ${first[1]}`;
    for (let i = 1; i < pts.length; i++) {
      const prev = pts[i - 1]!;
      const curr = pts[i]!;
      const cx = (prev[0] + curr[0]) / 2;
      path += ` C ${cx} ${prev[1]}, ${cx} ${curr[1]}, ${curr[0]} ${curr[1]}`;
    }
    return path;
  }

  const revenueLine = smoothPath(revenuePts);
  const revenueFirst = revenuePts[0];
  const revenueLast = revenuePts[revenuePts.length - 1];
  const revenueArea =
    revenueFirst && revenueLast
      ? `${revenueLine} L ${revenueLast[0]} ${pad.t + ih} L ${revenueFirst[0]} ${pad.t + ih} Z`
      : "";
  const expenseLine = smoothPath(expensePts);

  function handleMouseMove(e: React.MouseEvent<SVGSVGElement>): void {
    const r = e.currentTarget.getBoundingClientRect();
    const xRaw = (e.clientX - r.left) * (W / r.width);
    const rel = xRaw - pad.l;
    let i = Math.round((rel - xStep / 2) / xStep);
    i = Math.max(0, Math.min(data.length - 1, i));
    setHover(i);
  }

  const hovered = hover != null ? data[hover] : null;
  const hoverProfit = hovered ? hovered.revenue - hovered.expenses : 0;
  const tooltipLeftPct = hover != null ? (xCenter(hover) / W) * 100 : 0;

  return (
    <div className="relative">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="block w-full overflow-visible"
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setHover(null)}
        role="img"
        aria-label={intl.formatMessage({
          description: "RevenueChart - accessible label for the revenue vs expenses chart",
          defaultMessage: "Revenue and expenses chart",
          id: "Wu04Y5",
        })}
      >
        <defs>
          <linearGradient id={`rev-area-${gid}`} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.28" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
          </linearGradient>
          <linearGradient id={`bar-rev-${gid}`} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="1" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.75" />
          </linearGradient>
          <linearGradient id={`bar-exp-${gid}`} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="var(--success)" stopOpacity="1" />
            <stop offset="100%" stopColor="var(--success)" stopOpacity="0.7" />
          </linearGradient>
        </defs>

        {grid.map((g, i) => (
          <g key={i}>
            <line
              x1={pad.l}
              x2={pad.l + iw}
              y1={yScale(g)}
              y2={yScale(g)}
              stroke="var(--border)"
              strokeDasharray="3 4"
            />
            <text
              x={pad.l - 8}
              y={yScale(g) + 3}
              fontSize="10"
              className="font-mono"
              fill="var(--muted)"
              textAnchor="end"
            >
              {formatCompactDollars(Math.round(g))}
            </text>
          </g>
        ))}

        {data.map((d, i) => {
          const bw = Math.min(16, xStep * 0.36);
          const gap = 2;
          const xr = xCenter(i) - bw - gap / 2;
          const xe = xCenter(i) + gap / 2;
          const yr = yScale(d.revenue);
          const ye = yScale(d.expenses);
          const hr = pad.t + ih - yr;
          const he = pad.t + ih - ye;
          const isHover = hover === i;
          return (
            <g key={d.label}>
              <rect
                x={xr}
                y={yr}
                width={bw}
                height={hr}
                rx={3}
                fill={`url(#bar-rev-${gid})`}
                opacity={isHover ? 1 : 0.85}
              />
              <rect
                x={xe}
                y={ye}
                width={bw}
                height={he}
                rx={3}
                fill={`url(#bar-exp-${gid})`}
                opacity={isHover ? 1 : 0.85}
              />
            </g>
          );
        })}

        {revenueArea && <path d={revenueArea} fill={`url(#rev-area-${gid})`} style={{ mixBlendMode: "screen" }} />}
        {revenueLine && <path d={revenueLine} fill="none" stroke="var(--accent)" strokeWidth={2} />}
        {expenseLine && (
          <path
            d={expenseLine}
            fill="none"
            stroke="var(--success)"
            strokeWidth={2}
            strokeDasharray="4 3"
            opacity={0.8}
          />
        )}

        {data.map((d, i) => (
          <text
            key={d.label}
            x={xCenter(i)}
            y={H - 8}
            fontSize="11"
            textAnchor="middle"
            fill={hover === i ? "var(--foreground)" : "var(--muted)"}
            className={hover === i ? "font-semibold" : ""}
          >
            {d.label}
          </text>
        ))}

        {hover != null && (
          <g>
            <line
              x1={xCenter(hover)}
              x2={xCenter(hover)}
              y1={pad.t}
              y2={pad.t + ih}
              stroke="var(--foreground)"
              strokeOpacity="0.2"
              strokeDasharray="3 3"
            />
            <circle
              cx={xCenter(hover)}
              cy={yScale(data[hover]!.revenue)}
              r={4}
              fill="white"
              stroke="var(--accent)"
              strokeWidth={2}
            />
            <circle
              cx={xCenter(hover)}
              cy={yScale(data[hover]!.expenses)}
              r={4}
              fill="white"
              stroke="var(--success)"
              strokeWidth={2}
            />
          </g>
        )}
      </svg>

      {hovered && (
        <div
          className="border-border bg-surface-secondary pointer-events-none absolute top-2 min-w-[170px] -translate-x-1/2 rounded-lg border p-3 text-xs shadow-xl"
          style={{ left: `${tooltipLeftPct}%` }}
          role="tooltip"
        >
          <div className="text-default-400 mb-1.5 text-[11px]">{hovered.label}</div>
          <div className="mb-1 flex justify-between gap-4">
            <span className="flex items-center gap-1.5">
              <span className="bg-accent h-2 w-2 rounded-sm" />
              {revenueLabel}
            </span>
            <span className="font-mono font-semibold">{formatCurrency(hovered.revenue)}</span>
          </div>
          <div className="mb-1 flex justify-between gap-4">
            <span className="flex items-center gap-1.5">
              <span className="bg-success h-2 w-2 rounded-sm" />
              {expensesLabel}
            </span>
            <span className="font-mono font-semibold">{formatCurrency(hovered.expenses)}</span>
          </div>
          <div className="border-border mt-1 flex justify-between gap-4 border-t pt-1.5">
            <span className="text-default-400">{profitLabel}</span>
            <span className="text-success font-mono font-semibold">{formatCurrency(hoverProfit)}</span>
          </div>
        </div>
      )}
    </div>
  );
}

function Gauge({ value, total, subLabel }: { value: number; total: number; subLabel: string }): ReactElement {
  const pct = total > 0 ? Math.max(0, Math.min(1, value / total)) : 0;
  const size = 132;
  const stroke = 12;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const off = c * (1 - pct);
  const gid = useId();
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size}>
        <defs>
          <linearGradient id={`gauge-${gid}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.8" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="1" />
          </linearGradient>
        </defs>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--border)" strokeWidth={stroke} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={`url(#gauge-${gid})`}
          strokeWidth={stroke}
          strokeDasharray={c}
          strokeDashoffset={off}
          strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          className="[transition:stroke-dashoffset_800ms_cubic-bezier(.2,.9,.2,1)]"
        />
      </svg>
      <div className="absolute inset-0 grid place-items-center text-center">
        <div>
          <div className="font-mono text-3xl font-semibold tracking-tight tabular-nums">{Math.round(pct * 100)}%</div>
          <div className="text-default-500 mt-0.5 text-[11px]">{subLabel}</div>
        </div>
      </div>
    </div>
  );
}

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

function PageHeader(): ReactElement {
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
              description: "DashboardView: eyebrow - workspace",
              defaultMessage: "Workspace · Production",
              id: "ijAw/9",
            })}
          </span>
          <span className="bg-default-400 h-[3px] w-[3px] rounded-full" />
          <span className="normal-case">{dateStr}</span>
        </div>
        <div className="flex items-baseline gap-3">
          <h1 className="from-accent to-danger bg-gradient-to-r bg-clip-text text-2xl font-bold tracking-tight text-transparent md:text-3xl">
            {intl.formatMessage({
              description: "DashboardView: heading - page title",
              defaultMessage: "Dashboard",
              id: "85eYbc",
            })}
          </h1>
          <span className="text-default-500 text-sm">
            {intl.formatMessage({
              description: "DashboardView: body - page subtitle",
              defaultMessage: "Your metrics at a glance",
              id: "PhMzf3",
            })}
          </span>
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <Chip size="sm" variant="soft" color="success" className="gap-1.5">
            <span className="bg-success h-1.5 w-1.5 rounded-full shadow-[0_0_0_3px_rgba(23,201,100,0.2)]" />
            {intl.formatMessage({
              description: "DashboardView: chip - systems operational",
              defaultMessage: "All systems operational",
              id: "CjLsTB",
            })}
          </Chip>
          <Chip size="sm" variant="soft" color="accent" className="gap-1.5">
            <SparklesIcon className="h-3 w-3" />
            {intl.formatMessage({
              description: "DashboardView: chip - insights",
              defaultMessage: "3 insights this week",
              id: "r1RZIq",
            })}
          </Chip>
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        <Button variant="outline" size="sm">
          <CalendarDaysIcon className="mr-1.5 h-4 w-4" />
          {intl.formatMessage({
            description: "DashboardView: button - date range",
            defaultMessage: "Apr 1 – 30, 2026",
            id: "eBNTIp",
          })}
        </Button>
        <Button variant="outline" size="sm">
          <FunnelIcon className="mr-1.5 h-4 w-4" />
          {intl.formatMessage({
            description: "DashboardView: button - filters",
            defaultMessage: "Filters",
            id: "wFtF7P",
          })}
        </Button>
        <Button variant="primary" size="sm">
          <ArrowDownTrayIcon className="mr-1.5 h-4 w-4" />
          {intl.formatMessage({
            description: "DashboardView: button - export report",
            defaultMessage: "Export report",
            id: "dZLY/S",
          })}
        </Button>
      </div>
    </div>
  );
}

function InsightBanner(): ReactElement {
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
              description: "DashboardView: banner - insight headline",
              defaultMessage: "Revenue is {pct} above target this month, driven by {driver}.",
              id: "mHTUUg",
            },
            {
              pct: <span className="text-accent font-medium">20.1%</span>,
              driver: <span className="font-medium">38% lift in enterprise plan conversions</span>,
            }
          )}
        </div>
        <div className="text-default-500 text-xs">
          {intl.formatMessage({
            description: "DashboardView: banner - insight subtext",
            defaultMessage:
              "Conversion rate slipped 0.3pp — likely attributable to the new pricing page A/B test. Consider reviewing variant B.",
            id: "F8H7Ik",
          })}
        </div>
      </div>
      <div className="flex items-center gap-1">
        <Button variant="secondary" size="sm">
          {intl.formatMessage({
            description: "DashboardView: button - view analysis",
            defaultMessage: "View analysis",
            id: "mt5eZb",
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

interface RevenuePanelProps {
  chartData: DashboardChartPoint[];
}

function RevenuePanel({ chartData }: RevenuePanelProps): ReactElement {
  const intl = useIntl();
  const [range, setRange] = useState<RangeValue>("6m");
  const slice = useMemo(() => sliceByRange(chartData, range), [chartData, range]);

  const totals = useMemo(() => {
    const revenue = slice.reduce((s, d) => s + d.revenue, 0);
    const expenses = slice.reduce((s, d) => s + d.expenses, 0);
    const profit = revenue - expenses;
    const margin = revenue > 0 ? (profit / revenue) * 100 : 0;
    return { revenue, expenses, profit, margin };
  }, [slice]);

  const revenueLabel = intl.formatMessage({
    description: "DashboardView: legend - revenue",
    defaultMessage: "Revenue",
    id: "FhZWH2",
  });
  const expensesLabel = intl.formatMessage({
    description: "DashboardView: legend - expenses",
    defaultMessage: "Expenses",
    id: "KN6GsM",
  });
  const profitLabel = intl.formatMessage({
    description: "DashboardView: label - profit margin",
    defaultMessage: "Profit margin",
    id: "KLutwQ",
  });

  return (
    <Card variant="secondary" className="col-span-1 md:col-span-2">
      <Card.Header className="flex flex-col items-start justify-between gap-3 md:flex-row md:items-center">
        <div>
          <div className="flex items-center gap-2">
            <Card.Title>
              {intl.formatMessage({
                description: "DashboardView: heading - revenue overview",
                defaultMessage: "Revenue overview",
                id: "cjdejT",
              })}
            </Card.Title>
            <Chip size="sm" variant="soft" color="accent">
              {intl.formatMessage({
                description: "DashboardView: chip - live",
                defaultMessage: "Live",
                id: "0AEsFX",
              })}
            </Chip>
          </div>
          <Card.Description>
            {intl.formatMessage(
              {
                description: "DashboardView: body - revenue overview description",
                defaultMessage:
                  "Monthly revenue vs expenses · trailing {count, plural, one {# month} other {# months}}",
                id: "KjUj2Y",
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
                description: "DashboardView: body - revenue yoy",
                defaultMessage: "+14.2% YoY",
                id: "ETGxOW",
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
                description: "DashboardView: body - expenses yoy",
                defaultMessage: "+6.1% YoY",
                id: "YS5oFC",
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
                description: "DashboardView: body - profit margin hint",
                defaultMessage: "healthy range",
                id: "u4HDCd",
              })}
            </div>
          </div>
        </div>

        <RevenueChart
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
              description: "DashboardView: hint - hover for details",
              defaultMessage: "Hover for details",
              id: "owTgMQ",
            })}
          </span>
        </div>
      </Card.Content>
    </Card>
  );
}

interface EngagementPanelProps {
  stats: DashboardStats;
  cohorts: DashboardCohort[];
  channels: DashboardChannel[];
}

function EngagementPanel({ stats, cohorts, channels }: EngagementPanelProps): ReactElement {
  const intl = useIntl();

  function cohortLabel(key: DashboardCohort["key"]): string {
    if (key === "dau") {
      return intl.formatMessage({
        description: "DashboardView: label - daily active",
        defaultMessage: "Daily active",
        id: "Ol4/FB",
      });
    }
    if (key === "wau") {
      return intl.formatMessage({
        description: "DashboardView: label - weekly active",
        defaultMessage: "Weekly active",
        id: "5/NilI",
      });
    }
    return intl.formatMessage({
      description: "DashboardView: label - monthly active",
      defaultMessage: "Monthly active",
      id: "9Lz02x",
    });
  }

  function channelLabel(key: DashboardChannel["key"]): string {
    switch (key) {
      case "direct":
        return intl.formatMessage({
          description: "DashboardView: label - direct channel",
          defaultMessage: "Direct",
          id: "ddJbpB",
        });
      case "organic":
        return intl.formatMessage({
          description: "DashboardView: label - organic channel",
          defaultMessage: "Organic",
          id: "STQ+jD",
        });
      case "referral":
        return intl.formatMessage({
          description: "DashboardView: label - referral channel",
          defaultMessage: "Referral",
          id: "0kOUih",
        });
      case "paid":
        return intl.formatMessage({
          description: "DashboardView: label - paid channel",
          defaultMessage: "Paid",
          id: "eU6B5a",
        });
      default:
        return intl.formatMessage({
          description: "DashboardView: label - other channel",
          defaultMessage: "Other",
          id: "WlwK0N",
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
              description: "DashboardView: heading - engagement card",
              defaultMessage: "Engagement",
              id: "VN5AGV",
            })}
          </Card.Title>
          <Card.Description>
            {intl.formatMessage({
              description: "DashboardView: body - engagement description",
              defaultMessage: "Activation funnel and channels",
              id: "d73Vs2",
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
              description: "DashboardView: gauge - active rate",
              defaultMessage: "active rate",
              id: "lh2Xzq",
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
                description: "DashboardView: heading - acquisition channels",
                defaultMessage: "Acquisition channels",
                id: "jIQZ+1",
              })}
            </span>
            <span className="font-mono normal-case">
              {intl.formatMessage(
                {
                  description: "DashboardView: label - total users count",
                  defaultMessage: "{count} users",
                  id: "zO8ol5",
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

interface TransactionsPanelProps {
  transactions: DashboardTransaction[];
}

type TxFilter = "all" | "completed" | "pending" | "refunded";
type SortKey = "name" | "amount" | "date";
type SortDir = "asc" | "desc";

const AVATAR_COLORS = [
  "bg-accent/20 text-accent",
  "bg-success/20 text-success",
  "bg-warning/20 text-warning",
  "bg-danger/20 text-danger",
  "bg-violet-500/20 text-violet-400",
];

function avatarColor(seed: string): string {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
  return AVATAR_COLORS[hash % AVATAR_COLORS.length] ?? AVATAR_COLORS[0]!;
}

function avatarInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .filter(Boolean)
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function TransactionsPanel({ transactions }: TransactionsPanelProps): ReactElement {
  const intl = useIntl();
  const [filter, setFilter] = useState<TxFilter>("all");
  const [sort, setSort] = useState<{ key: SortKey; dir: SortDir }>({ key: "date", dir: "desc" });
  const [query, setQuery] = useState("");

  const counts = useMemo(
    () =>
      transactions.reduce<Record<string, number>>((acc, t) => {
        acc[t.status] = (acc[t.status] || 0) + 1;
        return acc;
      }, {}),
    [transactions]
  );

  const filtered = useMemo(() => {
    return transactions
      .filter((t) => filter === "all" || t.status === filter)
      .filter((t) => !query || `${t.customer}${t.email}${t.id}`.toLowerCase().includes(query.toLowerCase()))
      .slice()
      .sort((a, b) => {
        const dir = sort.dir === "asc" ? 1 : -1;
        if (sort.key === "amount") return (a.amount - b.amount) * dir;
        if (sort.key === "date") return (a.date < b.date ? -1 : 1) * dir;
        return a.customer.localeCompare(b.customer) * dir;
      });
  }, [transactions, filter, query, sort]);

  function filterLabel(f: TxFilter): string {
    switch (f) {
      case "all":
        return intl.formatMessage({
          description: "DashboardView: filter - all",
          defaultMessage: "All",
          id: "qGsOBP",
        });
      case "completed":
        return intl.formatMessage({
          description: "DashboardView: filter - completed",
          defaultMessage: "Completed",
          id: "45M5du",
        });
      case "pending":
        return intl.formatMessage({
          description: "DashboardView: filter - pending",
          defaultMessage: "Pending",
          id: "zFl53A",
        });
      case "refunded":
      default:
        return intl.formatMessage({
          description: "DashboardView: filter - refunded",
          defaultMessage: "Refunded",
          id: "Pi1rzm",
        });
    }
  }

  function statusChip(status: string): ReactElement {
    if (status === "completed") {
      return (
        <Chip size="sm" variant="soft" color="success" className="gap-1">
          <CheckIcon className="h-3 w-3" />
          {filterLabel("completed")}
        </Chip>
      );
    }
    if (status === "pending") {
      return (
        <Chip size="sm" variant="soft" color="warning" className="gap-1">
          <ClockIcon className="h-3 w-3" />
          {filterLabel("pending")}
        </Chip>
      );
    }
    return (
      <Chip size="sm" variant="soft" color="default" className="gap-1">
        <XMarkIcon className="h-3 w-3" />
        {filterLabel("refunded")}
      </Chip>
    );
  }

  function sortHeader(key: SortKey, label: string, right?: boolean): ReactElement {
    return (
      <button
        type="button"
        onClick={() => setSort((s) => ({ key, dir: s.key === key && s.dir === "desc" ? "asc" : "desc" }))}
        className={`text-default-500 flex cursor-pointer items-center gap-1 text-[11px] font-medium tracking-wider uppercase select-none ${right ? "justify-end" : ""}`}
      >
        {label}
        {sort.key === key ? (
          sort.dir === "asc" ? (
            <ArrowUpIcon className="h-3 w-3" />
          ) : (
            <ArrowDownIcon className="h-3 w-3" />
          )
        ) : (
          <ChevronDownIcon className="h-3 w-3 opacity-30" />
        )}
      </button>
    );
  }

  const gridTemplate = "minmax(0,2fr) minmax(0,1fr) minmax(0,1fr) minmax(0,1.2fr) 40px";

  return (
    <Card variant="secondary" className="col-span-1 md:col-span-2">
      <Card.Header className="flex flex-col items-start justify-between gap-3 md:flex-row md:items-center">
        <div>
          <div className="flex items-center gap-2">
            <Card.Title>
              {intl.formatMessage({
                description: "DashboardView: heading - recent transactions",
                defaultMessage: "Recent transactions",
                id: "2A7Zrz",
              })}
            </Card.Title>
            <Chip size="sm" variant="soft" color="default">
              <span className="font-mono tabular-nums">{transactions.length}</span>
            </Chip>
          </div>
          <Card.Description>
            {intl.formatMessage({
              description: "DashboardView: body - transactions description",
              defaultMessage: "Last 7 days · auto-updates every 5 minutes",
              id: "SpAzX+",
            })}
          </Card.Description>
        </div>
        <div className="flex flex-wrap gap-2">
          <SearchField
            value={query}
            onChange={setQuery}
            placeholder={intl.formatMessage({
              description: "DashboardView: placeholder - search transactions",
              defaultMessage: "Search transactions…",
              id: "ikuBX+",
            })}
            ariaLabel={intl.formatMessage({
              description: "DashboardView: aria-label - search transactions",
              defaultMessage: "Search transactions",
              id: "AxP+Su",
            })}
            className="w-56"
          />
          <Button variant="outline" size="sm">
            <ArrowDownTrayIcon className="mr-1.5 h-4 w-4" />
            {intl.formatMessage({
              description: "DashboardView: button - export",
              defaultMessage: "Export",
              id: "P+lP4E",
            })}
          </Button>
          <Button variant="primary" size="sm">
            <PlusIcon className="mr-1.5 h-4 w-4" />
            {intl.formatMessage({
              description: "DashboardView: button - new invoice",
              defaultMessage: "New invoice",
              id: "cAfcS9",
            })}
          </Button>
        </div>
      </Card.Header>
      <Card.Content>
        <div className="border-border mb-2 flex flex-wrap gap-1.5 border-b pb-3">
          {(["all", "completed", "pending", "refunded"] as TxFilter[]).map((p) => {
            const count = p === "all" ? transactions.length : counts[p] || 0;
            const active = filter === p;
            return (
              <button
                key={p}
                type="button"
                onClick={() => setFilter(p)}
                className={`inline-flex h-7 items-center gap-1.5 rounded-lg border px-2.5 text-xs font-medium transition ${
                  active
                    ? "border-accent/30 bg-accent/10 text-accent"
                    : "border-border text-default-500 hover:text-foreground"
                }`}
              >
                {filterLabel(p)}
                <span className="font-mono tabular-nums opacity-70">{count}</span>
              </button>
            );
          })}
        </div>

        <div className="-mx-3 overflow-x-auto md:mx-0">
          <div className="min-w-[720px]">
            <div
              className="text-default-500 grid items-center gap-4 px-3 py-2.5"
              style={{ gridTemplateColumns: gridTemplate }}
            >
              {sortHeader(
                "name",
                intl.formatMessage({
                  description: "DashboardView: column - customer",
                  defaultMessage: "Customer",
                  id: "bvkeYx",
                })
              )}
              {sortHeader(
                "amount",
                intl.formatMessage({
                  description: "DashboardView: column - amount",
                  defaultMessage: "Amount",
                  id: "fZdIvY",
                }),
                true
              )}
              <div className="text-[11px] font-medium tracking-wider uppercase">
                {intl.formatMessage({
                  description: "DashboardView: column - status",
                  defaultMessage: "Status",
                  id: "23nxH1",
                })}
              </div>
              {sortHeader(
                "date",
                intl.formatMessage({
                  description: "DashboardView: column - date",
                  defaultMessage: "Date",
                  id: "Q7eVeF",
                })
              )}
              <div />
            </div>

            <div>
              {filtered.map((t) => (
                <div
                  key={t.id}
                  className="border-border hover:bg-surface-tertiary/50 grid cursor-pointer items-center gap-4 border-t px-3 py-3 transition"
                  style={{ gridTemplateColumns: gridTemplate }}
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <Avatar size="sm" className={avatarColor(t.customer)}>
                      <Avatar.Fallback>{avatarInitials(t.customer)}</Avatar.Fallback>
                    </Avatar>
                    <div className="min-w-0">
                      <div className="truncate text-sm font-medium">{t.customer}</div>
                      <div className="text-default-400 truncate text-[11px]">{t.email}</div>
                    </div>
                  </div>
                  <div className="text-right font-mono text-sm font-semibold tracking-tight tabular-nums">
                    ${t.amount.toFixed(2)}
                  </div>
                  <div>{statusChip(t.status)}</div>
                  <div className="text-default-500 font-mono text-xs">
                    {t.date} <span className="text-default-400 ml-1">· {t.id}</span>
                  </div>
                  <div className="grid place-items-center">
                    <Button variant="ghost" size="sm" isIconOnly aria-label="Row actions">
                      <EllipsisHorizontalIcon className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="border-border mt-3 flex items-center justify-between border-t pt-3">
          <div className="text-default-500 text-xs">
            {intl.formatMessage(
              {
                description: "DashboardView: body - transactions pagination count",
                defaultMessage: "Showing {shown} of {total} transactions",
                id: "qEI87z",
              },
              {
                shown: <span className="text-foreground font-mono">{filtered.length}</span>,
                total: <span className="text-foreground font-mono">{transactions.length}</span>,
              }
            )}
          </div>
          <div className="flex gap-1">
            <Button variant="outline" size="sm">
              {intl.formatMessage({
                description: "DashboardView: button - previous page",
                defaultMessage: "Previous",
                id: "4mUZa/",
              })}
            </Button>
            <Button variant="outline" size="sm">
              {intl.formatMessage({
                description: "DashboardView: button - next page",
                defaultMessage: "Next",
                id: "rJOUvg",
              })}
              <ChevronDownIcon className="ml-1 h-3 w-3 -rotate-90" />
            </Button>
          </div>
        </div>
      </Card.Content>
    </Card>
  );
}

function ActivityPanel({ activity }: { activity: DashboardActivity[] }): ReactElement {
  const intl = useIntl();

  return (
    <Card variant="secondary">
      <Card.Header className="flex-row items-start justify-between">
        <div>
          <Card.Title>
            {intl.formatMessage({
              description: "DashboardView: heading - activity feed",
              defaultMessage: "Activity feed",
              id: "FJKrvh",
            })}
          </Card.Title>
          <Card.Description>
            {intl.formatMessage({
              description: "DashboardView: body - activity description",
              defaultMessage: "System + account events",
              id: "OD+Nbe",
            })}
          </Card.Description>
        </div>
        <Chip size="sm" variant="soft" color="default">
          {intl.formatMessage(
            {
              description: "DashboardView: chip - new activity count",
              defaultMessage: "{count} new",
              id: "+D5K4N",
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
            description: "DashboardView: button - view all activity",
            defaultMessage: "View all activity",
            id: "mIxf0V",
          })}
          <ArrowRightIcon className="ml-1.5 h-3 w-3" />
        </Button>
      </Card.Content>
    </Card>
  );
}

function kpiBy(kpis: DashboardKpi[], id: DashboardKpiId): DashboardKpi | undefined {
  return kpis.find((k) => k.id === id);
}

function formatDeltaAbs(kpi: DashboardKpi | undefined): string {
  if (!kpi) return "";
  const sign = kpi.deltaAbs >= 0 ? "+" : "-";
  const abs = Math.abs(kpi.deltaAbs);
  if (kpi.id === "revenue") return `${sign}$${abs.toLocaleString()}`;
  if (kpi.id === "conversion") return `${kpi.deltaAbs >= 0 ? "+" : ""}${kpi.deltaAbs.toFixed(1)}pp`;
  return `${sign}${abs.toLocaleString()}`;
}

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
      <PageHeader />
      <div className="h-5" />
      <InsightBanner />

      <div className="mt-4 flex flex-col gap-4">
        <h2 className="sr-only">
          {intl.formatMessage({
            description: "DashboardView: heading - key metrics section (sr-only)",
            defaultMessage: "Key Metrics",
            id: "M5ptc6",
          })}
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <KpiCard
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
          <KpiCard
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
          <KpiCard
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
          <KpiCard
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
          <RevenuePanel chartData={chartData} />
          <EngagementPanel stats={stats} cohorts={cohorts} channels={channels} />
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <TransactionsPanel transactions={recentTransactions} />
          <ActivityPanel activity={activity} />
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
