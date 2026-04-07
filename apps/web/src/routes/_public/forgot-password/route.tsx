import type { ReactElement } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useDocumentTitle } from "usehooks-ts";
import { useForgotPasswordPage } from "./UseForgotPasswordPage";
import { ForgotPasswordView } from "~/components/views/forgot-password/ForgotPasswordView";

export const Route = createFileRoute("/_public/forgot-password")({
  component: ForgotPasswordPageRoute,
});

function ForgotPasswordPageRoute(): ReactElement {
  useDocumentTitle("Forgot Password");
  const forgotPasswordProps = useForgotPasswordPage();

  return <ForgotPasswordView {...forgotPasswordProps} />;
}
