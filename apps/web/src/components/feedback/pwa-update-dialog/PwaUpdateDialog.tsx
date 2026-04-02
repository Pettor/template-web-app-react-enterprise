import type { ReactElement } from "react";
import type { IntlShape } from "react-intl";

export function PwaUpdateDialogProps(
  intl: IntlShape,
  appName: string,
  onClose: () => void
): [ReactElement | string, { onClose: () => void }] {
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
    },
  ];
}
