import { useEffect, useRef } from "react";
import { toast } from "@heroui/react";
import { useAtomValue } from "jotai";
import { useIntl } from "react-intl";
import { syncStatusAtom } from "./SyncAtoms";
import { SyncOutdatedDialogProps } from "~/components/feedback/sync-outdated-dialog/SyncOutdatedDialog";
import { useAppInfo } from "~/core/config/UseAppInfo";
import { updateApp } from "~/core/pwa/UpdateApp";

/** Tells the user, once per data version, that the data folder needs a newer app, with an "Update" button. */
export function useOutdatedSyncNotice(): void {
  const intl = useIntl();
  const { appName } = useAppInfo();
  const status = useAtomValue(syncStatusAtom);
  const shownRef = useRef<number | null>(null);
  const folderVersion = status.state === "outdated" ? (status.folderVersion ?? null) : null;

  useEffect(() => {
    if (folderVersion === null || shownRef.current === folderVersion) {
      return;
    }
    shownRef.current = folderVersion;
    const [msg, opts] = SyncOutdatedDialogProps(
      intl,
      appName,
      () => undefined,
      () => void updateApp()
    );
    toast(msg, opts);
  }, [appName, folderVersion, intl]);
}
