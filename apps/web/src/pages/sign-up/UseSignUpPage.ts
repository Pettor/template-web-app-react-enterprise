import { addToast } from "@heroui/react";
import { usePostSelfRegister } from "@package/api";
import { useIntl } from "react-intl";
import { useNavigate } from "react-router-dom";
import type { FormSignUp } from "~/components/forms/sign-up/SignUpForm";
import type { SignUpViewProps } from "~/components/views/sign-up/SignUpView";
import { useAppInfo } from "~/core/config/UseAppInfo";

export function useSignUpPage(): SignUpViewProps {
  const navigate = useNavigate();
  const intl = useIntl();
  const { appNameCapital } = useAppInfo();
  const { isPending, mutateAsync: submit } = usePostSelfRegister();

  function handleOnBack(): void {
    navigate("/login");
  }

  async function handleOnSubmit(data: FormSignUp): Promise<void> {
    try {
      await submit(data);
      navigate("/");
    } catch {
      addToast({
        title: intl.formatMessage({
          description: "SignUpPage - Sign up error alert title",
          defaultMessage: "Something went wrong",
          id: "CrlHXH",
        }),
      });
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
