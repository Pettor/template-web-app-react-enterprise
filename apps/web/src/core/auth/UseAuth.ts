import type { LoginData } from "@package/api";
import { usePostLoginMutate, usePostLogoutMutate } from "@package/api";
import { useAtomValue, useSetAtom } from "jotai";
import { useNavigate, useRouter } from "@tanstack/react-router";
import { authStatusAtom } from "~/atoms/AuthAtoms";
import type { AuthStatus } from "~/classes/auth/AuthStatus";

export function useAuth(): {
  status: AuthStatus;
  login(data: LoginData): Promise<void>;
  logout(): Promise<void>;
  loginLoading: boolean;
  logoutLoading: boolean;
} {
  const router = useRouter();
  const navigate = useNavigate();
  const status = useAtomValue(authStatusAtom);
  const setAuthStatus = useSetAtom(authStatusAtom);
  const { mutateAsync: loginFunc, isPending: loginLoading } = usePostLoginMutate();
  const { mutateAsync: logoutFunc, isPending: logoutLoading } = usePostLogoutMutate();

  async function login(data: LoginData): Promise<void> {
    await loginFunc(data);
    setAuthStatus("authenticated");
  }

  async function logout(): Promise<void> {
    await logoutFunc();
    setAuthStatus("unauthenticated");
    router.invalidate().finally(() => {
      navigate({ to: "/" });
    });
  }

  return {
    status,
    login,
    logout,
    loginLoading,
    logoutLoading,
  };
}
