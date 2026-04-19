import type { ReactElement } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useDocumentTitle } from "usehooks-ts";
import { useLoginPage } from "./-UseLoginPage";
import { SettingsModalController } from "~/components/feedback/settings-modal/SettingsModalController";
import { LoginView } from "~/components/views/login/LoginView";
import { RouteError } from "~/core/routes/logic/RouteError";

export const Route = createFileRoute("/_public/login")({
  component: LoginPageRoute,
  errorComponent: ({ error }) => <RouteError error={error} />,
});

function LoginPageRoute(): ReactElement {
  useDocumentTitle("Login");
  const loginProps = useLoginPage();

  return (
    <>
      <LoginView {...loginProps} />
      <SettingsModalController />
    </>
  );
}
