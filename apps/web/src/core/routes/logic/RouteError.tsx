import type { ReactElement } from "react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { Button } from "@heroui/react";
import { useRouter } from "@tanstack/react-router";
import { useIntl } from "react-intl";

interface RouteErrorProps {
  error?: Error;
}

export function RouteError({ error }: RouteErrorProps): ReactElement {
  const intl = useIntl();
  const router = useRouter();

  function handleRetry(): void {
    router.invalidate();
  }

  const title = intl.formatMessage({
    description: "RouteError: heading - error title",
    defaultMessage: "Something went wrong",
    id: "lY27zk",
  });

  const description = intl.formatMessage({
    description: "RouteError: body - error description",
    defaultMessage: "An unexpected error occurred. Please try again.",
    id: "O+ukwO",
  });

  const retryLabel = intl.formatMessage({
    description: "RouteError: button - retry",
    defaultMessage: "Try again",
    id: "xUgKrt",
  });

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 p-6 text-center">
      <ExclamationTriangleIcon className="text-warning h-12 w-12" aria-hidden="true" />
      <h1 className="text-xl font-semibold">{title}</h1>
      <p className="text-default-500 max-w-sm text-sm">{description}</p>
      {error?.message && (
        <p className="text-danger bg-danger-50 max-w-sm rounded-md px-3 py-2 font-mono text-xs" role="alert">
          {error.message}
        </p>
      )}
      <Button variant="primary" onPress={handleRetry}>
        {retryLabel}
      </Button>
    </div>
  );
}
