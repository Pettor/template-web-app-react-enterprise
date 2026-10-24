import { useMemo } from "react";
import { fetchApplicationInfoQuery, fetchPersonalProfileQuery } from "@package/api";
import { useQuery } from "@tanstack/react-query";
import type { SettingsModalProps } from "./SettingsModal";
import { useThemeSelector } from "~/components/actions/theme-selector/UseThemeSelector";
import { getAuthStatus } from "~/core/auth/AuthState";
import { useAppInfo } from "~/core/config/UseAppInfo";
import { useSettingsModal } from "~/core/settings/UseSettingsModal";
import { useSync } from "~/core/sync/UseSync";
import { useWhatsNew } from "~/core/whats-new/UseWhatsNew";

export function useSettingsModalController(): SettingsModalProps {
  const { isOpen, initialSection, sections, close } = useSettingsModal();
  const { appName } = useAppInfo();
  const themeSelector = useThemeSelector();
  const { open: openWhatsNew, hasReleaseNotes } = useWhatsNew();
  const sync = useSync();
  const isAuthenticated = getAuthStatus() === "authenticated";

  const { data: profileInfo } = useQuery({
    ...fetchPersonalProfileQuery(),
    enabled: isAuthenticated,
  });
  const { data: appInfo } = useQuery({
    ...fetchApplicationInfoQuery(),
    enabled: isOpen,
  });

  const account = useMemo(() => {
    if (!isAuthenticated) return undefined;
    return {
      name: profileInfo ? `${profileInfo.firstName} ${profileInfo.lastName}` : "",
      email: profileInfo?.email ?? "",
    };
  }, [isAuthenticated, profileInfo]);

  const aboutDetails = useMemo(
    () => ({
      appName,
      appVersion: import.meta.env.VITE_APP_VERSION,
      serverVersion: appInfo?.version ?? "",
      onShowWhatsNew: hasReleaseNotes
        ? () => {
            close();
            openWhatsNew();
          }
        : undefined,
    }),
    [appName, appInfo, close, openWhatsNew, hasReleaseNotes]
  );

  return {
    isOpen,
    sections,
    initialSection,
    onClose: close,
    account,
    appearance: { themeSelector },
    sync: {
      status: sync.status,
      isFolderSupported: sync.isFolderSupported,
      deviceName: sync.settings.deviceName,
      onConnectFolder: sync.connectFolder,
      onConnectGitHub: sync.connectGitHub,
      onReconnect: () => void sync.reconnect(),
      onDisconnect: () => void sync.disconnect(),
      onSyncNow: sync.syncNow,
      onDeviceNameChange: sync.setDeviceName,
    },
    aboutDetails,
  };
}
