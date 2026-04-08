import type { ReactElement, ReactNode } from "react";
import { useState, useEffect } from "react";
import { usePostRefreshTokenMutate } from "@package/api";
import { useSetAtom } from "jotai";
import { authStatusAtom } from "~/atoms/AuthAtoms";

export interface AuthInitializerProps {
  children: ReactNode;
  fallback?: ReactNode;
}

/**
 * Initializes authentication by attempting to refresh the token on mount.
 * Blocks rendering of children until auth status has been determined.
 */
export function AuthInitializer({ children, fallback = null }: AuthInitializerProps): ReactElement {
  const [ready, setReady] = useState(false);
  const setAuthStatus = useSetAtom(authStatusAtom);
  const { mutateAsync: refreshToken } = usePostRefreshTokenMutate();

  useEffect(() => {
    async function initializeAuth(): Promise<void> {
      try {
        await refreshToken();
        setAuthStatus("authenticated");
      } catch {
        setAuthStatus("unauthenticated");
      }
      setReady(true);
    }

    void initializeAuth();
  }, [refreshToken, setAuthStatus]);

  if (!ready) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}
