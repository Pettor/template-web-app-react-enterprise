import type { ReactElement } from "react";
import type { IntlShape } from "react-intl";
import { toast } from "@heroui/react";

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
          id: "qj8n2b",
        }),
        onPress: onRefresh,
      },
    },
  ];
}
