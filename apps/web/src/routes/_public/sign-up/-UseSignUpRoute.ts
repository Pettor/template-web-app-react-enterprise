import { toast } from "@heroui/react";
import { isServiceError, usePostSelfRegister } from "@package/api";
import { useNavigate } from "@tanstack/react-router";
import { useIntl } from "react-intl";
import type { FormSignUp } from "~/components/forms/sign-up/SignUpForm";
import type { SignUpViewProps } from "~/components/views/sign-up/SignUpView";
import { useAppInfo } from "~/core/config/UseAppInfo";

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
          description: "SignUpRoute -Email already registered error",
          defaultMessage: "An account with this email already exists.",
          id: "DbRfvu",
        });
      }
      if (error.status === 422) {
        return intl.formatMessage({
          description: "SignUpRoute -Validation error",
          defaultMessage: "Please check your details and try again.",
          id: "bB0KDs",
        });
      }
      if (error.status >= 500) {
        return intl.formatMessage({
          description: "SignUpRoute -Server error",
          defaultMessage: "The service is temporarily unavailable. Please try again later.",
          id: "bWGHfa",
        });
      }
    }
    return intl.formatMessage({
      description: "SignUpRoute -Sign up error alert title",
      defaultMessage: "Something went wrong. Please try again.",
      id: "2FMZ+k",
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
