import { useCallback, useEffect } from "react";
import { toast } from "@heroui/react";
import { useIntl } from "react-intl";
import { useRegisterSW } from "virtual:pwa-register/react";
import { PWA_VERSION_INTERVAL } from "./PwaLifecycleConstants";
import { PwaOfflineDialogProps } from "~/components/feedback/pwa-offline-dialog/PwaOfflineDialog";
import { PwaUpdateDialogProps } from "~/components/feedback/pwa-update-dialog/PwaUpdateDialog";
import { useAppInfo } from "~/core/config/UseAppInfo";

export function usePwaLifecycle(): void {
  const intl = useIntl();
  const { appName } = useAppInfo();

  function checkPwaUpdate(registration: ServiceWorkerRegistration): void {
    setInterval(() => {
      registration.update();
    }, PWA_VERSION_INTERVAL);
  }

  const {
    offlineReady: [offlineReady, setOfflineReady],
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegistered(registration) {
      if (!registration) {
        return;
      }
      checkPwaUpdate(registration);
    },
    onRegisterError(error) {
      console.log(`SW registration failed: ${error}`);
    },
  });

  const handleRefresh = useCallback(async () => {
    await updateServiceWorker(true);
    window.location.reload();
  }, [updateServiceWorker]);

  const handleRefreshClose = useCallback((): void => {
    setNeedRefresh(false);
  }, [setNeedRefresh]);

  const handleOfflineClose = useCallback((): void => {
    setOfflineReady(false);
  }, [setOfflineReady]);

  useEffect(() => {
    if (!offlineReady) {
      return;
    }
    const [msg, opts] = PwaOfflineDialogProps(intl, handleOfflineClose);
    toast(msg, opts);
  }, [handleOfflineClose, intl, offlineReady, setOfflineReady]);

  useEffect(() => {
    if (!needRefresh) {
      return;
    }
    const [msg, opts] = PwaUpdateDialogProps(intl, appName, handleRefreshClose, handleRefresh);
    toast(msg, opts);
  }, [appName, handleRefresh, handleRefreshClose, intl, needRefresh]);
}
