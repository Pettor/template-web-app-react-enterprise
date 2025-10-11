import type { ReactElement } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { SignUpPage } from "~/pages/sign-up/SignUpPage";

export const Route = createFileRoute("/_public/sign-up")({
  component: SignUpPageRoute,
});

function SignUpPageRoute(): ReactElement {
  return <SignUpPage />;
}
