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
    <div>
      <span className="text-base font-semibold">
        {intl.formatMessage({
          description: "NotFoundPage - Message",
          defaultMessage: "404 - Page could not be found",
          id: "+LJQ+U",
        })}
      </span>
      <Button onPress={handleClick}>
        {intl.formatMessage({
          description: "NotFoundPage - Button",
          defaultMessage: "Click",
          id: "0259Tx",
        })}
      </Button>
    </div>
  );
}
