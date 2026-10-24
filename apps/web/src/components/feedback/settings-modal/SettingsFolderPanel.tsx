import type { ReactElement } from "react";
import { CheckIcon, ExclamationTriangleIcon } from "@heroicons/react/20/solid";
import { Button } from "@heroui/react";
import { useIntl } from "react-intl";
import type { SyncStatus } from "~/core/sync/SyncAtoms";

export interface SettingsFolderPanelProps {
  status: SyncStatus;
  onChooseFolder: () => void;
  onReconnect: () => void;
  onSyncNow: () => void;
}

/** Folder sync: the connected folder, and the Git clone it lives in, if any. */
export function SettingsFolderPanel({
  status,
  onChooseFolder,
  onReconnect,
  onSyncNow,
}: SettingsFolderPanelProps): ReactElement {
  const intl = useIntl();
  const clone = status.git?.isLocalClone ? status.git : undefined;

  return (
    <div className="bg-default/40 flex flex-col gap-3 rounded-xl p-4" data-testid="settings__folder-connected">
      <span className="font-semibold">
        {clone
          ? intl.formatMessage({
              description: "SettingsFolder: heading - the connected folder is a Git clone",
              defaultMessage: "Local Git repository",
              id: "nwqn/k",
            })
          : intl.formatMessage({
              description: "SettingsFolder: heading - the connected folder",
              defaultMessage: "Data folder",
              id: "t/YAcH",
            })}
      </span>
      <dl className="grid grid-cols-[max-content_minmax(0,1fr)] gap-x-4 gap-y-1.5 text-sm">
        <dt className="text-default-500">
          {intl.formatMessage({
            description: "SettingsFolder: label - folder name",
            defaultMessage: "Folder",
            id: "JLEm9w",
          })}
        </dt>
        <dd className="truncate font-mono">{status.folderName ?? "…"}</dd>
        {clone && (
          <>
            <dt className="text-default-500">
              {intl.formatMessage({
                description: "SettingsFolder: label - the clone's branch",
                defaultMessage: "Branch",
                id: "asbxoh",
              })}
            </dt>
            <dd className="font-mono">{clone.branch ?? "…"}</dd>
            <dt className="text-default-500">
              {intl.formatMessage({
                description: "SettingsFolder: label - the clone's remote URL",
                defaultMessage: "Remote",
                id: "TZS2cz",
              })}
            </dt>
            <dd className="truncate font-mono">
              {clone.remoteUrl ??
                intl.formatMessage({
                  description: "SettingsFolder: value - the clone has no remote",
                  defaultMessage: "none",
                  id: "v3dYED",
                })}
            </dd>
          </>
        )}
      </dl>
      <p className="text-default-500 text-sm">
        {clone
          ? intl.formatMessage({
              description: "SettingsFolder: body - how syncing works with a local Git clone",
              defaultMessage:
                "The app keeps the files in this clone up to date. Browsers can't run Git, so commit, pull and push with your own Git tools; the app picks up pulled changes within seconds.",
              id: "zGaSBW",
            })
          : intl.formatMessage({
              description: "SettingsFolder: body - how syncing works with a plain folder",
              defaultMessage:
                "Put the folder inside OneDrive, iCloud Drive or Dropbox to share it between computers, or make it a Git clone to keep its history.",
              id: "zE2uS5",
            })}
      </p>
      {status.state === "synced" && (
        <span className="text-success flex items-center gap-2 text-sm">
          <CheckIcon className="size-4" aria-hidden />
          {intl.formatMessage({
            description: "SettingsFolder: status - the folder is being watched",
            defaultMessage: "Watching the folder for changes.",
            id: "q/80Ry",
          })}
        </span>
      )}
      {status.state === "needs-permission" && (
        <span className="text-warning flex items-center gap-2 text-sm">
          <ExclamationTriangleIcon className="size-4" aria-hidden />
          {intl.formatMessage({
            description: "SettingsFolder: status - the browser needs permission again",
            defaultMessage: "The browser needs your permission again to open this folder.",
            id: "ZDuq7Z",
          })}
        </span>
      )}
      {status.state === "error" && (
        <span className="text-danger flex items-start gap-2 text-sm">
          <ExclamationTriangleIcon className="mt-0.5 size-4 shrink-0" aria-hidden />
          <span className="break-words">{status.error}</span>
        </span>
      )}
      <div className="flex flex-wrap gap-2">
        {status.state === "needs-permission" ? (
          <Button onPress={onReconnect} data-testid="settings__folder-reconnect">
            {intl.formatMessage({
              description: "SettingsFolder: button - grant folder access again",
              defaultMessage: "Reconnect",
              id: "dlnfc4",
            })}
          </Button>
        ) : (
          <Button variant="secondary" onPress={onSyncNow} data-testid="settings__folder-sync-now">
            {intl.formatMessage({
              description: "SettingsFolder: button - sync immediately",
              defaultMessage: "Sync now",
              id: "gvu6he",
            })}
          </Button>
        )}
        <Button variant="secondary" onPress={onChooseFolder}>
          {intl.formatMessage({
            description: "SettingsFolder: button - pick a different folder",
            defaultMessage: "Choose another folder…",
            id: "dgSapA",
          })}
        </Button>
      </div>
    </div>
  );
}
