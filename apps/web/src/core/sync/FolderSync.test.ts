import { beforeEach, describe, expect, it } from "vitest";
import { AGENTS_MD, GITATTRIBUTES } from "./AgentsMd";
import { BrowserFolderBackend } from "./BrowserFolderBackend";
import { FolderSync, serialize } from "./FolderSync";
import type { AppData } from "~/core/data/AppData";
import { addNote, createEmptyData, createNote, updateNote } from "~/core/data/AppData";

let clock = 1;

/** Minimal in-memory stand-in for the File System Access API. */
class FakeFile {
  readonly kind = "file";
  lastModified = clock++;
  constructor(
    readonly name: string,
    public content = ""
  ) {}

  async getFile(): Promise<{ lastModified: number; text: () => Promise<string> }> {
    return { lastModified: this.lastModified, text: async () => this.content };
  }

  async createWritable(): Promise<{ write: (text: string) => Promise<void>; close: () => Promise<void> }> {
    return {
      write: async (text) => {
        this.content = text;
      },
      close: async () => {
        this.lastModified = clock++;
      },
    };
  }
}

class FakeDir {
  readonly kind = "directory";
  readonly children = new Map<string, FakeDir | FakeFile>();
  constructor(readonly name: string) {}

  private notFound(): DOMException {
    return new DOMException("not found", "NotFoundError");
  }

  async getDirectoryHandle(name: string, options?: { create?: boolean }): Promise<FakeDir> {
    let child = this.children.get(name);
    if (!child && options?.create) {
      child = new FakeDir(name);
      this.children.set(name, child);
    }
    if (!(child instanceof FakeDir)) {
      throw this.notFound();
    }
    return child;
  }

  async getFileHandle(name: string, options?: { create?: boolean }): Promise<FakeFile> {
    let child = this.children.get(name);
    if (!child && options?.create) {
      child = new FakeFile(name);
      this.children.set(name, child);
    }
    if (!(child instanceof FakeFile)) {
      throw this.notFound();
    }
    return child;
  }

  async removeEntry(name: string): Promise<void> {
    if (!this.children.delete(name)) {
      throw this.notFound();
    }
  }

  async *entries(): AsyncGenerator<[string, FakeDir | FakeFile]> {
    yield* [...this.children.entries()];
  }

  /** Test helper: reads a file by path, or `undefined`. */
  read(path: string): string | undefined {
    const [head, ...rest] = path.split("/");
    const child = this.children.get(head!);
    if (rest.length === 0) {
      return child instanceof FakeFile ? child.content : undefined;
    }
    return child instanceof FakeDir ? child.read(rest.join("/")) : undefined;
  }

  /** Test helper: writes a file by path, as another device or an agent would. */
  async write(path: string, content: string): Promise<void> {
    const [head, ...rest] = path.split("/");
    if (rest.length === 0) {
      const file = await this.getFileHandle(head!, { create: true });
      file.content = content;
      file.lastModified = clock++;
      return;
    }
    const dir = await this.getDirectoryHandle(head!, { create: true });
    await dir.write(rest.join("/"), content);
  }
}

function seed(): AppData {
  return addNote(createEmptyData(), createNote({ title: "Plan the launch" }, new Date("2026-10-21T08:00:00Z"), "N1"));
}

function folderSync(root: FakeDir): FolderSync {
  return new FolderSync(new BrowserFolderBackend(root as unknown as FileSystemDirectoryHandle));
}

