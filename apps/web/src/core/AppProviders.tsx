import type { ReactElement, ReactNode } from "react";
import { HeroUIProvider } from "@heroui/react";
import { ToastProvider } from "@heroui/toast";
import { validateCrypto } from "@package/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppLocales } from "./AppLocales";
import { AuthInitializer } from "./auth/AuthInitializer";
import { AuthProvider } from "./auth/AuthProvider";
import { PwaProviderModule } from "~/components/modules/pwa-provider-module/PwaProviderModule";

const queryClient = new QueryClient();

export interface AppProvidersProps {
  children: (authStatus: "authenticated" | "unauthenticated") => ReactNode;
  loadingFallback?: ReactNode;
}

export function AppProviders({ children, loadingFallback }: AppProvidersProps): ReactElement {
  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  typeof window !== "undefined" && validateCrypto();
  return (
    <HeroUIProvider>
      <ToastProvider />
      <AppLocales>
        <PwaProviderModule>
          <QueryClientProvider client={queryClient}>
            <AuthInitializer fallback={loadingFallback}>
              {(authStatus) => <AuthProvider initialAuthStatus={authStatus}>{children(authStatus)}</AuthProvider>}
            </AuthInitializer>
          </QueryClientProvider>
        </PwaProviderModule>
      </AppLocales>
    </HeroUIProvider>
  );
}
