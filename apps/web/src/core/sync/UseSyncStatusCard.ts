import { useCallback } from "react";
import { useAtomValue } from "jotai";
import type { SyncStatus } from "./SyncAtoms";
import { syncStatusAtom } from "./SyncAtoms";
import { useSettingsModal } from "~/core/settings/UseSettingsModal";

export interface UseSyncStatusCardResult {
  status: SyncStatus;
  /** Opens Settings on the Sync tab. */
  onPress: () => void;
}

/** Props for `SyncStatusCard`: the live sync status, opening the sync settings when pressed. */
export function useSyncStatusCard(): UseSyncStatusCardResult {
  const status = useAtomValue(syncStatusAtom);
  const { open } = useSettingsModal();
  const onPress = useCallback(() => open("sync"), [open]);
  return { status, onPress };
}
