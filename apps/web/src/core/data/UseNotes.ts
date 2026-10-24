import { useCallback, useMemo } from "react";
import { useAtom } from "jotai";
import type { NoteDraft } from "./AppData";
import { addNote, archiveNote, createNote, listActiveNotes, updateNote } from "./AppData";
import { appDataAtom } from "./DataAtoms";
import type { Note } from "./Note";

export interface UseNotesResult {
  /** Active notes, pinned first, then newest first. */
  notes: Note[];
  add: (draft: NoteDraft) => void;
  togglePinned: (id: string) => void;
  archive: (id: string) => void;
}

export function useNotes(): UseNotesResult {
  const [data, setData] = useAtom(appDataAtom);
  const notes = useMemo(() => listActiveNotes(data), [data]);

  const add = useCallback(
    (draft: NoteDraft) => {
      if (draft.title.trim()) {
        setData((current) => addNote(current, createNote(draft, new Date())));
      }
    },
    [setData]
  );

  const togglePinned = useCallback(
    (id: string) => {
      setData((current) => updateNote(current, id, { pinned: !current.notes[id]?.pinned }, new Date()));
    },
    [setData]
  );

  const archive = useCallback(
    (id: string) => {
      setData((current) => archiveNote(current, id, new Date()));
    },
    [setData]
  );

  return { notes, add, togglePinned, archive };
}
