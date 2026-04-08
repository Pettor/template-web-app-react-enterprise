import type { ReactElement } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useDocumentTitle } from "usehooks-ts";
import { useLoginPage } from "./UseLoginPage";
import { LoginView } from "~/components/views/login/LoginView";

export const Route = createFileRoute("/_public/login")({
  component: LoginPageRoute,
});

function LoginPageRoute(): ReactElement {
  useDocumentTitle("Login");
  const loginProps = useLoginPage();

  return <LoginView {...loginProps} />;
}
