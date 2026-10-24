import { useState, type ChangeEvent, type ReactElement } from "react";
import { CheckIcon, ExclamationTriangleIcon } from "@heroicons/react/20/solid";
import { Button, Description, Input, Label, Link, Spinner, TextField } from "@heroui/react";
import { FormattedRelativeTime, useIntl } from "react-intl";
import { githubErrorText } from "./SettingsGitHubMessages";
import { useGitHubConnectForm } from "./UseGitHubConnectForm";
import type { SyncStatus } from "~/core/sync/SyncAtoms";
import type { GitHubConnectResult, GitHubCredentials } from "~/core/sync/UseSync";

const NEW_TOKEN_URL = "https://github.com/settings/personal-access-tokens/new";

export interface SettingsGitHubPanelProps {
  status: SyncStatus;
  onConnectGitHub: (credentials: GitHubCredentials) => Promise<GitHubConnectResult>;
  onSyncNow: () => void;
  now: number;
}

/** GitHub sync: either the connected repository's state, or the sign-in form. */
export function SettingsGitHubPanel({
  status,
  onConnectGitHub,
  onSyncNow,
  now,
}: SettingsGitHubPanelProps): ReactElement {
  const intl = useIntl();
  const connected = status.method === "github";
  const [isEditing, setIsEditing] = useState(false);

  if (!connected || isEditing) {
    return (
      <SettingsGitHubForm
        onConnect={onConnectGitHub}
        onConnected={() => setIsEditing(false)}
        onCancel={connected ? () => setIsEditing(false) : undefined}
      />
    );
  }

  const git = status.git;
  const minutes = git?.lastSyncedAt ? Math.round((Date.parse(git.lastSyncedAt) - now) / 60_000) : null;
  const errorText = git?.error ? (githubErrorText(intl, git.errorKind) ?? git.error) : null;

  return (
    <div className="bg-default/40 flex flex-col gap-3 rounded-xl p-4" data-testid="settings__github-connected">
      <span className="font-semibold">
        {intl.formatMessage({
          description: "SettingsGitHub: heading - the connected repository",
          defaultMessage: "GitHub repository",
          id: "zkc6kG",
        })}
      </span>
      <dl className="grid grid-cols-[max-content_minmax(0,1fr)] gap-x-4 gap-y-1.5 text-sm">
        <dt className="text-default-500">
          {intl.formatMessage({
            description: "SettingsGitHub: label - repository",
            defaultMessage: "Repository",
            id: "mDCCy3",
          })}
        </dt>
        <dd className="truncate font-mono">{git?.remoteUrl ?? status.folderName}</dd>
        <dt className="text-default-500">
          {intl.formatMessage({
            description: "SettingsGitHub: label - branch",
            defaultMessage: "Branch",
            id: "Y8aqJv",
          })}
        </dt>
        <dd className="font-mono">{git?.branch ?? "…"}</dd>
      </dl>
      <p className="text-default-500 text-sm">
        {intl.formatMessage({
          description: "SettingsGitHub: body - explains the sync schedule",
          defaultMessage:
            "Checks for changes when the app opens and every minute while it's open. Commits a few seconds after your last change and when you leave the app.",
          id: "ZbyiqP",
        })}
      </p>
      {errorText ? (
        <span className="text-danger flex items-start gap-2 text-sm" data-testid="settings__github-error">
          <ExclamationTriangleIcon className="mt-0.5 size-4 shrink-0" aria-hidden />
          <span className="break-words">{errorText}</span>
        </span>
      ) : minutes !== null ? (
        <span className="text-success flex items-center gap-2 text-sm">
          <CheckIcon className="size-4" aria-hidden />
          {intl.formatMessage({
            description: "SettingsGitHub: status - prefix before when the last sync with GitHub happened",
            defaultMessage: "Synced with GitHub",
            id: "h3wYgC",
          })}{" "}
          <FormattedRelativeTime value={Math.min(0, minutes)} unit="minute" numeric="auto" />
        </span>
      ) : null}
      <div className="flex flex-wrap gap-2">
        <Button variant="secondary" onPress={onSyncNow} data-testid="settings__github-sync-now">
          {intl.formatMessage({
            description: "SettingsGitHub: button - sync immediately",
            defaultMessage: "Sync now",
            id: "xzXQsn",
          })}
        </Button>
        <Button variant="secondary" onPress={() => setIsEditing(true)} data-testid="settings__github-change">
          {intl.formatMessage({
            description: "SettingsGitHub: button - change the repository or token",
            defaultMessage: "Change repository or token…",
            id: "0xbhFk",
          })}
        </Button>
      </div>
    </div>
  );
}

