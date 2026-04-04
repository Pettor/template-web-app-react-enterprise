import type { ReactElement } from "react";
import { Button } from "@heroui/react";
import { useIntl } from "react-intl";
import { useNotFoundPage } from "./UseNotFoundPage";

export function NotFoundPage(): ReactElement {
  const intl = useIntl();
  const { handleClick } = useNotFoundPage();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 p-4 text-center">
      <p className="text-foreground/20 text-6xl font-bold">404</p>
      <span className="text-lg font-semibold">
        {intl.formatMessage({
          description: "NotFoundPage - Message",
          defaultMessage: "404 - Page could not be found",
          id: "+LJQ+U",
        })}
      </span>
      <Button variant="primary" onPress={handleClick}>
        {intl.formatMessage({
          description: "NotFoundPage - Button",
          defaultMessage: "Click",
          id: "0259Tx",
        })}
      </Button>
    </div>
  );
}
