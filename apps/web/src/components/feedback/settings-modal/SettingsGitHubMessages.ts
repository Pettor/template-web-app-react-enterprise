import type { IntlShape } from "react-intl";
import type { GitHubErrorKind } from "~/core/sync/GitHubBackend";
import type { GitHubConnectResult } from "~/core/sync/UseSync";

/** Explains a GitHub sync problem in words the user can act on. */
export function githubErrorText(intl: IntlShape, kind: GitHubErrorKind | undefined): string | null {
  switch (kind) {
    case "unauthorized":
      return intl.formatMessage({
        description: "SettingsGitHub: error - GitHub rejects the access token",
        defaultMessage: "GitHub didn't accept the token. It may be mistyped, expired or revoked.",
        id: "M9YBXd",
      });
    case "not-found":
      return intl.formatMessage({
        description: "SettingsGitHub: error - the repository can't be found",
        defaultMessage:
          "Repository not found. Check the username and repository name, and that the token has access to it.",
        id: "QT4CUg",
      });
    case "forbidden":
      return intl.formatMessage({
        description: "SettingsGitHub: error - the token lacks permission",
        defaultMessage: "The token isn't allowed to do this. Give it read and write access to Contents.",
        id: "RlMoUY",
      });
    case "rate-limited":
      return intl.formatMessage({
        description: "SettingsGitHub: error - GitHub's API rate limit is reached",
        defaultMessage: "GitHub's request limit was reached. Sync resumes automatically in a while.",
        id: "nIADNC",
      });
    case "conflict":
      return intl.formatMessage({
        description: "SettingsGitHub: error - other devices kept pushing during sync",
        defaultMessage: "Another device kept pushing at the same time. Sync tries again shortly.",
        id: "zPKW4v",
      });
    case "network":
      return intl.formatMessage({
        description: "SettingsGitHub: error - GitHub can't be reached",
        defaultMessage: "Couldn't reach GitHub. Your changes are kept and sync when you're back online.",
        id: "RefT0L",
      });
    default:
      return null;
  }
}

/** Why connecting didn't work, or `null` once connected. */
export function githubConnectText(intl: IntlShape, outcome: GitHubConnectResult): string | null {
  switch (outcome.result) {
    case "connected":
      return null;
    case "public":
      return intl.formatMessage({
        description: "SettingsGitHub: error - the repository is public",
        defaultMessage:
          "That repository is public, so anyone could read your data. Make it private on GitHub, then connect again.",
        id: "O/Aotz",
      });
    case "read-only":
      return intl.formatMessage({
        description: "SettingsGitHub: error - the token can only read the repository",
        defaultMessage:
          "The token can only read this repository. Edit it on GitHub and set Contents to Read and write.",
        id: "ScZxDM",
      });
    case "error":
      return githubErrorText(intl, outcome.errorKind) ?? outcome.detail;
  }
}
