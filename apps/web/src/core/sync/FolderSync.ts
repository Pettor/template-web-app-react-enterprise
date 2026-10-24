import { AGENTS_MD, GITATTRIBUTES } from "./AgentsMd";
import type { FolderBackend, FolderFileInfo } from "./FolderBackend";
import type { AppData, CollectionDefinition, DataRecord } from "~/core/data/AppData";
import { COLLECTIONS, DATA_SCHEMA } from "~/core/data/AppData";

export const MANIFEST_FILE = "app.json";
export const AGENTS_FILE = "AGENTS.md";
export const GITATTRIBUTES_FILE = ".gitattributes";
export const CONFLICTS_DIR = ".conflicts";

export interface PullResult {
  data: AppData;
  changed: boolean;
  /** Remote edits that lost to a newer local edit; copied to `.conflicts/`. */
  conflicts: number;
}

interface KnownFile {
  content: string;
  lastModified: number;
}

type Collections = Record<string, Record<string, DataRecord>>;

/** Pretty-printed with a trailing newline, so diffs are one line per field. */
export function serialize(value: unknown): string {
  return `${JSON.stringify(value, null, 2)}\n`;
}

export function recordPath(collection: CollectionDefinition, id: string): string {
  return `${collection.dir}/${id}.json`;
}

/** What `app.json` contains: which collections exist and where their records live. */
export function buildManifest(): unknown {
  return {
    schema: DATA_SCHEMA,
    collections: Object.fromEntries(
      COLLECTIONS.map((collection) => [
        collection.key,
        { schema: collection.schema, path: `${collection.dir}/<id>.json` },
      ])
    ),
  };
}

function staticFiles(): Map<string, string> {
  return new Map([
    [MANIFEST_FILE, serialize(buildManifest())],
    [AGENTS_FILE, AGENTS_MD],
    [GITATTRIBUTES_FILE, GITATTRIBUTES],
  ]);
}

function recordsOf(data: AppData, collection: CollectionDefinition): Record<string, DataRecord> {
  return (data as unknown as Collections)[collection.key] ?? {};
}

function withRecord(data: AppData, collection: CollectionDefinition, record: DataRecord): AppData {
  const records = { ...recordsOf(data, collection), [record.id]: record };
  return { ...data, [collection.key]: records } as AppData;
}

/**
 * Two-way sync between {@link AppData} and a folder of plain JSON files.
 *
 * Each record is its own file, so two devices editing different records never
 * touch the same file. Each file's last seen content and `lastModified` are
 * remembered, so a pull only reads what changed and a push only writes what
 * changed. Records resolve by `updatedAt` (newest wins); a losing remote edit
 * is kept in `.conflicts/`. File access goes through a {@link FolderBackend},
 * so the same logic runs on a local folder and on a GitHub repository.
 */
export class FolderSync {
  private readonly known = new Map<string, KnownFile>();

  constructor(private readonly folder: FolderBackend) {}

  get folderName(): string {
    return this.folder.name;
  }

  /** Reads a file only when it changed since last seen. Returns `null` when unchanged. */
  private async readChanged({ path, lastModified }: FolderFileInfo): Promise<{ text: string; isNew: boolean } | null> {
    const known = this.known.get(path);
    if (known && known.lastModified === lastModified) {
      return null;
    }
    const text = await this.folder.read(path);
    this.known.set(path, { content: text, lastModified });
    if (known && known.content === text) {
      return null;
    }
    return { text, isNew: !known };
  }

  private async readChangedJson(file: FolderFileInfo): Promise<{ text: string; json: unknown; isNew: boolean } | null> {
    const read = await this.readChanged(file);
    if (!read) {
      return null;
    }
    try {
      return { ...read, json: JSON.parse(read.text) };
    } catch {
      return null;
    }
  }

  private async write(path: string, content: string): Promise<void> {
    const lastModified = await this.folder.write(path, content);
    this.known.set(path, { content, lastModified });
  }

  async pull(local: AppData): Promise<PullResult> {
    let data = local;
    let changed = false;
    let conflicts = 0;

    // Push compares against what's on disk, so a folder written by an older version gets this version's files.
    for (const path of staticFiles().keys()) {
      const lastModified = await this.folder.stat(path);
      if (lastModified !== null) {
        await this.readChanged({ path, lastModified });
      }
    }

    for (const collection of COLLECTIONS) {
      const files = (await this.folder.list(collection.dir, 0)).filter((file) => file.path.endsWith(".json"));
      for (const file of files) {
        const read = await this.readChangedJson(file);
        const parsed = read && collection.fileSchema.safeParse(read.json);
        if (!read || !parsed?.success) {
          continue;
        }
        const remote = parsed.data;
        const current = recordsOf(data, collection)[remote.id];
        if (!current || remote.updatedAt > current.updatedAt) {
          data = withRecord(data, collection, remote);
          changed = true;
        } else if (remote.updatedAt < current.updatedAt && !read.isNew) {
          const stamp = remote.updatedAt.replace(/[:]/g, "");
          await this.write(`${CONFLICTS_DIR}/${collection.dir}/${remote.id}-${stamp}.json`, read.text);
          conflicts += 1;
        }
      }
    }

    return { data, changed, conflicts };
  }

  /** Writes every file whose content changed. Returns how many were written. */
  async push(data: AppData): Promise<number> {
    const desired = staticFiles();
    for (const collection of COLLECTIONS) {
      for (const record of Object.values(recordsOf(data, collection))) {
        desired.set(recordPath(collection, record.id), serialize(record));
      }
    }

    let written = 0;
    for (const [path, content] of desired) {
      if (this.known.get(path)?.content !== content) {
        await this.write(path, content);
        written += 1;
      }
    }
    return written;
  }
}
