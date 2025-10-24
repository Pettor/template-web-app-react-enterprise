import type { ReactElement } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { NotFoundPage } from "~/pages/not-found/NotFoundPage";

export const Route = createFileRoute("/$")({
  component: NotFoundPageRoute,
});

function NotFoundPageRoute(): ReactElement {
  return <NotFoundPage />;
}
