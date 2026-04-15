import type { LoginData } from "@package/api";
import { usePostLoginMutate, usePostLogoutMutate } from "@package/api";
import { useNavigate, useRouter } from "@tanstack/react-router";
import { getAuthStatus, setAuthStatus } from "./AuthState";
import type { AuthStatus } from "./AuthStatus";

export function useAuth(): {
  status: AuthStatus;
  login(data: LoginData): Promise<void>;
  logout(): Promise<void>;
  loginLoading: boolean;
  logoutLoading: boolean;
} {
  const router = useRouter();
  const navigate = useNavigate();
  const { mutateAsync: loginFunc, isPending: loginLoading } = usePostLoginMutate();
  const { mutateAsync: logoutFunc, isPending: logoutLoading } = usePostLogoutMutate();

  async function login(data: LoginData): Promise<void> {
    if (import.meta.env.VITE_DEMO_MODE !== "true") {
      await loginFunc(data);
    }
    setAuthStatus("authenticated");
    await router.invalidate();
  }

  async function logout(): Promise<void> {
    if (import.meta.env.VITE_DEMO_MODE !== "true") {
      await logoutFunc();
    }
    setAuthStatus("unauthenticated");
    await router.invalidate();
    await navigate({ to: "/" });
  }

  return {
    status: getAuthStatus(),
    login,
    logout,
    loginLoading,
    logoutLoading,
  };
}
