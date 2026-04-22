import type { ReactElement } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useLoginRoute } from "./-UseLoginRoute";
import { SettingsModalController } from "~/components/feedback/settings-modal/SettingsModalController";
import { RouteError } from "~/core/routes/logic/RouteError";
import { useDocumentTitle } from "~/core/routes/logic/UseDocumentTitle";
import { LoginView } from "~/views/login/LoginView";

export const Route = createFileRoute("/_public/login")({
  component: LoginPageRoute,
  errorComponent: ({ error }) => <RouteError error={error} />,
});

function LoginPageRoute(): ReactElement {
  useDocumentTitle("Login");
  const loginProps = useLoginRoute();

  return (
    <>
      <LoginView {...loginProps} />
      <SettingsModalController />
    </>
  );
}
