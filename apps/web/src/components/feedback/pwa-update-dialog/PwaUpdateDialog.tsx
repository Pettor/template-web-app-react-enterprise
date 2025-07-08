import type { ComponentProps } from "react";
import { Button, type addToast } from "@heroui/react";
import type { IntlShape } from "react-intl";

export function PwaUpdateDialogProps(
  intl: IntlShape,
  appName: string,
  onClose: () => void,
  onUpdate: () => void
): ComponentProps<typeof addToast> {
  return {
    title: intl.formatMessage(
      {
        description: "PwaUpdateDialog - Update available description",
        defaultMessage: "A new version of {appName} is available",
        id: "Dbak+i",
      },
      {
        appName,
      }
    ),
    color: "secondary",
    endContent: (
      <Button color={"primary"} size="sm" onPress={onUpdate}>
        {intl.formatMessage({
          description: "PwaUpdateDialog - Update button",
          defaultMessage: "Update",
          id: "Blpjtp",
        })}
      </Button>
    ),
    onClose,
  };
}
