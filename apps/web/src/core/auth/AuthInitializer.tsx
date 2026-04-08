import type { ReactElement, ReactNode } from "react";
import { useState, useEffect } from "react";
import { usePostRefreshTokenMutate } from "@package/api";

export interface AuthInitializerProps {
  children: (authStatus: "authenticated" | "unauthenticated") => ReactNode;
  fallback?: ReactNode;
}

/**
 * Component that initializes authentication by attempting to refresh the token.
 * Only renders children once auth status has been determined.
 */
export function AuthInitializer({ children, fallback = null }: AuthInitializerProps): ReactElement {
  const [authStatus, setAuthStatus] = useState<"authenticated" | "unauthenticated" | null>(null);
  const { mutateAsync: refreshToken } = usePostRefreshTokenMutate();

  useEffect(() => {
    async function initializeAuth(): Promise<void> {
      try {
        // Attempt to refresh token on app load to check if user is logged in
        await refreshToken();
        setAuthStatus("authenticated");
      } catch {
        // If refresh fails, user is not authenticated
        setAuthStatus("unauthenticated");
      }
    }

    void initializeAuth();
  }, [refreshToken]);

  // Show fallback while determining auth status
  if (authStatus === null) {
    return <>{fallback}</>;
  }

  // Once auth status is determined, render children with the status
  return <>{children(authStatus)}</>;
}
