import type { ReactElement } from "react";
import { useDocumentTitle } from "@package/react";
import { createFileRoute } from "@tanstack/react-router";
import { useNotesRoute } from "./-UseNotesRoute";
import { CommandPaletteController } from "~/components/actions/command-palette/CommandPaletteController";
import { SettingsModalController } from "~/components/feedback/settings-modal/SettingsModalController";
import { WhatsNewDialogController } from "~/components/feedback/whats-new-dialog/WhatsNewDialogController";
import { RouteError } from "~/core/routes/logic/RouteError";
import { NotesView } from "~/views/notes/NotesView";

export const Route = createFileRoute("/_authenticated/notes")({
  component: NotesPageRoute,
  errorComponent: ({ error }) => <RouteError error={error} />,
});

function NotesPageRoute(): ReactElement {
  useDocumentTitle("Notes");
  const props = useNotesRoute();

  return (
    <>
      <NotesView {...props} />
      <SettingsModalController />
      <WhatsNewDialogController />
      <CommandPaletteController />
    </>
  );
}