interface SettingsGitHubFormProps {
  onConnect: (credentials: GitHubCredentials) => Promise<GitHubConnectResult>;
  onConnected: () => void;
  /** Shown when already connected, to go back without changing anything. */
  onCancel?: () => void;
}

function SettingsGitHubForm({ onConnect, onConnected, onCancel }: SettingsGitHubFormProps): ReactElement {
  const intl = useIntl();
  const form = useGitHubConnectForm(onConnect, onConnected);

  return (
    <div className="bg-default/40 flex flex-col gap-3 rounded-xl p-4" data-testid="settings__github-setup">
      <span className="font-semibold">
        {intl.formatMessage({
          description: "SettingsGitHub: heading - the sign-in form",
          defaultMessage: "Connect a GitHub repository",
          id: "ceYVzv",
        })}
      </span>
      <p className="text-default-500 text-sm">
        {intl.formatMessage({
          description: "SettingsGitHub: body - explains what the form is for",
          defaultMessage:
            "Syncs straight with GitHub, so it works on your phone and in any browser. Use a private repository; an empty one is fine.",
          id: "Mr/hlJ",
        })}
      </p>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <TextField className="flex min-w-0 flex-col gap-1">
          <Label className="text-xs">
            {intl.formatMessage({
              description: "SettingsGitHub: label - username field",
              defaultMessage: "GitHub username",
              id: "PP523e",
            })}
          </Label>
          <Input
            value={form.owner}
            autoComplete="username"
            autoCapitalize="none"
            spellCheck={false}
            placeholder="you"
            data-testid="settings__github-owner"
            onChange={(event: ChangeEvent<HTMLInputElement>) => form.setOwner(event.target.value)}
          />
        </TextField>
        <TextField className="flex min-w-0 flex-col gap-1">
          <Label className="text-xs">
            {intl.formatMessage({
              description: "SettingsGitHub: label - repository field",
              defaultMessage: "Repository",
              id: "Wxb4Yw",
            })}
          </Label>
          <Input
            value={form.repository}
            autoCapitalize="none"
            spellCheck={false}
            placeholder="app-data"
            className="font-mono"
            data-testid="settings__github-repository"
            onChange={(event: ChangeEvent<HTMLInputElement>) => form.setRepository(event.target.value)}
          />
        </TextField>
      </div>
      <TextField className="flex min-w-0 flex-col gap-1">
        <Label className="text-xs">
          {intl.formatMessage({
            description: "SettingsGitHub: label - access token field (used instead of a password)",
            defaultMessage: "Personal access token",
            id: "cOmkOU",
          })}
        </Label>
        <Input
          type="password"
          value={form.token}
          autoComplete="current-password"
          spellCheck={false}
          placeholder="github_pat_…"
          className="font-mono"
          data-testid="settings__github-token"
          onChange={(event: ChangeEvent<HTMLInputElement>) => form.setToken(event.target.value)}
        />
        <Description className="text-xs">
          {intl.formatMessage(
            {
              description: "SettingsGitHub: help - why a token is needed instead of a password, and how to make one",
              defaultMessage:
                "GitHub doesn't accept passwords for this. {link} with access to only this repository and Contents set to Read and write. It's stored in this browser only.",
              id: "qmKZK/",
            },
            {
              link: (
                <Link href={NEW_TOKEN_URL} target="_blank" rel="noreferrer" className="text-xs">
                  {intl.formatMessage({
                    description: "SettingsGitHub: link - GitHub's page for creating a fine-grained token",
                    defaultMessage: "Create a fine-grained token",
                    id: "sLu6Yt",
                  })}
                </Link>
              ),
            }
          )}
        </Description>
      </TextField>
      {form.error && (
        <span className="text-danger flex items-start gap-2 text-sm" data-testid="settings__github-connect-error">
          <ExclamationTriangleIcon className="mt-0.5 size-4 shrink-0" aria-hidden />
          <span className="break-words">{form.error}</span>
        </span>
      )}
      <div className="flex flex-wrap gap-2">
        <Button
          isDisabled={!form.isComplete || form.isConnecting}
          onPress={() => void form.connect()}
          data-testid="settings__github-connect"
        >
          {form.isConnecting && <Spinner size="sm" />}
          {intl.formatMessage({
            description: "SettingsGitHub: button - checks the token and connects the repository",
            defaultMessage: "Connect",
            id: "hoGCnG",
          })}
        </Button>
        {onCancel && (
          <Button variant="secondary" onPress={onCancel}>
            {intl.formatMessage({
              description: "SettingsGitHub: button - leave the form without changing the connection",
              defaultMessage: "Cancel",
              id: "/FLzmf",
            })}
          </Button>
        )}
      </div>
    </div>
  );
}
