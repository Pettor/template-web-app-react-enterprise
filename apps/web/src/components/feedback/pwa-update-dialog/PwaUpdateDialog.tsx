import type { ReactElement } from "react";
import type { toast } from "@heroui/react";
import type { IntlShape } from "react-intl";

export function PwaUpdateDialogProps(
  intl: IntlShape,
  appName: string,
  onClose: () => void,
  onRefresh: () => void
): [ReactElement | string, options?: Parameters<typeof toast>[1]] {
  return [
    intl.formatMessage(
      {
        description: "PwaUpdateDialog - Update available description",
        defaultMessage: "A new version of {appName} is available",
        id: "Dbak+i",
      },
      {
        appName,
      }
    ),
    {
      onClose,
      actionProps: {
        children: intl.formatMessage({
          description: "PwaUpdateDialog - Update available action",
          defaultMessage: "Update",
          id: "LZF+Z8",
        }),
        onPress: onRefresh,
      },
    },
  ];
}
