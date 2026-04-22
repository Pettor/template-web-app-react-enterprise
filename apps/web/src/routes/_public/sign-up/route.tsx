import type { ReactElement } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useSignUpRoute } from "./-UseSignUpRoute";
import { RouteError } from "~/core/routes/logic/RouteError";
import { useDocumentTitle } from "~/core/routes/logic/UseDocumentTitle";
import { SignUpView } from "~/views/sign-up/SignUpView";

export const Route = createFileRoute("/_public/sign-up")({
  component: SignUpPageRoute,
  errorComponent: ({ error }) => <RouteError error={error} />,
});

function SignUpPageRoute(): ReactElement {
  useDocumentTitle("Sign Up");
  const signUpProps = useSignUpRoute();

  return <SignUpView {...signUpProps} />;
}
