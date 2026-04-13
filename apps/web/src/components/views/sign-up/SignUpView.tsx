import type { ReactElement } from "react";
import { ArrowLeftIcon } from "@heroicons/react/20/solid";
import { UserPlusIcon } from "@heroicons/react/24/outline";
import { Card, CardHeader, Button, CardContent } from "@heroui/react";
import { BasicLayout, BlueFadeBackground, GridBackground } from "@package/ui";
import { useIntl } from "react-intl";
import type { SignUpFormProps } from "~/components/forms/sign-up/SignUpForm";
import { SignUpForm } from "~/components/forms/sign-up/SignUpForm";

export interface SignUpViewProps {
  appName: string;
  signUpForm: SignUpFormProps;
  onBack: () => void;
}

export function SignUpView({ appName, signUpForm, onBack }: SignUpViewProps): ReactElement {
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
      <Card className="min-h-[550px] w-full sm:w-[600px]" variant="tertiary">
        <CardHeader className="flex w-full items-center justify-start">
          <Button
            isIconOnly
            variant="secondary"
            onPress={onBack}
            aria-label={intl.formatMessage({
              description: "SignUpView - Back button aria label",
              defaultMessage: "Back",
              id: "GpTR8m",
            })}
          >
            <ArrowLeftIcon className="h-6 w-6" />
          </Button>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-2 px-6 pb-8">
          <div className="from-accent to-danger flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br text-white shadow-lg">
            <UserPlusIcon className="h-8 w-8" />
          </div>
          <h1 className="text-2xl font-bold">
            {intl.formatMessage(
              {
                description: "SignUpView - Heading",
                defaultMessage: "Join {appName}",
                id: "fEU2Vn",
              },
              { appName }
            )}
          </h1>
          <p className="text-default-500 mb-2 max-w-sm text-center text-sm">
            {intl.formatMessage({
              description: "SignUpView - Sign up description",
              defaultMessage: "Create your account in a few seconds and start exploring.",
              id: "QU7G0y",
            })}
          </p>
          <SignUpForm {...signUpForm} />
        </CardContent>
      </Card>
    </BasicLayout>
  );
}
