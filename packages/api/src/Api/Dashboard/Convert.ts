import type { DashboardData, DashboardDataDto } from "./Types";

export function dashboardConvertFromDto(dto: DashboardDataDto): DashboardData {
  return {
    stats: {
      totalRevenue: dto.stats.totalRevenue,
      totalUsers: dto.stats.totalUsers,
      activeUsers: dto.stats.activeUsers,
      conversionRate: dto.stats.conversionRate,
    },
    chartData: dto.chartData.map((point) => ({
      label: point.label,
      revenue: point.revenue,
      expenses: point.expenses,
    })),
    recentTransactions: dto.recentTransactions.map((tx) => ({
      id: tx.id,
      customer: tx.customer,
      email: tx.email,
      amount: tx.amount,
      status: tx.status,
      date: tx.date,
    })),
  };
}
