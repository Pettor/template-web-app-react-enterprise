import { useRouter } from "@tanstack/react-router";
import type { AboutViewProps } from "~/components/views/about/AboutView";
import { useAppInfo } from "~/core/config/UseAppInfo";

export function useAboutPage(serverVersion: string): AboutViewProps {
  const { appName } = useAppInfo();
  const router = useRouter();

  function handleOnBack(): void {
    router.history.back();
  }

  return { appVersion: import.meta.env.VITE_APP_VERSION, serverVersion, appName, onBack: handleOnBack };
}
