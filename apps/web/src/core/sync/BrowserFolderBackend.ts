import type { FolderBackend, FolderFileInfo } from "./FolderBackend";

function split(path: string): { dirs: string[]; name: string } {
  const parts = path.split("/").filter(Boolean);
  const name = parts.pop() ?? "";
  return { dirs: parts, name };
}

function isNotFound(error: unknown): boolean {
  return error instanceof DOMException && (error.name === "NotFoundError" || error.name === "TypeMismatchError");
}

/** The data folder through the browser's File System Access API (Chrome, Edge). */
export class BrowserFolderBackend implements FolderBackend {
  constructor(private readonly root: FileSystemDirectoryHandle) {}

  get name(): string {
    return this.root.name;
  }

  private async directory(dirs: string[], create: boolean): Promise<FileSystemDirectoryHandle | null> {
    let current = this.root;
    for (const dir of dirs) {
      try {
        current = await current.getDirectoryHandle(dir, { create });
      } catch (error) {
        if (!create && isNotFound(error)) {
          return null;
        }
        throw error;
      }
    }
    return current;
  }

  private async file(path: string): Promise<FileSystemFileHandle | null> {
    const { dirs, name } = split(path);
    const dir = await this.directory(dirs, false);
    try {
      return dir ? await dir.getFileHandle(name) : null;
    } catch (error) {
      if (isNotFound(error)) {
        return null;
      }
      throw error;
    }
  }

  async list(dir: string, depth: number): Promise<FolderFileInfo[]> {
    const handle = await this.directory(dir.split("/").filter(Boolean), false);
    if (!handle) {
      return [];
    }
    const files: FolderFileInfo[] = [];
    for await (const [name, entry] of handle.entries()) {
      if (name.startsWith(".")) {
        continue;
      }
      const entryPath = dir ? `${dir}/${name}` : name;
      if (entry.kind === "file") {
        files.push({ path: entryPath, lastModified: (await entry.getFile()).lastModified });
      } else if (depth > 0) {
        files.push(...(await this.list(entryPath, depth - 1)));
      }
    }
    return files;
  }

  async stat(path: string): Promise<number | null> {
    const handle = await this.file(path);
    return handle ? (await handle.getFile()).lastModified : null;
  }

  async read(path: string): Promise<string> {
    const handle = await this.file(path);
    if (!handle) {
      throw new DOMException(`${path} not found`, "NotFoundError");
    }
    return (await handle.getFile()).text();
  }

  async write(path: string, content: string): Promise<number> {
    const { dirs, name } = split(path);
    const dir = await this.directory(dirs, true);
    const handle = await dir!.getFileHandle(name, { create: true });
    const writable = await handle.createWritable();
    await writable.write(content);
    await writable.close();
    return (await handle.getFile()).lastModified;
  }

  async remove(path: string): Promise<void> {
    const { dirs, name } = split(path);
    const dir = await this.directory(dirs, false);
    try {
      await dir?.removeEntry(name);
    } catch (error) {
      if (!isNotFound(error)) {
        throw error;
      }
    }
  }
}
