import { type ReactElement, useEffect } from "react";
import { AppProviders } from "./AppProviders";
import { AppTheme } from "./AppTheme";
import { AppRoutes } from "./routes/AppRoutes";
import { RouteLoading } from "./routes/logic/RouteLoading";

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
    <AppProviders loadingFallback={<RouteLoading />}>
      {() => (
        <AppTheme>
          <AppRoutes />
        </AppTheme>
      )}
    </AppProviders>
  );
}
