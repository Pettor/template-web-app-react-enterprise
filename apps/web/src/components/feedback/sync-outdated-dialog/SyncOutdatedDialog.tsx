import type { ReactElement } from "react";
import type { toast } from "@heroui/react";
import type { IntlShape } from "react-intl";

/** The toast shown when a newer version of the app synced first and this one stopped syncing. */
export function SyncOutdatedDialogProps(
  intl: IntlShape,
  appName: string,
  onClose: () => void,
  onUpdate: () => void
): [ReactElement | string, options?: Parameters<typeof toast>[1]] {
  return [
    intl.formatMessage(
      {
        description: "SyncOutdatedDialog: toast - a newer version of the app has synced, so this one paused syncing",
        defaultMessage: "Sync paused: update {appName} to keep syncing",
        id: "uhG3jP",
      },
      { appName }
    ),
    {
      variant: "warning",
      timeout: 0,
      onClose,
      description: intl.formatMessage({
        description: "SyncOutdatedDialog: toast - explains why syncing stopped and what Update does",
        defaultMessage:
          "Another device synced with a newer version. Update to keep syncing; your changes stay here until then.",
        id: "uZ8KMn",
      }),
      actionProps: {
        children: intl.formatMessage({
          description: "SyncOutdatedDialog: button - load the newest version of the app",
          defaultMessage: "Update",
          id: "tv/aHl",
        }),
        onPress: onUpdate,
      },
    },
  ];
}
