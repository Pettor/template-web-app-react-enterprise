import type { IntlShape } from "react-intl";

export function PwaOfflineDialogProps(intl: IntlShape, onClose: () => void): [string, { onClose: () => void }] {
  return [
    intl.formatMessage({
      description: "PwaOfflineDialog: toast - ready to work offline",
      defaultMessage: "Ready to work offline",
      id: "Q9Hkx1",
    }),
    { onClose },
  ];
}
