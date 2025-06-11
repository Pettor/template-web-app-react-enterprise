import type { ReactElement } from "react";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { useIntl } from "react-intl";
import { BasicLayout, BlueFadeBackground, GridBackground } from "ui-package";
import type { ForgotPasswordFormProps } from "../../forms/forgot-password/ForgotPasswordForm";
import { ForgotPasswordForm } from "../../forms/forgot-password/ForgotPasswordForm";
import { Card, CardHeader, Button, CardBody, Spacer } from "@heroui/react";

export interface ForgotPasswordViewProps {
  appName: string;
  resetForm: ForgotPasswordFormProps;
  onBack: () => void;
}

export function ForgotPasswordView({ appName, resetForm, onBack }: ForgotPasswordViewProps): ReactElement {
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
              <span className="mt-8 p-4 text-center text-base">
                {intl.formatMessage(
                  {
                    description: "ForgotPasswordView - Reset password description",
                    defaultMessage:
                      "Enter your {appName} email adress that you used to register. We'll send you an email with your username and a link to reset your password.",
                    id: "02xDV+",
                  },
                  {
                    appName: appName,
                  }
                )}
              </span>
              <Spacer y={4} />
              <ForgotPasswordForm {...resetForm} />
            </CardBody>
          </Card>
        </div>
      </div>
    </BasicLayout>
  );
}
