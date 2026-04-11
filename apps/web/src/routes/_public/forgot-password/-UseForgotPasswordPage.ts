import { toast } from "@heroui/react";
import { isServiceError, usePostForgotPasswordMutate } from "@package/api";
import { useNavigate } from "@tanstack/react-router";
import { useIntl } from "react-intl";
import type { FormForgotPassword } from "~/components/forms/forgot-password/ForgotPasswordForm";
import type { ForgotPasswordViewProps } from "~/components/views/forgot-password/ForgotPasswordView";
import { useAppInfo } from "~/core/config/UseAppInfo";

export function useForgotPasswordPage(): ForgotPasswordViewProps {
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
          description: "ForgotPasswordPage - Too many requests error",
          defaultMessage: "Too many requests. Please wait a moment and try again.",
          id: "o/M2p+",
        });
      }
      if (error.status >= 500) {
        return intl.formatMessage({
          description: "ForgotPasswordPage - Server error",
          defaultMessage: "The service is temporarily unavailable. Please try again later.",
          id: "9sfBd8",
        });
      }
    }
    return intl.formatMessage({
      description: "ForgotPasswordPage - Forgot password error alert title",
      defaultMessage: "Something went wrong. Please try again.",
      id: "pfuAJp",
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
