import { z } from "zod";

export const QUERY_KEY_DASHBOARD = ["dashboard"] as const;

export const dashboardStatsSchema = z.object({
  totalRevenue: z.number(),
  totalUsers: z.number(),
  activeUsers: z.number(),
  conversionRate: z.number(),
});

export type DashboardStatsDto = z.infer<typeof dashboardStatsSchema>;

export const dashboardChartPointSchema = z.object({
  label: z.string(),
  revenue: z.number(),
  expenses: z.number(),
});

export type DashboardChartPointDto = z.infer<typeof dashboardChartPointSchema>;

export const dashboardTransactionSchema = z.object({
  id: z.string(),
  customer: z.string(),
  email: z.string(),
  amount: z.number(),
  status: z.string(),
  date: z.string(),
});

export type DashboardTransactionDto = z.infer<typeof dashboardTransactionSchema>;

export const dashboardKpiIdSchema = z.enum(["revenue", "users", "active", "conversion"]);

export type DashboardKpiIdDto = z.infer<typeof dashboardKpiIdSchema>;

export const dashboardKpiSchema = z.object({
  id: dashboardKpiIdSchema,
  deltaPct: z.number(),
  deltaAbs: z.number(),
  spark: z.array(z.number()),
});

export type DashboardKpiDto = z.infer<typeof dashboardKpiSchema>;

export const dashboardCohortKeySchema = z.enum(["dau", "wau", "mau"]);

export const dashboardCohortSchema = z.object({
  key: dashboardCohortKeySchema,
  value: z.number(),
  total: z.number(),
});

export type DashboardCohortDto = z.infer<typeof dashboardCohortSchema>;

export const dashboardChannelKeySchema = z.enum(["direct", "organic", "referral", "paid", "other"]);

export const dashboardChannelSchema = z.object({
  key: dashboardChannelKeySchema,
  pct: z.number(),
});

export type DashboardChannelDto = z.infer<typeof dashboardChannelSchema>;

export const dashboardActivityColorSchema = z.enum(["success", "accent", "warning", "default"]);

export const dashboardActivitySchema = z.object({
  key: z.string(),
  title: z.string(),
  detail: z.string(),
  relativeTime: z.string(),
  color: dashboardActivityColorSchema,
});

export type DashboardActivityDto = z.infer<typeof dashboardActivitySchema>;

export const dashboardDataSchema = z.object({
  stats: dashboardStatsSchema,
  chartData: z.array(dashboardChartPointSchema),
  recentTransactions: z.array(dashboardTransactionSchema),
  kpis: z.array(dashboardKpiSchema),
  cohorts: z.array(dashboardCohortSchema),
  channels: z.array(dashboardChannelSchema),
  activity: z.array(dashboardActivitySchema),
});

export type DashboardDataDto = z.infer<typeof dashboardDataSchema>;

// Domain shapes match the wire DTOs today; aliases keep a single source of truth
// while preserving the domain-vs-DTO boundary for future divergence.
export type DashboardStats = DashboardStatsDto;
export type DashboardChartPoint = DashboardChartPointDto;
export type DashboardTransaction = DashboardTransactionDto;
export type DashboardKpiId = DashboardKpiIdDto;
export type DashboardKpi = DashboardKpiDto;
export type DashboardCohort = DashboardCohortDto;
export type DashboardChannel = DashboardChannelDto;
export type DashboardActivity = DashboardActivityDto;
export type DashboardData = DashboardDataDto;
