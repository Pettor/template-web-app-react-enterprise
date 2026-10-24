import { useState } from "react";
import type { SyncMethod, SyncStatus } from "~/core/sync/SyncAtoms";
import type { FolderConnectResult } from "~/core/sync/UseSync";

export interface UseSettingsSyncSectionResult {
  /** The method shown as selected: the connected one, or the one being set up. */
  method: SyncMethod;
  /** Picking a folder failed for a reason other than cancelling. */
  folderFailed: boolean;
  selectMethod: (value: string) => void;
  chooseFolder: () => void;
  /** GitHub connected: show its state instead of the setup form. */
  finishSetup: () => void;
}

export function useSettingsSyncSection(
  status: SyncStatus,
  onConnectFolder: () => Promise<FolderConnectResult>,
  onDisconnect: () => void
): UseSettingsSyncSectionResult {
  // Choosing GitHub only reveals its setup; the method changes once a repository is connected.
  const [pending, setPending] = useState<SyncMethod | null>(null);
  const [folderFailed, setFolderFailed] = useState(false);

  function chooseFolder(): void {
    setFolderFailed(false);
    void onConnectFolder().then((result) => {
      setFolderFailed(result === "failed");
      if (result === "connected") {
        setPending(null);
      }
    });
  }

  function selectMethod(value: string): void {
    setFolderFailed(false);
    if (value === "github") {
      setPending(status.method === "github" ? null : "github");
    } else if (value === "folder") {
      setPending(null);
      if (status.method !== "folder") {
        chooseFolder();
      }
    } else {
      setPending(null);
      if (status.method !== "local") {
        onDisconnect();
      }
    }
  }

  return {
    method: pending ?? status.method,
    folderFailed,
    selectMethod,
    chooseFolder,
    finishSetup: () => setPending(null),
  };
}
