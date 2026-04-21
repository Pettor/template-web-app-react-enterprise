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
    kpis: dto.kpis.map((k) => ({
      id: k.id,
      deltaPct: k.deltaPct,
      deltaAbs: k.deltaAbs,
      spark: [...k.spark],
    })),
    cohorts: dto.cohorts.map((c) => ({
      key: c.key,
      value: c.value,
      total: c.total,
    })),
    channels: dto.channels.map((c) => ({
      key: c.key,
      pct: c.pct,
    })),
    activity: dto.activity.map((a) => ({
      key: a.key,
      title: a.title,
      detail: a.detail,
      relativeTime: a.relativeTime,
      color: a.color,
    })),
  };
}
