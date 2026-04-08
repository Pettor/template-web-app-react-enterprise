import type { ReactElement } from "react";
import { XMarkIcon } from "@heroicons/react/20/solid";
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

export function SignUpView({ signUpForm, onBack }: SignUpViewProps): ReactElement {
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
          <p className="my-2 text-center">
            {intl.formatMessage({
              description: "SignUpView - Sign up description",
              defaultMessage: "Sign up with your email address",
              id: "NG06ZV",
            })}
          </p>
          <SignUpForm {...signUpForm} />
          <div className="h-4" />
        </CardContent>
      </Card>
    </BasicLayout>
  );
}
