import type { ReactElement } from "react";
import { InformationCircleIcon } from "@heroicons/react/20/solid";
import { useIntl } from "react-intl";
import { BasicLayout, BlueFadeBackground, GridBackground, Logo } from "ui-package";
import type { LoginFormProps } from "~/components/forms/login/LoginForm";
import { LoginForm } from "~/components/forms/login/LoginForm";
import { Card, CardHeader, Button, CardBody, Spacer } from "@heroui/react";

export interface LoginViewProps {
  appName: string;
  loginForm: LoginFormProps;
  error?: string;
  onAbout(): void;
}

export function LoginView({ appName, loginForm, onAbout }: LoginViewProps): ReactElement {
  const intl = useIntl();

  return (
    <BasicLayout
      className="dark:bg-base-300/70"
      backgroundElement={
        <>
          <BlueFadeBackground />
          <GridBackground />
        </>
      }
    >
      <div className="flex w-full flex-col items-center justify-center gap-1 p-4 lg:flex-row-reverse">
        <div className="bg-base-100 h-full min-h-[550px] w-full shrink-0 sm:w-[550px]">
          <Card isBlurred className="flex w-full flex-col gap-4 px-8 pt-6 pb-10">
            <CardHeader className="flex w-full items-end justify-between">
              <div className="flex" />
              <Button
                isIconOnly
                onPress={onAbout}
                aria-label={intl.formatMessage({
                  description: "AboutView - About button aria label",
                  defaultMessage: "About",
                  id: "ZTBga3",
                })}
              >
                <InformationCircleIcon className="h-6 w-6" />
              </Button>
            </CardHeader>
            <CardBody className="flex flex-col items-center">
              <div className="flex justify-center md:hidden">
                <Logo size="medium" />
              </div>
              <div className="flex justify-center max-md:hidden">
                <Logo size="large" />
              </div>
              <p className="text-5xl">{appName}</p>
              <Spacer y={6} />
              <LoginForm {...loginForm} />
            </CardBody>
          </Card>
        </div>
      </div>
    </BasicLayout>
  );
}
