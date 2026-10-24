import type { z } from "zod";
import type { Note } from "./Note";
import { NOTE_SCHEMA, NoteFileSchema } from "./Note";
import { createRecordId, toUtcTimestamp } from "./RecordId";

export const DATA_SCHEMA = "app.data/v1";

/** Fields every stored record has. Sync merges records by `updatedAt`, newest wins. */
export interface DataRecord {
  id: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Everything the app stores. Each key is a collection of records by id, and
 * each record is one JSON file in the data folder (`<collection>/<id>.json`).
 */
export interface AppData {
  notes: Record<string, Note>;
}

export type CollectionKey = keyof AppData;

export interface CollectionDefinition {
  key: CollectionKey;
  /** Folder in the data folder that holds one file per record. */
  dir: string;
  /** Written into every record's `schema` field. */
  schema: string;
  /** Normalizes a record read from disk or storage. */
  fileSchema: z.ZodType<DataRecord>;
}

/**
 * The collections, in the order they're synced. To add one: add its schema
 * file next to `Note.ts`, a key to {@link AppData}, an entry here, and a
 * section to `AGENTS.md` (`core/sync/AgentsMd.ts`).
 */
export const COLLECTIONS: CollectionDefinition[] = [
  { key: "notes", dir: "notes", schema: NOTE_SCHEMA, fileSchema: NoteFileSchema },
];

export function createEmptyData(): AppData {
  return { notes: {} };
}

/** Parses data from browser storage, dropping records that don't parse, so an older format still loads. */
export function normalizeData(value: unknown): AppData {
  const data = createEmptyData();
  if (!value || typeof value !== "object") {
    return data;
  }
  for (const collection of COLLECTIONS) {
    const records = (value as Record<string, unknown>)[collection.key];
    if (!records || typeof records !== "object") {
      continue;
    }
    const parsed: Record<string, DataRecord> = {};
    for (const record of Object.values(records)) {
      const result = collection.fileSchema.safeParse(record);
      if (result.success) {
        parsed[result.data.id] = result.data;
      }
    }
    (data as unknown as Record<CollectionKey, Record<string, DataRecord>>)[collection.key] = parsed;
  }
  return data;
}

export interface NoteDraft {
  title: string;
  body?: string;
  tags?: string[];
}

export function createNote(draft: NoteDraft, now: Date, id: string = createRecordId(now.getTime())): Note {
  const timestamp = toUtcTimestamp(now);
  return NoteFileSchema.parse({
    schema: NOTE_SCHEMA,
    id,
    title: draft.title.trim(),
    body: draft.body?.trim() ?? "",
    tags: draft.tags ?? [],
    pinned: false,
    status: "active",
    createdAt: timestamp,
    updatedAt: timestamp,
  });
}

export function addNote(data: AppData, note: Note): AppData {
  return { ...data, notes: { ...data.notes, [note.id]: note } };
}

export type NoteChanges = Partial<Pick<Note, "title" | "body" | "tags" | "pinned" | "status">>;

/** Applies `changes` and stamps `updatedAt`. Unknown ids leave the data unchanged. */
export function updateNote(data: AppData, id: string, changes: NoteChanges, now: Date): AppData {
  const current = data.notes[id];
  if (!current) {
    return data;
  }
  const next = NoteFileSchema.parse({ ...current, ...changes, updatedAt: toUtcTimestamp(now) });
  return { ...data, notes: { ...data.notes, [id]: next } };
}

/** Notes are never deleted, only archived, so a removal syncs like any other edit. */
export function archiveNote(data: AppData, id: string, now: Date): AppData {
  return updateNote(data, id, { status: "archived" }, now);
}

/** Active notes, pinned first, then newest first. Ids are ULIDs, so they break same-second ties by creation time. */
export function listActiveNotes(data: AppData): Note[] {
  return Object.values(data.notes)
    .filter((note) => note.status === "active")
    .sort(
      (a, b) =>
        Number(b.pinned) - Number(a.pinned) || b.createdAt.localeCompare(a.createdAt) || b.id.localeCompare(a.id)
    );
}
