/**
 * The parts of the File System Access API that TypeScript's DOM lib doesn't
 * ship yet. Available in Chromium-based desktop browsers (Chrome, Edge, Arc).
 */
export type FolderPermission = "granted" | "denied" | "prompt";

interface PermissionCapableHandle {
  queryPermission?: (descriptor: { mode: "read" | "readwrite" }) => Promise<FolderPermission>;
  requestPermission?: (descriptor: { mode: "read" | "readwrite" }) => Promise<FolderPermission>;
}

interface DirectoryPickerWindow {
  showDirectoryPicker?: (options?: {
    id?: string;
    mode?: "read" | "readwrite";
    startIn?: string;
  }) => Promise<FileSystemDirectoryHandle>;
}

export function isFolderAccessSupported(): boolean {
  return typeof window !== "undefined" && typeof (window as DirectoryPickerWindow).showDirectoryPicker === "function";
}

/** Opens the system folder picker. Must be called from a user gesture. */
export async function pickFolder(): Promise<FileSystemDirectoryHandle> {
  const picker = (window as DirectoryPickerWindow).showDirectoryPicker;
  if (!picker) {
    throw new Error("Folder access is not supported in this browser");
  }
  return picker({ id: "app-data", mode: "readwrite" });
}

export async function queryFolderPermission(handle: FileSystemDirectoryHandle): Promise<FolderPermission> {
  const query = (handle as PermissionCapableHandle).queryPermission;
  return query ? query.call(handle, { mode: "readwrite" }) : "granted";
}

/** Asks the user to allow access again. Must be called from a user gesture. */
export async function requestFolderPermission(handle: FileSystemDirectoryHandle): Promise<FolderPermission> {
  const request = (handle as PermissionCapableHandle).requestPermission;
  return request ? request.call(handle, { mode: "readwrite" }) : "granted";
}
