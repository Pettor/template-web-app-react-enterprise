import { useState } from "react";
import { isServiceError } from "@package/api";
import { useNavigate } from "@tanstack/react-router";
import { useIntl } from "react-intl";
import type { FormLogin } from "~/components/forms/login/LoginForm";
import { useAuth } from "~/core/auth/UseAuth";
import { useAppInfo } from "~/core/config/UseAppInfo";
import { useSettingsModal } from "~/core/settings/UseSettingsModal";
import type { LoginViewProps } from "~/views/login/LoginView";

export function useLoginRoute(): LoginViewProps {
  const navigate = useNavigate();
  const intl = useIntl();
  const { appName } = useAppInfo();
  const { login, loginLoading } = useAuth();
  const { open: openSettings } = useSettingsModal();
  const [loginError, setLoginError] = useState<string>("");

  function getLoginErrorMessage(error: unknown): string {
    if (isServiceError(error)) {
      if (error.status === 401 || error.status === 403) {
        return intl.formatMessage({
          description: "LoginRoute: error - invalid credentials (401/403)",
          defaultMessage: "Incorrect username or password.",
          id: "SoG8FD",
        });
      }
      if (error.status === 429) {
        return intl.formatMessage({
          description: "LoginRoute: error - too many attempts (429)",
          defaultMessage: "Too many login attempts. Please wait a moment and try again.",
          id: "flp4b9",
        });
      }
      if (error.status >= 500) {
        return intl.formatMessage({
          description: "LoginRoute: error - server error (5xx)",
          defaultMessage: "The service is temporarily unavailable. Please try again later.",
          id: "bVSFFb",
        });
      }
    }
    return intl.formatMessage({
      description: "LoginRoute: error - unknown error",
      defaultMessage: "An unexpected error occurred. Please try again.",
      id: "4iHlTO",
    });
  }

  async function handleSubmit(data: FormLogin): Promise<void> {
    setLoginError("");

    try {
      await login({
        email: data.email,
        password: data.password,
        rememberMe: data.remember,
      });
      navigate({ to: "/" });
    } catch (error) {
      setLoginError(getLoginErrorMessage(error));
    }
  }

  function handleOnSettings(): void {
    openSettings("appearance");
  }

  function handleForgotPassword(): void {
    navigate({ to: "/forgot-password" });
  }

  function handleSignUp(): void {
    navigate({ to: "/sign-up" });
  }

  return {
    appName,
    loginForm: {
      loading: loginLoading,
      error: loginError,
      onSignUp: handleSignUp,
      onForgotPassword: handleForgotPassword,
      onSubmit: handleSubmit,
    },
    onSettings: handleOnSettings,
  };
}
