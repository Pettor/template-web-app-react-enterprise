import type { ReactElement } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useDocumentTitle } from "usehooks-ts";
import { useSignUpPage } from "./-UseSignUpPage";
import { SignUpView } from "~/components/views/sign-up/SignUpView";

export const Route = createFileRoute("/_public/sign-up")({
  component: SignUpPageRoute,
});

function SignUpPageRoute(): ReactElement {
  useDocumentTitle("Sign Up");
  const signUpProps = useSignUpPage();

  return <SignUpView {...signUpProps} />;
}
