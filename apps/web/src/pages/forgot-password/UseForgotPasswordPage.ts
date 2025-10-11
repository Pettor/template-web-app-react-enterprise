import { addToast } from "@heroui/react";
import { usePostForgotPasswordMutate } from "@package/api";
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
    console.log("handleBack");
    navigate({ to: "/login" });
  }

  async function handleOnSubmit(data: FormForgotPassword): Promise<void> {
    const { email } = data;

    try {
      await submit(email);
      navigate({ to: "/" });
    } catch {
      addToast({
        title: intl.formatMessage({
          description: "ForgotPasswordPage - Forgot password error alert title",
          defaultMessage: "Something went wrong",
          id: "gmuIUo",
        }),
      });
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
