import { afterEach, describe, expect, it, vi } from "vitest";
import {
  isFolderAccessSupported,
  pickFolder,
  queryFolderPermission,
  requestFolderPermission,
} from "./FileSystemAccess";

const handle = { name: "app-data" } as FileSystemDirectoryHandle;

describe("FileSystemAccess", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("isn't supported without a window or a folder picker", () => {
    expect(isFolderAccessSupported()).toBe(false);
    vi.stubGlobal("window", {});
    expect(isFolderAccessSupported()).toBe(false);
  });

  it("opens the folder picker for read and write access", async () => {
    const showDirectoryPicker = vi.fn(async () => handle);
    vi.stubGlobal("window", { showDirectoryPicker });

    expect(isFolderAccessSupported()).toBe(true);
    expect(await pickFolder()).toBe(handle);
    expect(showDirectoryPicker).toHaveBeenCalledWith({ id: "app-data", mode: "readwrite" });
  });

  it("refuses to pick a folder when the browser can't", async () => {
    vi.stubGlobal("window", {});
    await expect(pickFolder()).rejects.toThrow("not supported");
  });

  it("asks the handle for permission when it can", async () => {
    const asking = Object.assign(Object.create(null), {
      queryPermission: vi.fn(async () => "prompt"),
      requestPermission: vi.fn(async () => "denied"),
    }) as FileSystemDirectoryHandle;

    expect(await queryFolderPermission(asking)).toBe("prompt");
    expect(await requestFolderPermission(asking)).toBe("denied");
  });

  it("assumes permission when the handle can't be asked", async () => {
    expect(await queryFolderPermission(handle)).toBe("granted");
    expect(await requestFolderPermission(handle)).toBe("granted");
  });
});
