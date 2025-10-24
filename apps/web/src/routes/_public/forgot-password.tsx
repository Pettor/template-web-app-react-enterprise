import type { ReactElement } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ForgotPasswordPage } from "~/pages/forgot-password/ForgotPasswordPage";

export const Route = createFileRoute("/_public/forgot-password")({
  component: ForgotPasswordPageRoute,
});

function ForgotPasswordPageRoute(): ReactElement {
  return <ForgotPasswordPage />;
}
