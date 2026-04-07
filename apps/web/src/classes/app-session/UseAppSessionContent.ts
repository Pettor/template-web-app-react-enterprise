import { useMemo } from "react";
import { useFetchPersonalProfileQuery } from "@package/api";
import type { UseNavigateResult } from "@tanstack/react-router";
import { useNavigate } from "@tanstack/react-router";
import type { IAppSessionContent } from "./IAppSessionContent";
import { useAuth } from "~/core/auth/UseAuth";

type NavigateOptions<T extends string> = Omit<UseNavigateResult<T>, "navigate"> & {
  to: T;
};

export function useAppSessionContent(aboutRoute: NavigateOptions<string> = { to: "/version" }): IAppSessionContent {
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
    navigate(aboutRoute);
  }

  return {
    email: profileEmail,
    name: profileName,
    onAbout: handleOnAbout,
    onLogout: handleOnLogout,
  };
}
