import type { ReactElement } from "react";
import { Button } from "@heroui/react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useIntl } from "react-intl";

export const Route = createFileRoute("/$")({
  component: NotFoundPageRoute,
});

function NotFoundPageRoute(): ReactElement {
  const intl = useIntl();
  const navigate = useNavigate();

  function handleClick(): void {
    navigate({ to: "/login" });
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 p-6 text-center">
      <span className="text-default-300 text-6xl font-bold">404</span>
      <p className="text-base font-semibold">
        {intl.formatMessage({
          description: "NotFoundRoute: heading - page could not be found",
          defaultMessage: "Page could not be found",
          id: "njMWxp",
        })}
      </p>
      <p className="text-default-500 max-w-sm text-sm">
        {intl.formatMessage({
          description: "NotFoundRoute: body - page-not-found description",
          defaultMessage: "The page you're looking for doesn't exist or has been moved.",
          id: "PkMrnj",
        })}
      </p>
      <Button variant="primary" onPress={handleClick}>
        {intl.formatMessage({
          description: "NotFoundRoute: button - go to login",
          defaultMessage: "Go to login",
          id: "GkSHmr",
        })}
      </Button>
    </div>
  );
}
