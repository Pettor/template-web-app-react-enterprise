import { useState } from "react";
import { isServiceError } from "@package/api";
import { useNavigate } from "@tanstack/react-router";
import { useIntl } from "react-intl";
import type { FormLogin } from "~/components/forms/login/LoginForm";
import type { LoginViewProps } from "~/components/views/login/LoginView";
import { useAuth } from "~/core/auth/UseAuth";
import { useAppInfo } from "~/core/config/UseAppInfo";
import { useSettingsModal } from "~/core/settings/UseSettingsModal";

export function useLoginPage(): LoginViewProps {
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
          description: "LoginPage - Invalid credentials error",
          defaultMessage: "Incorrect username or password.",
          id: "TS6b1h",
        });
      }
      if (error.status === 429) {
        return intl.formatMessage({
          description: "LoginPage - Too many attempts error",
          defaultMessage: "Too many login attempts. Please wait a moment and try again.",
          id: "LVobZq",
        });
      }
      if (error.status >= 500) {
        return intl.formatMessage({
          description: "LoginPage - Server error",
          defaultMessage: "The service is temporarily unavailable. Please try again later.",
          id: "J01Egq",
        });
      }
    }
    return intl.formatMessage({
      description: "LoginPage - Unknown error",
      defaultMessage: "An unexpected error occurred. Please try again.",
      id: "+TNwRP",
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
