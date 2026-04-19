import type { ReactElement } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useDocumentTitle } from "usehooks-ts";
import { useForgotPasswordRoute } from "./-UseForgotPasswordRoute";
import { ForgotPasswordView } from "~/components/views/forgot-password/ForgotPasswordView";
import { RouteError } from "~/core/routes/logic/RouteError";

export const Route = createFileRoute("/_public/forgot-password")({
  component: ForgotPasswordPageRoute,
  errorComponent: ({ error }) => <RouteError error={error} />,
});

function ForgotPasswordPageRoute(): ReactElement {
  useDocumentTitle("Forgot Password");
  const forgotPasswordProps = useForgotPasswordRoute();

  return <ForgotPasswordView {...forgotPasswordProps} />;
}
