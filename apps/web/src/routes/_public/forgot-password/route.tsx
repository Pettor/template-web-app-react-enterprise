import type { ReactElement } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useDocumentTitle } from "usehooks-ts";
import { useForgotPasswordPage } from "./-UseForgotPasswordPage";
import { ForgotPasswordView } from "~/components/views/forgot-password/ForgotPasswordView";
import { RouteError } from "~/core/routes/logic/RouteError";

export const Route = createFileRoute("/_public/forgot-password")({
  component: ForgotPasswordPageRoute,
  errorComponent: ({ error }) => <RouteError error={error} />,
});

function ForgotPasswordPageRoute(): ReactElement {
  useDocumentTitle("Forgot Password");
  const forgotPasswordProps = useForgotPasswordPage();

  return <ForgotPasswordView {...forgotPasswordProps} />;
}