describe("FolderSync", () => {
  let root: FakeDir;
  let sync: FolderSync;

  beforeEach(() => {
    root = new FakeDir("Data");
    sync = folderSync(root);
  });

  it("writes the documented folder layout", async () => {
    await sync.push(seed());

    expect(JSON.parse(root.read("app.json")!)).toEqual({
      schema: "app.data/v1",
      collections: { notes: { schema: "app.note/v1", path: "notes/<id>.json" } },
    });
    expect(JSON.parse(root.read("notes/N1.json")!)).toMatchObject({ schema: "app.note/v1", id: "N1" });
    expect(root.read("AGENTS.md")).toBe(AGENTS_MD);
    expect(root.read(".gitattributes")).toBe(GITATTRIBUTES);
  });

  it("writes one field per line with a trailing newline, in a stable key order", async () => {
    await sync.push(seed());

    expect(root.read("notes/N1.json")).toBe(
      [
        "{",
        '  "schema": "app.note/v1",',
        '  "id": "N1",',
        '  "title": "Plan the launch",',
        '  "body": "",',
        '  "tags": [],',
        '  "pinned": false,',
        '  "status": "active",',
        '  "createdAt": "2026-10-21T08:00:00Z",',
        '  "updatedAt": "2026-10-21T08:00:00Z"',
        "}",
        "",
      ].join("\n")
    );
  });

  it("only writes files that changed", async () => {
    const data = seed();
    expect(await sync.push(data)).toBe(4);
    expect(await sync.push(data)).toBe(0);
    expect(await sync.push(updateNote(data, "N1", { pinned: true }, new Date("2026-10-21T09:00:00Z")))).toBe(1);
  });

  it("updates an AGENTS.md written by an older version, and leaves a current one alone", async () => {
    await root.write("AGENTS.md", "# Data folder\n\nOld rules.\n");
    const pulled = await sync.pull(createEmptyData());
    await sync.push(pulled.data);
    expect(root.read("AGENTS.md")).toBe(AGENTS_MD);

    const nextSession = folderSync(root);
    const again = await nextSession.pull(createEmptyData());
    expect(await nextSession.push(again.data)).toBe(0);
  });

  it("rewrites a hand-written record in the current format without touching updatedAt", async () => {
    await root.write(
      "notes/OLD.json",
      JSON.stringify({
        id: "OLD",
        title: "Written by an agent",
        tags: ["#Work", "work"],
        createdAt: "2026-10-01T08:00:00Z",
        updatedAt: "2026-10-01T08:00:00Z",
      })
    );
    const pulled = await sync.pull(createEmptyData());
    await sync.push(pulled.data);

    expect(JSON.parse(root.read("notes/OLD.json")!)).toEqual({
      schema: "app.note/v1",
      id: "OLD",
      title: "Written by an agent",
      body: "",
      tags: ["work"],
      pinned: false,
      status: "active",
      createdAt: "2026-10-01T08:00:00Z",
      updatedAt: "2026-10-01T08:00:00Z",
    });
  });

  it("pulls newer edits from disk and keeps local ones that are newer", async () => {
    const data = seed();
    await sync.push(data);

    const remote = { ...data.notes.N1!, title: "Edited by an agent", updatedAt: "2026-10-21T09:00:00Z" };
    await root.write("notes/N1.json", serialize(remote));
    const pulled = await sync.pull(data);
    expect(pulled.changed).toBe(true);
    expect(pulled.data.notes.N1?.title).toBe("Edited by an agent");

    const older = { ...remote, title: "Stale edit", updatedAt: "2026-10-21T07:00:00Z" };
    await root.write("notes/N1.json", serialize(older));
    const kept = await sync.pull(pulled.data);
    expect(kept.data.notes.N1?.title).toBe("Edited by an agent");
    expect(kept.conflicts).toBe(1);
    expect(root.read(".conflicts/notes/N1-2026-10-21T070000Z.json")).toBe(serialize(older));
  });

  it("does nothing when nothing changed on disk", async () => {
    const data = seed();
    await sync.push(data);
    const pulled = await sync.pull(data);
    expect(pulled.changed).toBe(false);
    expect(pulled.data).toBe(data);
  });

  it("merges an existing folder with local data on first connect", async () => {
    const other = folderSync(root);
    await other.push(addNote(createEmptyData(), createNote({ title: "From the other computer" }, new Date(), "R1")));

    const pulled = await sync.pull(seed());
    expect(Object.keys(pulled.data.notes).sort()).toEqual(["N1", "R1"]);
  });

  it("ignores malformed files and files outside the collections", async () => {
    await root.write("notes/bad.json", "{ not json");
    await root.write("notes/no-id.json", JSON.stringify({ title: "Missing id" }));
    await root.write("notes/readme.txt", "not a record");
    await root.write("other/N9.json", serialize({ id: "N9", createdAt: "x", updatedAt: "x" }));
    const pulled = await sync.pull(createEmptyData());
    expect(Object.keys(pulled.data.notes)).toEqual([]);
  });
});
