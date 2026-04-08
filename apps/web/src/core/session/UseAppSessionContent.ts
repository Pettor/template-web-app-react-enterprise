import { useMemo } from "react";
import { useFetchPersonalProfileQuery } from "@package/api";
import { useNavigate } from "@tanstack/react-router";
import type { AppSessionContent } from "./AppSessionContent";
import { useAuth } from "~/core/auth/UseAuth";

interface NavigateTarget {
  to: string;
}

export function useAppSessionContent(aboutRoute: NavigateTarget = { to: "/version" }): AppSessionContent {
  const navigate = useNavigate();
  const { logout } = useAuth();
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

  function handleOnAbout(): void {
    navigate(aboutRoute);
  }

  return {
    email: profileEmail,
    name: profileName,
    onAbout: handleOnAbout,
    onLogout: handleOnLogout,
  };
}
