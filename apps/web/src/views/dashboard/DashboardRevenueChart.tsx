import type { ReactElement } from "react";
import { useId, useState } from "react";
import type { DashboardChartPoint } from "@package/api";
import { useIntl } from "react-intl";
import { formatCompactDollars, formatCurrency } from "~/views/dashboard/DashboardUtils";

export interface DashboardRevenueChartProps {
  data: DashboardChartPoint[];
  revenueLabel: string;
  expensesLabel: string;
  profitLabel: string;
}

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

export function DashboardRevenueChart({
  data,
  revenueLabel,
  expensesLabel,
  profitLabel,
}: DashboardRevenueChartProps): ReactElement {
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
          description: "DashboardRevenueChart: accessible label for the revenue vs expenses chart",
          defaultMessage: "Revenue and expenses chart",
          id: "yBo+Jq",
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
