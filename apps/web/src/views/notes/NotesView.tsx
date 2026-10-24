import type { ReactElement } from "react";
import { useIntl } from "react-intl";
import type { SyncStatusCardProps } from "~/components/display/sync-status/SyncStatusCard";
import { SyncStatusCard } from "~/components/display/sync-status/SyncStatusCard";
import type { NotesPanelProps } from "~/components/input/notes-panel/NotesPanel";
import { NotesPanel } from "~/components/input/notes-panel/NotesPanel";

export interface NotesViewProps {
  notes: NotesPanelProps;
  syncStatus: SyncStatusCardProps;
}

export function NotesView({ notes, syncStatus }: NotesViewProps): ReactElement {
  const intl = useIntl();

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 py-6">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
        <div className="flex flex-col gap-1">
          <h1 className="from-accent to-danger bg-gradient-to-r bg-clip-text text-2xl font-bold tracking-tight text-transparent md:text-3xl">
            {intl.formatMessage({
              description: "NotesView: heading - page title",
              defaultMessage: "Notes",
              id: "Twat7D",
            })}
          </h1>
          <p className="text-default-500 text-sm">
            {intl.formatMessage({
              description: "NotesView: body - page subtitle",
              defaultMessage: "A small example of local-first data you can sync to a folder or GitHub.",
              id: "hW4Vbr",
            })}
          </p>
        </div>
        <div className="w-full sm:w-64">
          <SyncStatusCard {...syncStatus} />
        </div>
      </div>
      <NotesPanel {...notes} />
    </div>
  );
}
