import type { ReactElement } from "react";
import {
  ArrowTrendingDownIcon,
  ArrowTrendingUpIcon,
  BanknotesIcon,
  ChartBarIcon,
  UserGroupIcon,
  UserIcon,
} from "@heroicons/react/20/solid";
import { Avatar, Card, Chip, ProgressCircle, Separator, Table } from "@heroui/react";
import type { DashboardChartPoint, DashboardStats, DashboardTransaction } from "@package/api";
import { NavbarLayout } from "@package/ui";
import { useIntl } from "react-intl";
import { NavbarContent, type NavbarContentProps } from "~/components/navigation/navbar-content";

export interface DashboardViewProps {
  navbarContentProps: NavbarContentProps;
  stats: DashboardStats;
  chartData: DashboardChartPoint[];
  recentTransactions: DashboardTransaction[];
}

function StatCard({
  title,
  value,
  icon,
  trend,
}: {
  title: string;
  value: string;
  icon: ReactElement;
  trend?: { value: string; positive: boolean };
}): ReactElement {
  return (
    <Card variant="secondary">
      <Card.Header className="flex-row items-center justify-between pb-2">
        <Card.Title className="text-sm font-medium">{title}</Card.Title>
        <span className="text-default-400">{icon}</span>
      </Card.Header>
      <Card.Content>
        <div className="text-2xl font-bold">{value}</div>
        {trend && (
          <div className="mt-1 flex items-center gap-1 text-xs">
            {trend.positive ? (
              <ArrowTrendingUpIcon className="text-success h-3 w-3" />
            ) : (
              <ArrowTrendingDownIcon className="text-danger h-3 w-3" />
            )}
            <span className={trend.positive ? "text-success" : "text-danger"}>{trend.value}</span>
          </div>
        )}
      </Card.Content>
    </Card>
  );
}

