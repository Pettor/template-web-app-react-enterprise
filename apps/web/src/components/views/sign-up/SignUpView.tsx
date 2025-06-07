import type { ReactElement } from "react";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { useIntl } from "react-intl";
import { BasicLayout, BlueFadeBackground, GridBackground } from "ui-package";
import type { SignUpFormProps } from "~/components/forms/sign-up/SignUpForm";
import { SignUpForm } from "~/components/forms/sign-up/SignUpForm";
import { Card, CardHeader, Button, CardBody, Spacer } from "@heroui/react";
import { ForgotPasswordForm } from "~/components/forms/forgot-password/ForgotPasswordForm";

export interface SignUpViewProps {
  appName: string;
  signUpForm: SignUpFormProps;
  onBack: () => void;
}

export function SignUpView({ signUpForm, onBack }: SignUpViewProps): ReactElement {
  const intl = useIntl();

  return (
    <BasicLayout
      className="dark:bg-base-300/40"
      backgroundElement={
        <>
          <BlueFadeBackground />
          <GridBackground />
        </>
      }
    >
      <div className="flex w-full flex-col items-center justify-center gap-1 p-4 lg:flex-row-reverse">
        <div className="bg-base-100 h-full min-h-[550px] w-full shrink-0 sm:w-[550px]">
          <Card className="min-h-[550px]">
            <CardHeader className="flex w-full items-end justify-between">
              <div className="flex" />
              <Button
                isIconOnly
                onPress={onBack}
                title={intl.formatMessage({
                  description: "AboutView - Back button title",
                  defaultMessage: "Back",
                  id: "72q+Ui",
                })}
                aria-label={intl.formatMessage({
                  description: "AboutView - Back button aria label",
                  defaultMessage: "Back",
                  id: "ZTBga3",
                })}
              >
                <XMarkIcon className="h-6 w-6" />
              </Button>
            </CardHeader>
            <CardBody className="flex flex-col items-center">
              <p className="my-2 text-center">
                {intl.formatMessage({
                  description: "SignUpView - Sign up description",
                  defaultMessage: "Sign up with your email address",
                  id: "NG06ZV",
                })}
              </p>
              <SignUpForm {...signUpForm} />
              <Spacer y={4} />
            </CardBody>
          </Card>
        </div>
      </div>
    </BasicLayout>
  );
}
