import type { ReactElement } from "react";
import { Button } from "@heroui/react";
import { useIntl } from "react-intl";
import { useNotFoundPage } from "./UseNotFoundPage";

export function NotFoundPage(): ReactElement {
  const intl = useIntl();
  const { handleClick } = useNotFoundPage();

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
