import { useState } from "react";
import { useIntl } from "react-intl";
import { githubConnectText } from "./SettingsGitHubMessages";
import type { GitHubConnectResult, GitHubCredentials } from "~/core/sync/UseSync";

export interface UseGitHubConnectFormResult {
  owner: string;
  repository: string;
  token: string;
  setOwner: (value: string) => void;
  setRepository: (value: string) => void;
  setToken: (value: string) => void;
  /** Enough is filled in to try connecting. */
  isComplete: boolean;
  isConnecting: boolean;
  /** Why the last attempt failed, ready to show. */
  error: string | null;
  connect: () => Promise<void>;
}

export function useGitHubConnectForm(
  onConnect: (credentials: GitHubCredentials) => Promise<GitHubConnectResult>,
  onConnected: () => void
): UseGitHubConnectFormResult {
  const intl = useIntl();
  const [owner, setOwner] = useState("");
  const [repository, setRepository] = useState("");
  const [token, setToken] = useState("");
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isComplete =
    repository.trim() !== "" && token.trim() !== "" && (owner.trim() !== "" || repository.includes("/"));

  async function connect(): Promise<void> {
    setIsConnecting(true);
    setError(null);
    try {
      const message = githubConnectText(intl, await onConnect({ owner, repository, token }));
      setError(message);
      if (message === null) {
        setToken("");
        onConnected();
      }
    } finally {
      setIsConnecting(false);
    }
  }

  return {
    owner,
    repository,
    token,
    setOwner,
    setRepository,
    setToken,
    isComplete,
    isConnecting,
    error,
    connect,
  };
}
