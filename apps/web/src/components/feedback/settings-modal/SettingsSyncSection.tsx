import type { ChangeEvent, ReactElement } from "react";
import { ExclamationTriangleIcon } from "@heroicons/react/20/solid";
import { Alert, Description, Input, Label, Radio, RadioGroup, TextField } from "@heroui/react";
import { useIntl } from "react-intl";
import { SettingsFolderPanel } from "./SettingsFolderPanel";
import { SettingsGitHubPanel } from "./SettingsGitHubPanel";
import { useSettingsSyncSection } from "./UseSettingsSyncSection";
import type { SyncMethod, SyncStatus } from "~/core/sync/SyncAtoms";
import type { FolderConnectResult, GitHubConnectResult, GitHubCredentials } from "~/core/sync/UseSync";

export interface SettingsSyncSectionProps {
  status: SyncStatus;
  /** Folders can be opened here: Chrome, Edge or another Chromium browser on a computer. */
  isFolderSupported: boolean;
  deviceName: string;
  onConnectFolder: () => Promise<FolderConnectResult>;
  onConnectGitHub: (credentials: GitHubCredentials) => Promise<GitHubConnectResult>;
  onReconnect: () => void;
  onDisconnect: () => void;
  onSyncNow: () => void;
  onDeviceNameChange: (name: string) => void;
  /** Rendered at this time; injected so stories are stable. */
  now?: number;
}

