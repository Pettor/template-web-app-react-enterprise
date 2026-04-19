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
        description: "PwaUpdateDialog: toast - update available",
        defaultMessage: "A new version of {appName} is available",
        id: "WMIsMz",
      },
      {
        appName,
      }
    ),
    {
      onClose,
      actionProps: {
        children: intl.formatMessage({
          description: "PwaUpdateDialog: button - update",
          defaultMessage: "Update",
          id: "kaheVZ",
        }),
        onPress: onRefresh,
      },
    },
  ];
}
