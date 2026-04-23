import type { ReactElement } from "react";
import { useDocumentTitle } from "@package/react";
import { createFileRoute } from "@tanstack/react-router";
import { useSignUpRoute } from "./-UseSignUpRoute";
import { RouteError } from "~/core/routes/logic/RouteError";
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