function RevenueChart({ data }: { data: DashboardChartPoint[] }): ReactElement {
  const maxValue = Math.max(...data.flatMap((d) => [d.revenue, d.expenses]));
  const chartHeight = 200;
  const yTicks = [0, Math.round(maxValue * 0.25), Math.round(maxValue * 0.5), Math.round(maxValue * 0.75), maxValue];

  function formatYLabel(val: number): string {
    return val >= 1000 ? `$${(val / 1000).toFixed(0)}k` : `$${val}`;
  }

  return (
    <Card variant="secondary" className="col-span-1 md:col-span-2">
      <Card.Header>
        <Card.Title>Revenue Overview</Card.Title>
        <Card.Description>Monthly revenue and expenses</Card.Description>
      </Card.Header>
      <Card.Content>
        <div className="flex">
          {/* Y-axis labels */}
          <div className="flex flex-col-reverse justify-between pr-2 text-right" style={{ height: chartHeight }}>
            {yTicks.map((tick) => (
              <span key={tick} className="text-default-400 text-[10px] leading-none">
                {formatYLabel(tick)}
              </span>
            ))}
          </div>

          {/* Chart area */}
          <div className="flex flex-1 flex-col">
            {/* Bars area with border */}
            <div className="border-default-200 flex items-end border-b border-l" style={{ height: chartHeight }}>
              {data.map((point) => (
                <div key={point.label} className="flex h-full flex-1 items-end justify-center gap-1 px-1">
                  <div
                    className="bg-accent min-h-1 w-3 min-w-2 rounded-md sm:w-4 md:w-5"
                    style={{ height: `${(point.revenue / maxValue) * 100}%` }}
                    title={`Revenue: $${point.revenue.toLocaleString()}`}
                  />
                  <div
                    className="bg-default-300 min-h-1 w-3 min-w-2 rounded-md sm:w-4 md:w-5"
                    style={{ height: `${(point.expenses / maxValue) * 100}%` }}
                    title={`Expenses: $${point.expenses.toLocaleString()}`}
                  />
                </div>
              ))}
            </div>

            {/* X-axis labels */}
            <div className="flex">
              {data.map((point) => (
                <div key={point.label} className="flex-1 text-center">
                  <span className="text-default-500 text-xs">{point.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="mt-4 flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1">
            <div className="bg-accent h-2 w-2 rounded-full" />
            <span>Revenue</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="bg-default-300 h-2 w-2 rounded-full" />
            <span>Expenses</span>
          </div>
        </div>
      </Card.Content>
    </Card>
  );
}

function ActiveUsersCard({ stats }: { stats: DashboardStats }): ReactElement {
  const activePercentage = Math.round((stats.activeUsers / stats.totalUsers) * 100);
  const inactiveUsers = stats.totalUsers - stats.activeUsers;

  return (
    <Card variant="secondary">
      <Card.Header>
        <Card.Title>Active Users</Card.Title>
        <Card.Description>
          {stats.activeUsers} of {stats.totalUsers} users
        </Card.Description>
      </Card.Header>
      <Card.Content className="flex flex-col gap-4">
        {/* Donut chart */}
        <div className="flex items-center justify-center py-2">
          <ProgressCircle
            aria-label="Active users percentage"
            value={activePercentage}
            color="accent"
            className="h-28 w-28"
          >
            <ProgressCircle.Track>
              <ProgressCircle.TrackCircle />
              <ProgressCircle.FillCircle />
            </ProgressCircle.Track>
            <span className="text-xl font-bold">{activePercentage}%</span>
          </ProgressCircle>
        </div>

        {/* Active rate */}
        <div className="flex justify-between text-sm">
          <span className="text-default-500">Active rate</span>
          <span className="font-medium">{activePercentage}%</span>
        </div>

        {/* Breakdown */}
        <Separator />
        <div className="flex flex-col gap-2 text-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="bg-accent h-2 w-2 rounded-full" />
              <span className="text-default-500">Active</span>
            </div>
            <span className="font-medium">{stats.activeUsers.toLocaleString()}</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="bg-default-300 h-2 w-2 rounded-full" />
              <span className="text-default-500">Inactive</span>
            </div>
            <span className="font-medium">{inactiveUsers.toLocaleString()}</span>
          </div>
        </div>
      </Card.Content>
    </Card>
  );
}

function TransactionsTable({ transactions }: { transactions: DashboardTransaction[] }): ReactElement {
  return (
    <Card variant="secondary" className="col-span-1 md:col-span-3">
      <Card.Header>
        <Card.Title>Recent Transactions</Card.Title>
        <Card.Description>Latest customer transactions</Card.Description>
      </Card.Header>
      <Card.Content>
        <Table aria-label="Recent transactions">
          <Table.Content>
            <Table.Header>
              <Table.Column isRowHeader>Customer</Table.Column>
              <Table.Column>Amount</Table.Column>
              <Table.Column>Status</Table.Column>
              <Table.Column>Date</Table.Column>
            </Table.Header>
            <Table.Body items={transactions}>
              {(tx) => (
                <Table.Row id={tx.id}>
                  <Table.Cell>
                    <div className="flex items-center gap-2">
                      <Avatar size="sm" variant="soft">
                        <Avatar.Fallback>
                          {tx.customer
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .toUpperCase()
                            .slice(0, 2)}
                        </Avatar.Fallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="text-sm font-medium">{tx.customer}</span>
                        <span className="text-default-400 hidden text-xs sm:inline">{tx.email}</span>
                      </div>
                    </div>
                  </Table.Cell>
                  <Table.Cell>
                    <span className="font-medium">${tx.amount.toFixed(2)}</span>
                  </Table.Cell>
                  <Table.Cell>
                    <Chip
                      size="sm"
                      variant="soft"
                      className="px-2"
                      color={tx.status === "completed" ? "success" : "warning"}
                    >
                      {tx.status.charAt(0).toUpperCase() + tx.status.slice(1)}
                    </Chip>
                  </Table.Cell>
                  <Table.Cell>
                    <span className="text-default-500 text-sm">{tx.date}</span>
                  </Table.Cell>
                </Table.Row>
              )}
            </Table.Body>
          </Table.Content>
        </Table>
      </Card.Content>
    </Card>
  );
}

export function DashboardView({
  navbarContentProps,
  stats,
  chartData,
  recentTransactions,
}: DashboardViewProps): ReactElement {
  const intl = useIntl();

  return (
    <NavbarLayout footer navbarElement={<NavbarContent {...navbarContentProps} />}>
      <div className="mx-auto w-full max-w-7xl px-4 py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold md:text-3xl">
            {intl.formatMessage({
              description: "DashboardView - Page title",
              defaultMessage: "Dashboard",
              id: "xWJ8VF",
            })}
          </h1>
          <p className="text-default-500 text-sm">
            {intl.formatMessage({
              description: "DashboardView - Page subtitle",
              defaultMessage: "Overview of your application metrics",
              id: "R5PlmL",
            })}
          </p>
        </div>

        <Separator className="mb-6" />

        {/* Stats cards */}
        <h2 className="sr-only">
          {intl.formatMessage({
            description: "DashboardView - Key metrics section heading",
            defaultMessage: "Key Metrics",
            id: "0MhjtM",
          })}
        </h2>
        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title={intl.formatMessage({
              description: "DashboardView - Total revenue label",
              defaultMessage: "Total Revenue",
              id: "FF0yKY",
            })}
            value={`$${stats.totalRevenue.toLocaleString()}`}
            icon={<BanknotesIcon className="h-5 w-5" />}
            trend={{ value: "+20.1%", positive: true }}
          />
          <StatCard
            title={intl.formatMessage({
              description: "DashboardView - Total users label",
              defaultMessage: "Total Users",
              id: "uP3pvm",
            })}
            value={stats.totalUsers.toLocaleString()}
            icon={<UserGroupIcon className="h-5 w-5" />}
            trend={{ value: "+180", positive: true }}
          />
          <StatCard
            title={intl.formatMessage({
              description: "DashboardView - Active users label",
              defaultMessage: "Active Users",
              id: "Fin8Qi",
            })}
            value={stats.activeUsers.toLocaleString()}
            icon={<UserIcon className="h-5 w-5" />}
            trend={{ value: "+19%", positive: true }}
          />
          <StatCard
            title={intl.formatMessage({
              description: "DashboardView - Conversion rate label",
              defaultMessage: "Conversion Rate",
              id: "nfa0S1",
            })}
            value={`${stats.conversionRate}%`}
            icon={<ChartBarIcon className="h-5 w-5" />}
            trend={{ value: "-2.1%", positive: false }}
          />
        </div>

        {/* Chart and active users */}
        <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
          <RevenueChart data={chartData} />
          <ActiveUsersCard stats={stats} />
        </div>

        {/* Transactions table */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <TransactionsTable transactions={recentTransactions} />
        </div>
      </div>
    </NavbarLayout>
  );
}
