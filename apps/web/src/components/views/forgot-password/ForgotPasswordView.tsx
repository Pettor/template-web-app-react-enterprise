import type { ReactElement } from "react";
import { ArrowLeftIcon } from "@heroicons/react/20/solid";
import { LockClosedIcon } from "@heroicons/react/24/outline";
import { Card, CardHeader, Button, CardContent } from "@heroui/react";
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
    <Card className="min-h-[550px] w-full sm:w-[550px]" variant="tertiary">
      <CardHeader className="flex w-full items-start justify-start">
        <Button
          isIconOnly
          variant="secondary"
          onPress={onBack}
          aria-label={intl.formatMessage({
            description: "ForgotPasswordView - Back button aria label",
            defaultMessage: "Back",
            id: "lJxJFw",
          })}
        >
          <ArrowLeftIcon className="h-6 w-6" />
        </Button>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-3 px-6 pb-8">
        <div className="from-accent to-danger flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br text-white shadow-lg">
          <LockClosedIcon className="h-8 w-8" />
        </div>
        <h1 className="text-2xl font-bold">
          {intl.formatMessage({
            description: "ForgotPasswordView - Heading",
            defaultMessage: "Forgot your password?",
            id: "SIVfky",
          })}
        </h1>
        <p className="text-default-500 mb-4 max-w-sm text-center text-sm">
          {intl.formatMessage(
            {
              description: "ForgotPasswordView - Reset password description",
              defaultMessage:
                "Enter the email address you used to register for {appName}. We'll send you a link to reset your password.",
              id: "JYc8US",
            },
            { appName }
          )}
        </p>
        <div className="w-full max-w-sm">
          <ForgotPasswordForm {...resetForm} />
        </div>
      </CardContent>
    </Card>
  );
}
