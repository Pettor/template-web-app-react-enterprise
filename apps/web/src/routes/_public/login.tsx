import type { ReactElement } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { LoginPage } from "~/pages/login/LoginPage";

export const Route = createFileRoute("/_public/login")({
  component: LoginPageRoute,
});

function LoginPageRoute(): ReactElement {
  return <LoginPage />;
}
