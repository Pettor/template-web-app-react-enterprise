import { type ReactElement, useEffect } from "react";
import { AppProviders } from "./AppProviders";
import { AppTheme } from "./AppTheme";
import { AppRoutes } from "./routes/AppRoutes";
import { SettingsModalModule } from "~/components/modules/settings-modal/SettingsModalModule";

export function App(): ReactElement {
  function handlePreloadError(): void {
    // Used if Vite has issue loading chunks
    window.location.reload();
  }

  useEffect(() => {
    window.addEventListener("vite:preloadError", handlePreloadError);

    return () => {
      window.removeEventListener("vite:preloadError", handlePreloadError);
    };
  }, []);

  return (
    <AppProviders>
      <AppTheme>
        <AppRoutes />
      </AppTheme>
      <SettingsModalModule />
    </AppProviders>
  );
}
