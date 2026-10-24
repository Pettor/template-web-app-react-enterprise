import { beforeEach, describe, expect, it } from "vitest";
import { BrowserFolderBackend } from "./BrowserFolderBackend";

let clock = 1;

/** Minimal in-memory stand-in for the File System Access API, raising the same errors as the browser. */
class FakeFile {
  readonly kind = "file";
  lastModified = clock++;
  constructor(public content = "") {}

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
  readonly entriesByName = new Map<string, FakeFile | FakeDir>();
  constructor(readonly name: string) {}

  private lookup<T extends FakeFile | FakeDir>(name: string, kind: T["kind"], create: () => T): T {
    if (name === "..") {
      throw new TypeError("Name is not allowed.");
    }
    const existing = this.entriesByName.get(name);
    if (existing && existing.kind !== kind) {
      throw new DOMException("The path supplied exists, but was not an entry of requested type.", "TypeMismatchError");
    }
    if (existing) {
      return existing as T;
    }
    const created = create();
    this.entriesByName.set(name, created);
    return created;
  }

  async getDirectoryHandle(name: string, options?: { create?: boolean }): Promise<FakeDir> {
    return this.lookup(name, "directory", () => {
      if (!options?.create) {
        throw new DOMException("A requested file or directory could not be found.", "NotFoundError");
      }
      return new FakeDir(name);
    });
  }

  async getFileHandle(name: string, options?: { create?: boolean }): Promise<FakeFile> {
    return this.lookup(name, "file", () => {
      if (!options?.create) {
        throw new DOMException("A requested file or directory could not be found.", "NotFoundError");
      }
      return new FakeFile();
    });
  }

  async removeEntry(name: string): Promise<void> {
    const entry = this.entriesByName.get(name);
    if (!entry) {
      throw new DOMException("A requested file or directory could not be found.", "NotFoundError");
    }
    if (entry instanceof FakeDir && entry.entriesByName.size > 0) {
      throw new DOMException("The directory is not empty.", "InvalidModificationError");
    }
    this.entriesByName.delete(name);
  }

  async *entries(): AsyncIterableIterator<[string, FakeFile | FakeDir]> {
    yield* this.entriesByName.entries();
  }
}

describe("BrowserFolderBackend", () => {
  let folder: BrowserFolderBackend;

  beforeEach(() => {
    folder = new BrowserFolderBackend(new FakeDir("app-data") as unknown as FileSystemDirectoryHandle);
  });

  it("is named after the folder", () => {
    expect(folder.name).toBe("app-data");
  });

  it("writes, reads and stats files, creating folders as needed", async () => {
    const lastModified = await folder.write("notes/N1.json", "{}");

    expect(await folder.read("notes/N1.json")).toBe("{}");
    expect(await folder.stat("notes/N1.json")).toBe(lastModified);
    expect(await folder.stat("notes/missing.json")).toBeNull();
    expect(await folder.stat("missing/N1.json")).toBeNull();
  });

  it("lists files to the given depth and skips hidden entries", async () => {
    await folder.write("app.json", "{}");
    await folder.write("notes/N1.json", "{}");
    await folder.write(".conflicts/notes/N1.json", "{}");

    expect((await folder.list("", 0)).map((file) => file.path)).toEqual(["app.json"]);
    expect((await folder.list("", 1)).map((file) => file.path)).toEqual(["app.json", "notes/N1.json"]);
    expect(await folder.list("missing", 1)).toEqual([]);
  });

  it("throws when reading a missing file", async () => {
    await expect(folder.read("missing.json")).rejects.toMatchObject({ name: "NotFoundError" });
  });

  it("removes files and ignores missing ones", async () => {
    await folder.write("notes/N1.json", "{}");

    await folder.remove("notes/N1.json");
    await folder.remove("notes/N1.json");
    await folder.remove("missing/N1.json");

    expect(await folder.stat("notes/N1.json")).toBeNull();
  });

  it("rethrows errors other than a missing entry", async () => {
    await folder.write("notes", "a file, not a folder");
    await folder.write("folder/N1.json", "{}");

    await expect(folder.write("notes/N1.json", "{}")).rejects.toMatchObject({ name: "TypeMismatchError" });
    await expect(folder.read("folder/..")).rejects.toBeInstanceOf(TypeError);
    await expect(folder.remove("folder")).rejects.toMatchObject({ name: "InvalidModificationError" });
  });
});