export function SettingsSyncSection({
  status,
  isFolderSupported,
  deviceName,
  onConnectFolder,
  onConnectGitHub,
  onReconnect,
  onDisconnect,
  onSyncNow,
  onDeviceNameChange,
  now = Date.now(),
}: SettingsSyncSectionProps): ReactElement {
  const intl = useIntl();
  const { method, folderFailed, selectMethod, chooseFolder, finishSetup } = useSettingsSyncSection(
    status,
    onConnectFolder,
    onDisconnect
  );

  const options: { value: SyncMethod; title: string; body: string; isDisabled?: boolean }[] = [
    {
      value: "folder",
      title: intl.formatMessage({
        description: "SettingsSyncSection: option title - local folder or Git clone",
        defaultMessage: "Local folder or Git repo",
        id: "QliWl5",
      }),
      body: intl.formatMessage({
        description: "SettingsSyncSection: option body - local folder or Git clone",
        defaultMessage:
          "A folder on this computer: a local Git clone, or one inside OneDrive, iCloud Drive or Dropbox.",
        id: "JKsIu/",
      }),
      isDisabled: !isFolderSupported,
    },
    {
      value: "github",
      title: intl.formatMessage({
        description: "SettingsSyncSection: option title - GitHub",
        defaultMessage: "GitHub",
        id: "yZTstX",
      }),
      body: intl.formatMessage({
        description: "SettingsSyncSection: option body - GitHub",
        defaultMessage: "A private GitHub repository, straight from the app. Works on phones and in any browser.",
        id: "7P1es7",
      }),
    },
    {
      value: "local",
      title: intl.formatMessage({
        description: "SettingsSyncSection: option title - no sync",
        defaultMessage: "This browser only",
        id: "61w1qN",
      }),
      body: intl.formatMessage({
        description: "SettingsSyncSection: option body - no sync",
        defaultMessage: "Stored on this device, no sync. Switch any time.",
        id: "XKpUgz",
      }),
    },
  ];

  return (
    <div className="flex flex-col gap-4 pb-4">
      <p className="text-lg font-semibold">
        {intl.formatMessage({
          description: "SettingsSyncSection: heading - section title",
          defaultMessage: "Sync",
          id: "LrVYpk",
        })}
      </p>
      <p className="text-default-500 text-sm">
        {intl.formatMessage({
          description: "SettingsSyncSection: body - section description",
          defaultMessage:
            "Your data is plain JSON files, one per record. Point each device at the same folder or GitHub repository to keep them in sync.",
          id: "Gv0Gl6",
        })}
      </p>

      {!isFolderSupported && status.method !== "github" && (
        <Alert status="warning">
          <Alert.Indicator />
          <Alert.Content>
            <Alert.Title>
              {intl.formatMessage({
                description: "SettingsSyncSection: warning title - the browser can't open folders",
                defaultMessage: "Folder sync needs Chrome or Edge on a computer",
                id: "SbQfCF",
              })}
            </Alert.Title>
            <Alert.Description>
              {intl.formatMessage({
                description: "SettingsSyncSection: warning body - the browser can't open folders",
                defaultMessage: "This browser can't open folders. Sync through GitHub instead, or keep your data here.",
                id: "lqim44",
              })}
            </Alert.Description>
          </Alert.Content>
        </Alert>
      )}

      <RadioGroup
        value={method}
        onChange={selectMethod}
        aria-label={intl.formatMessage({
          description: "SettingsSyncSection: aria-label - sync method picker",
          defaultMessage: "Sync method",
          id: "SFoHrn",
        })}
        className="flex flex-col gap-2"
      >
        {options.map((option) => (
          <Radio
            key={option.value}
            value={option.value}
            isDisabled={option.isDisabled}
            data-testid={`settings__sync-${option.value}`}
            className="bg-default/40 data-[selected=true]:border-accent data-[selected=true]:bg-accent/10 items-start gap-3 rounded-xl border-2 border-transparent p-3"
          >
            <Radio.Content className="flex items-start gap-3">
              <Radio.Control className="mt-0.5">
                <Radio.Indicator />
              </Radio.Control>
              <span className="flex flex-col gap-0.5">
                <span className="font-semibold">{option.title}</span>
                <span className="text-default-500 text-sm font-normal">{option.body}</span>
              </span>
            </Radio.Content>
          </Radio>
        ))}
      </RadioGroup>

      {folderFailed && (
        <span className="text-danger flex items-start gap-2 text-sm" data-testid="settings__folder-error">
          <ExclamationTriangleIcon className="mt-0.5 size-4 shrink-0" aria-hidden />
          {intl.formatMessage({
            description: "SettingsSyncSection: error - the chosen folder couldn't be opened",
            defaultMessage: "Couldn't open that folder. Pick a folder you can write to, outside system folders.",
            id: "dHyH5P",
          })}
        </span>
      )}

      {method === "folder" && status.method === "folder" && (
        <SettingsFolderPanel
          status={status}
          onChooseFolder={chooseFolder}
          onReconnect={onReconnect}
          onSyncNow={onSyncNow}
        />
      )}

      {method === "github" && (
        <SettingsGitHubPanel
          status={status}
          onConnectGitHub={async (credentials) => {
            const outcome = await onConnectGitHub(credentials);
            if (outcome.result === "connected") {
              finishSetup();
            }
            return outcome;
          }}
          onSyncNow={onSyncNow}
          now={now}
        />
      )}

      {status.method === "github" && (
        <TextField className="flex max-w-sm flex-col gap-1">
          <Label className="font-semibold">
            {intl.formatMessage({
              description: "SettingsSyncSection: label - device name field",
              defaultMessage: "This device's name",
              id: "XlHfwK",
            })}
          </Label>
          <Input
            value={deviceName}
            data-testid="settings__sync-device-name"
            onChange={(event: ChangeEvent<HTMLInputElement>) => onDeviceNameChange(event.target.value)}
          />
          <Description>
            {intl.formatMessage({
              description: "SettingsSyncSection: help - what the device name is used for",
              defaultMessage: "Shown in the commit messages this device makes.",
              id: "t9TKrg",
            })}
          </Description>
        </TextField>
      )}

      <p className="text-default-500 text-sm">
        {intl.formatMessage(
          {
            description: "SettingsSyncSection: body - explains how conflicts are resolved",
            defaultMessage:
              "Conflicts: every record is its own file with {updatedAt}, so two devices editing different records never collide. Same record edited on both: the newest wins, the other is kept in {conflicts}. {agents} in the folder explains the format to people and AI agents.",
            id: "PimMEt",
          },
          {
            updatedAt: <code className="font-mono">updatedAt</code>,
            conflicts: <code className="font-mono">.conflicts/</code>,
            agents: <code className="font-mono">AGENTS.md</code>,
          }
        )}
        {!!status.conflicts &&
          ` ${intl.formatMessage(
            {
              description: "SettingsSyncSection: status - conflicts resolved since sync started",
              defaultMessage: "{count, plural, one {# conflict} other {# conflicts}} resolved this session.",
              id: "7RlQDh",
            },
            { count: status.conflicts }
          )}`}
      </p>
    </div>
  );
}
