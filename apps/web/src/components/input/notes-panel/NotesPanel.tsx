import type { ChangeEvent, FormEvent, ReactElement } from "react";
import { ArchiveBoxIcon, PlusIcon } from "@heroicons/react/20/solid";
import { BookmarkIcon as BookmarkOutlineIcon } from "@heroicons/react/24/outline";
import { BookmarkIcon } from "@heroicons/react/24/solid";
import { Button, Card, Form, Input, Label, TextArea, TextField } from "@heroui/react";
import { useIntl } from "react-intl";
import { useNotesPanel } from "./UseNotesPanel";
import type { NoteDraft } from "~/core/data/AppData";
import type { Note } from "~/core/data/Note";

export interface NotesPanelProps {
  /** Active notes in display order. */
  notes: Note[];
  onAdd: (draft: NoteDraft) => void;
  onTogglePinned: (id: string) => void;
  onArchive: (id: string) => void;
}

export function NotesPanel({ notes, onAdd, onTogglePinned, onArchive }: NotesPanelProps): ReactElement {
  const intl = useIntl();
  const { title, body, setTitle, setBody, canAdd, submit } = useNotesPanel(onAdd);

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    submit();
  }

  return (
    <Card className="w-full">
      <Card.Header>
        <h2 className="text-lg font-semibold">
          {intl.formatMessage({
            description: "NotesPanel: heading - panel title",
            defaultMessage: "Notes",
            id: "H/wDAG",
          })}
        </h2>
        <Card.Description>
          {intl.formatMessage({
            description: "NotesPanel: body - explains where notes are stored",
            defaultMessage: "Saved in this browser, and in your data folder or GitHub repository when sync is on.",
            id: "6pUCYB",
          })}
        </Card.Description>
      </Card.Header>
      <Card.Content className="flex flex-col gap-4">
        <Form className="flex flex-col gap-2" onSubmit={handleSubmit}>
          <TextField className="flex flex-col gap-1">
            <Label className="sr-only">
              {intl.formatMessage({
                description: "NotesPanel: label - new note title",
                defaultMessage: "Title",
                id: "priQ0+",
              })}
            </Label>
            <Input
              value={title}
              data-testid="notes-panel__title"
              placeholder={intl.formatMessage({
                description: "NotesPanel: placeholder - new note title",
                defaultMessage: "Write a note…",
                id: "iepdOH",
              })}
              onChange={(event: ChangeEvent<HTMLInputElement>) => setTitle(event.target.value)}
            />
          </TextField>
          <TextField className="flex flex-col gap-1">
            <Label className="sr-only">
              {intl.formatMessage({
                description: "NotesPanel: label - new note details",
                defaultMessage: "Details",
                id: "p+DMwa",
              })}
            </Label>
            <TextArea
              value={body}
              rows={2}
              data-testid="notes-panel__body"
              placeholder={intl.formatMessage({
                description: "NotesPanel: placeholder - new note details",
                defaultMessage: "Details (optional)",
                id: "B8AADS",
              })}
              onChange={(event: ChangeEvent<HTMLTextAreaElement>) => setBody(event.target.value)}
            />
          </TextField>
          <Button type="submit" isDisabled={!canAdd} className="self-end" data-testid="notes-panel__add">
            <PlusIcon className="size-4" aria-hidden />
            {intl.formatMessage({
              description: "NotesPanel: button - add the note",
              defaultMessage: "Add note",
              id: "tDj//F",
            })}
          </Button>
        </Form>

        {notes.length === 0 ? (
          <p className="text-default-500 py-4 text-center text-sm" data-testid="notes-panel__empty">
            {intl.formatMessage({
              description: "NotesPanel: body - no notes yet",
              defaultMessage: "No notes yet. Add one above.",
              id: "v3rvIL",
            })}
          </p>
        ) : (
          <ul className="flex flex-col gap-2" data-testid="notes-panel__list">
            {notes.map((note) => (
              <li
                key={note.id}
                className="bg-default/40 flex items-start gap-2 rounded-xl px-3 py-2.5"
                data-testid="notes-panel__note"
              >
                <div className="flex min-w-0 flex-1 flex-col">
                  <span className="font-medium break-words">{note.title}</span>
                  {note.body && (
                    <span className="text-default-500 text-sm break-words whitespace-pre-wrap">{note.body}</span>
                  )}
                </div>
                <Button
                  isIconOnly
                  size="sm"
                  variant="ghost"
                  onPress={() => onTogglePinned(note.id)}
                  aria-pressed={note.pinned}
                  aria-label={
                    note.pinned
                      ? intl.formatMessage(
                          {
                            description: "NotesPanel: aria-label - unpin a note",
                            defaultMessage: "Unpin {title}",
                            id: "+YkOPP",
                          },
                          { title: note.title }
                        )
                      : intl.formatMessage(
                          {
                            description: "NotesPanel: aria-label - pin a note to the top",
                            defaultMessage: "Pin {title}",
                            id: "wPyFGa",
                          },
                          { title: note.title }
                        )
                  }
                >
                  {note.pinned ? (
                    <BookmarkIcon className="text-accent size-4" aria-hidden />
                  ) : (
                    <BookmarkOutlineIcon className="size-4" aria-hidden />
                  )}
                </Button>
                <Button
                  isIconOnly
                  size="sm"
                  variant="ghost"
                  onPress={() => onArchive(note.id)}
                  aria-label={intl.formatMessage(
                    {
                      description: "NotesPanel: aria-label - archive a note",
                      defaultMessage: "Archive {title}",
                      id: "DjiqWe",
                    },
                    { title: note.title }
                  )}
                >
                  <ArchiveBoxIcon className="size-4" aria-hidden />
                </Button>
              </li>
            ))}
          </ul>
        )}
      </Card.Content>
    </Card>
  );
}
