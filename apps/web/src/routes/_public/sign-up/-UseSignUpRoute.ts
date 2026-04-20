import { toast } from "@heroui/react";
import { isServiceError, usePostSelfRegister } from "@package/api";
import { useNavigate } from "@tanstack/react-router";
import { useIntl } from "react-intl";
import type { FormSignUp } from "~/components/forms/sign-up/SignUpForm";
import { useAppInfo } from "~/core/config/UseAppInfo";
import type { SignUpViewProps } from "~/views/sign-up/SignUpView";

export function useSignUpRoute(): SignUpViewProps {
  const navigate = useNavigate();
  const intl = useIntl();
  const { appNameCapital } = useAppInfo();
  const { isPending, mutateAsync: submit } = usePostSelfRegister();

  function handleOnBack(): void {
    navigate({ to: "/login" });
  }

  function getSignUpErrorMessage(error: unknown): string {
    if (isServiceError(error)) {
      if (error.status === 409) {
        return intl.formatMessage({
          description: "SignUpRoute: toast - email already registered (409)",
          defaultMessage: "An account with this email already exists.",
          id: "XDzdRz",
        });
      }
      if (error.status === 422) {
        return intl.formatMessage({
          description: "SignUpRoute: toast - validation error (422)",
          defaultMessage: "Please check your details and try again.",
          id: "oGNxvn",
        });
      }
      if (error.status >= 500) {
        return intl.formatMessage({
          description: "SignUpRoute: toast - server error (5xx)",
          defaultMessage: "The service is temporarily unavailable. Please try again later.",
          id: "ttpFqW",
        });
      }
    }
    return intl.formatMessage({
      description: "SignUpRoute: toast - generic sign-up error",
      defaultMessage: "Something went wrong. Please try again.",
      id: "gTtb6e",
    });
  }

  async function handleOnSubmit(data: FormSignUp): Promise<void> {
    try {
      await submit(data);
      navigate({ to: "/" });
    } catch (error) {
      toast(getSignUpErrorMessage(error));
    }
  }

  return {
    appName: appNameCapital,
    onBack: handleOnBack,
    signUpForm: {
      loading: isPending,
      onSubmit: handleOnSubmit,
    },
  };
}
