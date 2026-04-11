import type { ReactElement } from "react";
import { Spinner } from "@heroui/react";

export function RouteLoading(): ReactElement {
  return (
    <div className="flex min-h-screen items-center justify-center" role="status" aria-label="Loading">
      <Spinner size="lg" />
    </div>
  );
}
