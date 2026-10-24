import { useNotes } from "~/core/data/UseNotes";
import { useSyncStatusCard } from "~/core/sync/UseSyncStatusCard";
import type { NotesViewProps } from "~/views/notes/NotesView";

export function useNotesRoute(): NotesViewProps {
  const { notes, add, togglePinned, archive } = useNotes();
  const syncStatus = useSyncStatusCard();

  return {
    notes: { notes, onAdd: add, onTogglePinned: togglePinned, onArchive: archive },
    syncStatus,
  };
}
