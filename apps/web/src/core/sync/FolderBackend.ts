export interface FolderFileInfo {
  /** Relative to the data folder, `/`-separated. */
  path: string;
  /** Milliseconds since the epoch. */
  lastModified: number;
}

/**
 * File access to the data folder. {@link FolderSync} only talks to this, so the
 * same sync logic runs on a folder opened with the browser's File System
 * Access API and on a GitHub repository through its REST API.
 */
export interface FolderBackend {
  /** Shown in the UI, e.g. the folder's name. */
  readonly name: string;
  /** Files under `dir`, descending at most `depth` folder levels. Hidden entries are skipped. */
  list(dir: string, depth: number): Promise<FolderFileInfo[]>;
  /** The file's `lastModified`, or `null` when it doesn't exist. */
  stat(path: string): Promise<number | null>;
  read(path: string): Promise<string>;
  /** Writes the file, creating folders as needed. Returns the new `lastModified`. */
  write(path: string, content: string): Promise<number>;
  /** Removes the file; missing files are ignored. */
  remove(path: string): Promise<void>;
}
