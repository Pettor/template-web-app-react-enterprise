import type { IntlShape } from "react-intl";

export function PwaOfflineDialogProps(intl: IntlShape, onClose: () => void): [string, { onClose: () => void }] {
  return [
    intl.formatMessage({
      description: "PwaOfflineDialog- Ready to work offline description",
      defaultMessage: "Ready to work offline",
      id: "HQHLM4",
    }),
    { onClose },
  ];
}
