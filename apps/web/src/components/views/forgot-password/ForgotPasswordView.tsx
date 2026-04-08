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
      <Card className="min-h-[550px] w-full sm:w-[550px]" variant="tertiary">
        <CardHeader className="flex w-full items-end justify-between">
          <div className="flex" />
          <Button
            isIconOnly
            variant="secondary"
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
        <CardContent className="flex flex-col items-center">
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
          <div className="h-4" />
          <ForgotPasswordForm {...resetForm} />
        </CardContent>
      </Card>
    </BasicLayout>
  );
}
