import type { ComponentProps } from "react";
import type { addToast } from "@heroui/react";
import type { IntlShape } from "react-intl";

export function PwaOfflineDialogProps(intl: IntlShape, onClose: () => void): ComponentProps<typeof addToast> {
  return {
    title: intl.formatMessage({
      description: "PwaOfflineDialog- Ready to work offline description",
      defaultMessage: "Ready to work offline",
      id: "HQHLM4",
    }),
    color: "primary",
    onClose,
  };
}
