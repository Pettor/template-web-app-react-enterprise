import { useMemo } from "react";
import { useFetchPersonalProfileQuery } from "@package/api";
import type { AppSessionContent } from "./AppSessionContent";
import { useAuth } from "~/core/auth/UseAuth";
import { useCommandPalette } from "~/core/command-palette/UseCommandPalette";
import { useSettingsModal } from "~/core/settings/UseSettingsModal";

export function useAppSessionContent(): AppSessionContent {
  const { logout } = useAuth();
  const { open: openSettings } = useSettingsModal();
  const { open: openCommandPalette } = useCommandPalette();
  const { data: profileInfo } = useFetchPersonalProfileQuery();

  const { name: profileName, email: profileEmail }: Pick<AppSessionContent, "email"> & { name: string } =
    useMemo(() => {
      if (!profileInfo) {
        return {
          email: "",
          name: "",
        };
      }

      const { firstName, lastName, email } = profileInfo;
      return {
        email: email,
        name: `${firstName} ${lastName}`,
      };
    }, [profileInfo]);

  function handleOnLogout(): void {
    logout();
  }

  function handleOnSettings(): void {
    openSettings();
  }

  function handleOnSearch(): void {
    openCommandPalette();
  }

  return {
    email: profileEmail,
    name: profileName,
    onSettings: handleOnSettings,
    onLogout: handleOnLogout,
    onSearch: handleOnSearch,
  };
}
