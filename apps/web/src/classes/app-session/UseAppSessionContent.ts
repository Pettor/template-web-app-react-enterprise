import { useMemo } from "react";
import { useFetchPersonalProfileQuery } from "@package/api";
import { useNavigate } from "@tanstack/react-router";
import type { IAppSessionContent } from "./IAppSessionContent";
import { useAuth } from "~/core/auth/UseAuth";

export function useAppSessionContent(aboutRoute: string = "/version"): IAppSessionContent {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { data: profileInfo } = useFetchPersonalProfileQuery();

  const { name: profileName, email: profileEmail }: Pick<IAppSessionContent, "email"> & { name: string } =
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
    navigate({ to: aboutRoute as "/version" });
  }

  return {
    email: profileEmail,
    name: profileName,
    onAbout: handleOnAbout,
    onLogout: handleOnLogout,
  };
}
