import type { ReactElement } from "react";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  CheckIcon,
  ChevronDownIcon,
  ClockIcon,
  EllipsisHorizontalIcon,
  PlusIcon,
  XMarkIcon,
} from "@heroicons/react/20/solid";
import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";
import { Avatar, Button, Card, Chip } from "@heroui/react";
import type { DashboardTransaction } from "@package/api";
import { useIntl } from "react-intl";
import { SearchField } from "~/components/input/input-field/SearchField";
import { avatarColor, avatarInitials } from "~/views/dashboard/DashboardUtils";
import { UseTransactionsPanel } from "~/views/dashboard/UseTransactionsPanel";
import type { SortKey, TxFilter } from "~/views/dashboard/UseTransactionsPanel";

export interface DashboardTransactionsPanelProps {
  transactions: DashboardTransaction[];
}

export function DashboardTransactionsPanel({ transactions }: DashboardTransactionsPanelProps): ReactElement {
  const intl = useIntl();
  const { filter, setFilter, sort, toggleSort, query, setQuery, filtered, counts } = UseTransactionsPanel(transactions);

  function filterLabel(f: TxFilter): string {
    switch (f) {
      case "all":
        return intl.formatMessage({
          description: "DashboardTransactionsPanel: filter - all",
          defaultMessage: "All",
          id: "BcI9ak",
        });
      case "completed":
        return intl.formatMessage({
          description: "DashboardTransactionsPanel: filter - completed",
          defaultMessage: "Completed",
          id: "9P0nJf",
        });
      case "pending":
        return intl.formatMessage({
          description: "DashboardTransactionsPanel: filter - pending",
          defaultMessage: "Pending",
          id: "LrbtfJ",
        });
      case "refunded":
      default:
        return intl.formatMessage({
          description: "DashboardTransactionsPanel: filter - refunded",
          defaultMessage: "Refunded",
          id: "g7IPV/",
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
        onClick={() => toggleSort(key)}
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
                description: "DashboardTransactionsPanel: heading - recent transactions",
                defaultMessage: "Recent transactions",
                id: "8KahZU",
              })}
            </Card.Title>
            <Chip size="sm" variant="soft" color="default">
              <span className="font-mono tabular-nums">{transactions.length}</span>
            </Chip>
          </div>
          <Card.Description>
            {intl.formatMessage({
              description: "DashboardTransactionsPanel: body - transactions description",
              defaultMessage: "Last 7 days · auto-updates every 5 minutes",
              id: "wIB2Wz",
            })}
          </Card.Description>
        </div>
        <div className="flex flex-wrap gap-2">
          <SearchField
            value={query}
            onChange={setQuery}
            placeholder={intl.formatMessage({
              description: "DashboardTransactionsPanel: placeholder - search transactions",
              defaultMessage: "Search transactions…",
              id: "OzxjDf",
            })}
            ariaLabel={intl.formatMessage({
              description: "DashboardTransactionsPanel: aria-label - search transactions",
              defaultMessage: "Search transactions",
              id: "/KtGoY",
            })}
            className="w-56"
          />
          <Button variant="outline" size="sm">
            <ArrowDownTrayIcon className="mr-1.5 h-4 w-4" />
            {intl.formatMessage({
              description: "DashboardTransactionsPanel: button - export",
              defaultMessage: "Export",
              id: "3iyyDt",
            })}
          </Button>
          <Button variant="primary" size="sm">
            <PlusIcon className="mr-1.5 h-4 w-4" />
            {intl.formatMessage({
              description: "DashboardTransactionsPanel: button - new invoice",
              defaultMessage: "New invoice",
              id: "rWZ/af",
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
                  description: "DashboardTransactionsPanel: column - customer",
                  defaultMessage: "Customer",
                  id: "EevQXc",
                })
              )}
              {sortHeader(
                "amount",
                intl.formatMessage({
                  description: "DashboardTransactionsPanel: column - amount",
                  defaultMessage: "Amount",
                  id: "4TOze5",
                }),
                true
              )}
              <div className="text-[11px] font-medium tracking-wider uppercase">
                {intl.formatMessage({
                  description: "DashboardTransactionsPanel: column - status",
                  defaultMessage: "Status",
                  id: "9TcAcI",
                })}
              </div>
              {sortHeader(
                "date",
                intl.formatMessage({
                  description: "DashboardTransactionsPanel: column - date",
                  defaultMessage: "Date",
                  id: "r+N32b",
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
                description: "DashboardTransactionsPanel: body - transactions pagination count",
                defaultMessage: "Showing {shown} of {total} transactions",
                id: "ujIDR9",
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
                description: "DashboardTransactionsPanel: button - previous page",
                defaultMessage: "Previous",
                id: "tY+15A",
              })}
            </Button>
            <Button variant="outline" size="sm">
              {intl.formatMessage({
                description: "DashboardTransactionsPanel: button - next page",
                defaultMessage: "Next",
                id: "Pvut60",
              })}
              <ChevronDownIcon className="ml-1 h-3 w-3 -rotate-90" />
            </Button>
          </div>
        </div>
      </Card.Content>
    </Card>
  );
}
