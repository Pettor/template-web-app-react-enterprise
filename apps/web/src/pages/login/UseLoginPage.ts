import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useIntl } from "react-intl";
import type { LoginViewProps } from "../../components/views/login/LoginView";
import type { FormLogin } from "~/components/forms/login/LoginForm";
import { useAuth } from "~/core/auth/UseAuth";
import { useAppInfo } from "~/core/config/UseAppInfo";

export function useLoginPage(): LoginViewProps {
  const navigate = useNavigate();
  const intl = useIntl();
  const { appName } = useAppInfo();
  const { login, loginLoading } = useAuth();
  const [loginError, setLoginError] = useState<string>("");

  async function handleSubmit(data: FormLogin): Promise<void> {
    setLoginError("");

    try {
      await login({
        email: data.email,
        password: data.password,
        rememberMe: data.remember,
      });
      navigate({ to: "/" });
    } catch {
      setLoginError(
        intl.formatMessage({
          description: "LoginPage - Login error alert title",
          defaultMessage: "Incorrect username or password.",
          id: "Lh6FxC",
        })
      );
    }
  }

  function handleOnAbout(): void {
    navigate({ to: "/about" });
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
    onAbout: handleOnAbout,
  };
}
