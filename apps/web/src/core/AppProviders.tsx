import type { ReactElement, ReactNode } from "react";
import { ToastProvider } from "@heroui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppLocales } from "./AppLocales";
import { PwaLifecycle } from "./pwa/PwaLifecycle";

const queryClient = new QueryClient();

export interface AppProvidersProps {
  children: ReactNode;
}

export function AppProviders({ children }: AppProvidersProps): ReactElement {
  return (
    <>
      <ToastProvider />
      <AppLocales>
        <PwaLifecycle>
          <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
        </PwaLifecycle>
      </AppLocales>
    </>
  );
}
