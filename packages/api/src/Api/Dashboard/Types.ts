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

export const dashboardDataSchema = z.object({
  stats: dashboardStatsSchema,
  chartData: z.array(dashboardChartPointSchema),
  recentTransactions: z.array(dashboardTransactionSchema),
});

export type DashboardDataDto = z.infer<typeof dashboardDataSchema>;

// Domain shapes match the wire DTOs today; aliases keep a single source of truth
// while preserving the domain-vs-DTO boundary for future divergence.
export type DashboardStats = DashboardStatsDto;
export type DashboardChartPoint = DashboardChartPointDto;
export type DashboardTransaction = DashboardTransactionDto;
export type DashboardData = DashboardDataDto;
