import type { ReactElement, ReactNode } from "react";
import { ToastProvider } from "@heroui/react";
import { validateCrypto } from "@package/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppLocales } from "./AppLocales";
import { AuthInitializer } from "./auth/AuthInitializer";
import { PwaProviderModule } from "~/components/modules/pwa-provider-module/PwaProviderModule";

const queryClient = new QueryClient();

export interface AppProvidersProps {
  children: ReactNode;
  loadingFallback?: ReactNode;
}

export function AppProviders({ children, loadingFallback }: AppProvidersProps): ReactElement {
  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  typeof window !== "undefined" && validateCrypto();
  return (
    <>
      <ToastProvider />
      <AppLocales>
        <PwaProviderModule>
          <QueryClientProvider client={queryClient}>
            <AuthInitializer fallback={loadingFallback}>{children}</AuthInitializer>
          </QueryClientProvider>
        </PwaProviderModule>
      </AppLocales>
    </>
  );
}
