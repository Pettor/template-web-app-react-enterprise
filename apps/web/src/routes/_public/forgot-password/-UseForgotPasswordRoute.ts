import { toast } from "@heroui/react";
import { isServiceError, usePostForgotPasswordMutate } from "@package/api";
import { useNavigate } from "@tanstack/react-router";
import { useIntl } from "react-intl";
import type { FormForgotPassword } from "~/components/forms/forgot-password/ForgotPasswordForm";
import { useAppInfo } from "~/core/config/UseAppInfo";
import type { ForgotPasswordViewProps } from "~/views/forgot-password/ForgotPasswordView";

export function useForgotPasswordRoute(): ForgotPasswordViewProps {
  const { appName } = useAppInfo();
  const navigate = useNavigate();
  const intl = useIntl();
  const { isPending, mutateAsync: submit } = usePostForgotPasswordMutate();

  function handleOnBack(): void {
    navigate({ to: "/login" });
  }

  function getForgotPasswordErrorMessage(error: unknown): string {
    if (isServiceError(error)) {
      if (error.status === 429) {
        return intl.formatMessage({
          description: "ForgotPasswordRoute: toast - too many requests (429)",
          defaultMessage: "Too many requests. Please wait a moment and try again.",
          id: "+E4hKk",
        });
      }
      if (error.status >= 500) {
        return intl.formatMessage({
          description: "ForgotPasswordRoute: toast - server error (5xx)",
          defaultMessage: "The service is temporarily unavailable. Please try again later.",
          id: "YH/zTJ",
        });
      }
    }
    return intl.formatMessage({
      description: "ForgotPasswordRoute: toast - generic error",
      defaultMessage: "Something went wrong. Please try again.",
      id: "T8YZ5k",
    });
  }

  async function handleOnSubmit(data: FormForgotPassword): Promise<void> {
    const { email } = data;

    try {
      await submit(email);
      navigate({ to: "/" });
    } catch (error) {
      toast(getForgotPasswordErrorMessage(error));
    }
  }

  return {
    appName,
    onBack: handleOnBack,
    resetForm: {
      loading: isPending,
      onSubmit: handleOnSubmit,
    },
  };
}
