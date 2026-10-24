import { describe, expect, it } from "vitest";
import {
  addNote,
  archiveNote,
  createEmptyData,
  createNote,
  listActiveNotes,
  normalizeData,
  updateNote,
} from "./AppData";
import { createRecordId, toUtcTimestamp } from "./RecordId";

const MORNING = new Date("2026-10-21T08:00:00.123Z");
const LATER = new Date("2026-10-21T09:30:00Z");

describe("createRecordId", () => {
  it("creates 26-character ULIDs that sort by time", () => {
    const first = createRecordId(Date.parse("2026-01-01T00:00:00Z"));
    const second = createRecordId(Date.parse("2026-01-01T00:00:01Z"));
    expect(first).toMatch(/^[0-9A-HJKMNP-TV-Z]{26}$/);
    expect(first < second).toBe(true);
  });
});

describe("toUtcTimestamp", () => {
  it("drops milliseconds", () => {
    expect(toUtcTimestamp(MORNING)).toBe("2026-10-21T08:00:00Z");
  });
});

describe("notes", () => {
  it("creates a note with defaults and the same createdAt and updatedAt", () => {
    expect(createNote({ title: "  Plan the launch ", tags: ["#Work"] }, MORNING, "N1")).toEqual({
      schema: "app.note/v1",
      id: "N1",
      title: "Plan the launch",
      body: "",
      tags: ["work"],
      pinned: false,
      status: "active",
      createdAt: "2026-10-21T08:00:00Z",
      updatedAt: "2026-10-21T08:00:00Z",
    });
  });

  it("stamps updatedAt on every change and leaves unknown ids alone", () => {
    const data = addNote(createEmptyData(), createNote({ title: "A" }, MORNING, "N1"));
    const updated = updateNote(data, "N1", { pinned: true }, LATER);
    expect(updated.notes.N1).toMatchObject({ pinned: true, updatedAt: "2026-10-21T09:30:00Z" });
    expect(updated.notes.N1?.createdAt).toBe("2026-10-21T08:00:00Z");
    expect(updateNote(data, "missing", { pinned: true }, LATER)).toBe(data);
  });

  it("lists active notes pinned first, then newest first", () => {
    let data = createEmptyData();
    data = addNote(data, createNote({ title: "Old" }, new Date("2026-10-20T08:00:00Z"), "N1"));
    data = addNote(data, createNote({ title: "New" }, new Date("2026-10-21T08:00:00Z"), "N2"));
    data = addNote(data, createNote({ title: "Archived" }, new Date("2026-10-22T08:00:00Z"), "N3"));
    data = updateNote(data, "N1", { pinned: true }, LATER);
    data = archiveNote(data, "N3", LATER);
    expect(listActiveNotes(data).map((note) => note.title)).toEqual(["Old", "New"]);
    expect(data.notes.N3?.status).toBe("archived");
  });

  it("orders notes made in the same second by id", () => {
    const second = new Date("2026-10-21T08:00:00Z");
    let data = addNote(createEmptyData(), createNote({ title: "First" }, second, createRecordId(second.getTime())));
    data = addNote(data, createNote({ title: "Second" }, second, createRecordId(second.getTime() + 400)));
    expect(listActiveNotes(data).map((note) => note.title)).toEqual(["Second", "First"]);
  });
});

describe("normalizeData", () => {
  it("keeps valid records and drops broken ones", () => {
    const data = normalizeData({
      notes: {
        N1: { id: "N1", title: "Kept", createdAt: "2026-10-21T08:00:00Z", updatedAt: "2026-10-21T08:00:00Z" },
        N2: { title: "No id" },
      },
    });
    expect(Object.keys(data.notes)).toEqual(["N1"]);
    expect(data.notes.N1).toMatchObject({ status: "active", tags: [] });
  });

  it("falls back to empty data", () => {
    expect(normalizeData(null)).toEqual(createEmptyData());
    expect(normalizeData("nope")).toEqual(createEmptyData());
  });
});
