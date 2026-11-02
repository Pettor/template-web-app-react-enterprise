import type { ReactElement, ReactNode } from "react";
import { useOutdatedSyncNotice } from "./UseOutdatedSyncNotice";
import { useSyncLifecycle } from "./UseSyncLifecycle";

export interface SyncLifecycleProps {
  children: ReactNode;
}

/** Keeps the data folder or GitHub repository in sync for everything below it. */
export function SyncLifecycle({ children }: SyncLifecycleProps): ReactElement {
  useSyncLifecycle();
  useOutdatedSyncNotice();
  return <>{children}</>;
}
