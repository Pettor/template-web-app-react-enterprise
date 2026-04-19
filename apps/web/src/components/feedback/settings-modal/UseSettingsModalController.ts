import { useMemo } from "react";
import { fetchApplicationInfoQuery, fetchPersonalProfileQuery } from "@package/api";
import { useQuery } from "@tanstack/react-query";
import type { SettingsModalProps } from "./SettingsModal";
import { useThemeSelector } from "~/components/actions/theme-selector/UseThemeSelector";
import { getAuthStatus } from "~/core/auth/AuthState";
import { useAppInfo } from "~/core/config/UseAppInfo";
import { useSettingsModal } from "~/core/settings/UseSettingsModal";

export function useSettingsModalController(): SettingsModalProps {
  const { isOpen, initialSection, sections, close } = useSettingsModal();
  const { appName } = useAppInfo();
  const themeSelector = useThemeSelector();
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
    }),
    [appName, appInfo]
  );

  return {
    isOpen,
    sections,
    initialSection,
    onClose: close,
    account,
    appearance: { themeSelector },
    aboutDetails,
  };
}
