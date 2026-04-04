import type { ReactElement } from "react";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { Card, CardHeader, Button, CardContent } from "@heroui/react";
import { BasicLayout, BlueFadeBackground, GridBackground } from "@package/ui";
import { useIntl } from "react-intl";
import type { ForgotPasswordFormProps } from "../../forms/forgot-password/ForgotPasswordForm";
import { ForgotPasswordForm } from "../../forms/forgot-password/ForgotPasswordForm";

export interface ForgotPasswordViewProps {
  appName: string;
  resetForm: ForgotPasswordFormProps;
  onBack: () => void;
}

export function ForgotPasswordView({ appName, resetForm, onBack }: ForgotPasswordViewProps): ReactElement {
  const intl = useIntl();

  return (
    <BasicLayout
      backgroundElement={
        <>
          <BlueFadeBackground />
          <GridBackground />
        </>
      }
    >
      <div className="flex w-full flex-col items-center justify-center p-4 lg:flex-row-reverse">
        <div className="w-full shrink-0 sm:w-[500px]">
          <Card className="p-2">
            <CardHeader className="flex w-full items-end justify-between">
              <div className="flex" />
              <Button
                isIconOnly
                onPress={onBack}
                aria-label={intl.formatMessage({
                  description: "AboutView - Back button aria label",
                  defaultMessage: "Back",
                  id: "ZTBga3",
                })}
              >
                <XMarkIcon className="h-6 w-6" />
              </Button>
            </CardHeader>
            <CardContent className="flex flex-col items-center gap-6">
              <span className="text-foreground/70 max-w-sm px-2 text-center text-base">
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
              <ForgotPasswordForm {...resetForm} />
            </CardContent>
          </Card>
        </div>
      </div>
    </BasicLayout>
  );
}
