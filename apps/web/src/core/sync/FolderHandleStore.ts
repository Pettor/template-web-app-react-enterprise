/**
 * Folder handles can't go in localStorage, but they survive in IndexedDB
 * (structured clone). One small object store holds the connected folder.
 */
const DB_NAME = "app-sync";
const STORE = "handles";
const KEY = "data-folder";

function openDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);
    request.onupgradeneeded = () => request.result.createObjectStore(STORE);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function run<T>(mode: IDBTransactionMode, action: (store: IDBObjectStore) => IDBRequest): Promise<T> {
  const db = await openDb();
  try {
    return await new Promise<T>((resolve, reject) => {
      const request = action(db.transaction(STORE, mode).objectStore(STORE));
      request.onsuccess = () => resolve(request.result as T);
      request.onerror = () => reject(request.error);
    });
  } finally {
    db.close();
  }
}

export async function loadFolderHandle(): Promise<FileSystemDirectoryHandle | undefined> {
  if (typeof indexedDB === "undefined") {
    return undefined;
  }
  return run<FileSystemDirectoryHandle | undefined>("readonly", (store) => store.get(KEY));
}

export async function saveFolderHandle(handle: FileSystemDirectoryHandle): Promise<void> {
  await run("readwrite", (store) => store.put(handle, KEY));
}

export async function clearFolderHandle(): Promise<void> {
  await run("readwrite", (store) => store.delete(KEY));
}
