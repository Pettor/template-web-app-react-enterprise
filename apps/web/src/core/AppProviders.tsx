import type { ReactElement } from "react";
import { ToastProvider } from "@heroui/react";
import { validateCrypto } from "@package/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppLocales } from "./AppLocales";
import { AuthProvider } from "./auth/AuthProvider";
import { PwaProviderModule } from "~/components/modules/pwa-provider-module/PwaProviderModule";

const queryClient = new QueryClient();

export interface AppProvidersProps {
  children: ReactElement;
}

export function AppProviders({ children }: AppProvidersProps): ReactElement {
  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  typeof window !== "undefined" && validateCrypto();
  return (
    <>
      <ToastProvider />
      <AppLocales>
        <PwaProviderModule>
          <QueryClientProvider client={queryClient}>
            <AuthProvider>{children}</AuthProvider>
          </QueryClientProvider>
        </PwaProviderModule>
      </AppLocales>
    </>
  );
}
