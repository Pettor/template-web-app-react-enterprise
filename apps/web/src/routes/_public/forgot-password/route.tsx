import type { ReactElement } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useForgotPasswordRoute } from "./-UseForgotPasswordRoute";
import { RouteError } from "~/core/routes/logic/RouteError";
import { useDocumentTitle } from "~/core/routes/logic/UseDocumentTitle";
import { ForgotPasswordView } from "~/views/forgot-password/ForgotPasswordView";

export const Route = createFileRoute("/_public/forgot-password")({
  component: ForgotPasswordPageRoute,
  errorComponent: ({ error }) => <RouteError error={error} />,
});

function ForgotPasswordPageRoute(): ReactElement {
  useDocumentTitle("Forgot Password");
  const forgotPasswordProps = useForgotPasswordRoute();

  return <ForgotPasswordView {...forgotPasswordProps} />;
}
