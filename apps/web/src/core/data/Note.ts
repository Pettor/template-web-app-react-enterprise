import { z } from "zod";

export const NOTE_SCHEMA = "app.note/v1";

/**
 * One note, stored as `notes/<id>.json`. Parsing is lenient: missing or
 * malformed optional fields fall back to their defaults, so files written by
 * hand, by an agent or by an older version still load. Only `id`, `createdAt`
 * and `updatedAt` are required. Keys are written in this order.
 */
export const NoteFileSchema = z.object({
  schema: z.literal(NOTE_SCHEMA).catch(NOTE_SCHEMA),
  id: z.string().min(1),
  title: z.string().catch(""),
  body: z.string().catch(""),
  tags: z
    .array(z.string())
    .catch([])
    .transform((tags) => [...new Set(tags.map((tag) => tag.trim().toLowerCase().replace(/^#/, "")).filter(Boolean))]),
  pinned: z.boolean().catch(false),
  status: z.enum(["active", "archived"]).catch("active"),
  createdAt: z.string().min(1),
  updatedAt: z.string().min(1),
});

export type Note = z.infer<typeof NoteFileSchema>;

export type NoteStatus = Note["status"];
