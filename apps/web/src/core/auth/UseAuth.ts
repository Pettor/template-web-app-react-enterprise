import { useContext } from "react";
import type { LoginData } from "@package/api";
import { usePostLoginMutate, usePostLogoutMutate } from "@package/api";
import { useNavigate, useRouter } from "@tanstack/react-router";
import { AuthContext } from "./AuthContext";
import type { AuthStatus } from "./AuthReducer";

export function useAuth(): {
  status: AuthStatus;
  login(data: LoginData): Promise<void>;
  logout(): Promise<void>;
  loginLoading: boolean;
  logoutLoading: boolean;
} {
  const router = useRouter();
  const navigate = useNavigate();
  const {
    state: { status },
    dispatch,
  } = useContext(AuthContext);
  const { mutateAsync: loginFunc, isPending: loginLoading } = usePostLoginMutate();
  const { mutateAsync: logoutFunc, isPending: logoutLoading } = usePostLogoutMutate();

  async function login(data: LoginData): Promise<void> {
    await loginFunc(data);
    dispatch({
      type: "auth/login",
    });
  }

  async function logout(): Promise<void> {
    await logoutFunc();
    dispatch({
      type: "auth/logout",
    });
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
