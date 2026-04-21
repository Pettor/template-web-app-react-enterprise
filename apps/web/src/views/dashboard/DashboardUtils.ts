import type { DashboardChartPoint, DashboardKpi, DashboardKpiId } from "@package/api";

export const RANGE_TABS = ["30d", "3m", "6m", "12m"] as const;
export type RangeValue = (typeof RANGE_TABS)[number];

export function sliceByRange(data: DashboardChartPoint[], range: RangeValue): DashboardChartPoint[] {
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

export function formatCurrency(value: number): string {
  return `$${value.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
}

export function formatCompactDollars(value: number): string {
  return value >= 1000 ? `$${(value / 1000).toFixed(0)}k` : `$${value}`;
}

export function kpiBy(kpis: DashboardKpi[], id: DashboardKpiId): DashboardKpi | undefined {
  return kpis.find((k) => k.id === id);
}

export function formatDeltaAbs(kpi: DashboardKpi | undefined): string {
  if (!kpi) return "";
  const sign = kpi.deltaAbs >= 0 ? "+" : "-";
  const abs = Math.abs(kpi.deltaAbs);
  if (kpi.id === "revenue") return `${sign}$${abs.toLocaleString()}`;
  if (kpi.id === "conversion") return `${kpi.deltaAbs >= 0 ? "+" : ""}${kpi.deltaAbs.toFixed(1)}pp`;
  return `${sign}${abs.toLocaleString()}`;
}

export const AVATAR_COLORS = [
  "bg-accent/20 text-accent",
  "bg-success/20 text-success",
  "bg-warning/20 text-warning",
  "bg-danger/20 text-danger",
  "bg-violet-500/20 text-violet-400",
];

export function avatarColor(seed: string): string {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
  return AVATAR_COLORS[hash % AVATAR_COLORS.length] ?? AVATAR_COLORS[0]!;
}

export function avatarInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .filter(Boolean)
    .join("")
    .toUpperCase()
    .slice(0, 2);
}
