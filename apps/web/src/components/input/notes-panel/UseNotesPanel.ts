import { useState } from "react";
import type { NoteDraft } from "~/core/data/AppData";

export interface UseNotesPanelResult {
  title: string;
  body: string;
  setTitle: (value: string) => void;
  setBody: (value: string) => void;
  canAdd: boolean;
  submit: () => void;
}

/** The new-note draft: typed in, then handed to `onAdd` and cleared. */
export function useNotesPanel(onAdd: (draft: NoteDraft) => void): UseNotesPanelResult {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const canAdd = title.trim() !== "";

  function submit(): void {
    if (!canAdd) {
      return;
    }
    onAdd({ title, body });
    setTitle("");
    setBody("");
  }

  return { title, body, setTitle, setBody, canAdd, submit };
}
