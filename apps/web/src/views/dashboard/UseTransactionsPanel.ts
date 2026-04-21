import { useMemo, useState } from "react";
import type { DashboardTransaction } from "@package/api";

export type TxFilter = "all" | "completed" | "pending" | "refunded";
export type SortKey = "name" | "amount" | "date";
export type SortDir = "asc" | "desc";

export interface TransactionsPanelState {
  filter: TxFilter;
  setFilter: (f: TxFilter) => void;
  sort: { key: SortKey; dir: SortDir };
  toggleSort: (key: SortKey) => void;
  query: string;
  setQuery: (q: string) => void;
  filtered: DashboardTransaction[];
  counts: Record<string, number>;
}

export function UseTransactionsPanel(transactions: DashboardTransaction[]): TransactionsPanelState {
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

  const filtered = useMemo(
    () =>
      transactions
        .filter((t) => filter === "all" || t.status === filter)
        .filter((t) => !query || `${t.customer}${t.email}${t.id}`.toLowerCase().includes(query.toLowerCase()))
        .slice()
        .sort((a, b) => {
          const dir = sort.dir === "asc" ? 1 : -1;
          if (sort.key === "amount") return (a.amount - b.amount) * dir;
          if (sort.key === "date") return (a.date < b.date ? -1 : 1) * dir;
          return a.customer.localeCompare(b.customer) * dir;
        }),
    [transactions, filter, query, sort]
  );

  function toggleSort(key: SortKey): void {
    setSort((s) => ({ key, dir: s.key === key && s.dir === "desc" ? "asc" : "desc" }));
  }

  return { filter, setFilter, sort, toggleSort, query, setQuery, filtered, counts };
}
