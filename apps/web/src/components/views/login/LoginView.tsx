import type { ReactElement } from "react";
import { Cog6ToothIcon } from "@heroicons/react/20/solid";
import { Alert, Card, CardHeader, Button, CardContent } from "@heroui/react";
import { BasicLayout, BlueFadeBackground, GridBackground, Logo } from "@package/ui";
import { useIntl } from "react-intl";
import type { LoginFormProps } from "~/components/forms/login/LoginForm";
import { LoginForm } from "~/components/forms/login/LoginForm";

const IS_DEMO_MODE = import.meta.env.VITE_DEMO_MODE === "true";

export interface LoginViewProps {
  appName: string;
  loginForm: LoginFormProps;
  error?: string;
  onSettings(): void;
}

export function LoginView({ appName, loginForm, onSettings }: LoginViewProps): ReactElement {
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
        <CardHeader className="flex w-full items-start justify-end">
          <Button
            isIconOnly
            variant="tertiary"
            onPress={onSettings}
            aria-label={intl.formatMessage({
              description: "LoginView - Settings button aria label",
              defaultMessage: "Settings",
              id: "5ZVCd4",
            })}
          >
            <Cog6ToothIcon className="h-6 w-6" />
          </Button>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-2 px-6 pb-8">
          <div className="flex justify-center md:hidden">
            <Logo size="medium" />
          </div>
          <div className="flex justify-center max-md:hidden">
            <Logo size="large" />
          </div>
          <h1 className="from-accent to-danger bg-gradient-to-r bg-clip-text text-5xl font-bold text-transparent">
            {appName}
          </h1>
          <p className="text-default-500 mb-4 max-w-sm text-center text-sm">
            {intl.formatMessage({
              description: "LoginView - Welcome tagline",
              defaultMessage: "Welcome back. Sign in to continue.",
              id: "NMwN2/",
            })}
          </p>
          {IS_DEMO_MODE && (
            <Alert status="warning" className="w-full max-w-sm">
              <Alert.Indicator />
              <Alert.Content>
                <Alert.Title>
                  {intl.formatMessage({
                    description: "LoginView - Demo mode banner title",
                    defaultMessage: "Demo Mode",
                    id: "7DjQMQ",
                  })}
                </Alert.Title>
                <Alert.Description>
                  {intl.formatMessage({
                    description: "LoginView - Demo mode banner description",
                    defaultMessage: "This is a demo. Sign in with any valid email and password (min. 8 characters).",
                    id: "wZXD0J",
                  })}
                </Alert.Description>
              </Alert.Content>
            </Alert>
          )}
          <div className="w-full max-w-sm">
            <LoginForm {...loginForm} />
          </div>
        </CardContent>
      </Card>
    </BasicLayout>
  );
}
