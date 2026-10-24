import { describe, expect, it } from "vitest";
import type { FolderBackend } from "./FolderBackend";
import { parseHead, parseRemoteUrl, readGitClone } from "./GitClone";

function folderWith(files: Record<string, string>): FolderBackend {
  return {
    name: "data",
    list: async () => [],
    stat: async (path) => (path in files ? 1 : null),
    read: async (path) => {
      if (!(path in files)) {
        throw new DOMException(`${path} not found`, "NotFoundError");
      }
      return files[path]!;
    },
    write: async () => 1,
    remove: async () => undefined,
  };
}

describe("parseHead", () => {
  it("reads the branch, or a short sha when detached", () => {
    expect(parseHead("ref: refs/heads/main\n")).toBe("main");
    expect(parseHead("ref: refs/heads/feature/sync\n")).toBe("feature/sync");
    expect(parseHead("ce013625030ba8dba906f756967f9e9ca394464a\n")).toBe("ce01362");
    expect(parseHead("garbage")).toBeNull();
  });
});

describe("parseRemoteUrl", () => {
  it("prefers origin, then the first remote", () => {
    const config = [
      "[core]",
      "\tbare = false",
      '[remote "upstream"]',
      "\turl = https://github.com/team/app-data.git",
      '[remote "origin"]',
      "\turl = git@github.com:you/app-data.git",
      "\tfetch = +refs/heads/*:refs/remotes/origin/*",
    ].join("\n");
    expect(parseRemoteUrl(config)).toBe("git@github.com:you/app-data.git");
    expect(parseRemoteUrl('[remote "backup"]\n  url = /mnt/backup/app-data\n')).toBe("/mnt/backup/app-data");
    expect(parseRemoteUrl("[core]\n\turl = not-a-remote\n")).toBeNull();
  });
});

describe("readGitClone", () => {
  it("returns null for a plain folder", async () => {
    expect(await readGitClone(folderWith({ "app.json": "{}" }))).toBeNull();
  });

  it("reads the branch and remote of a clone", async () => {
    const folder = folderWith({
      ".git/HEAD": "ref: refs/heads/main\n",
      ".git/config": '[remote "origin"]\n\turl = git@github.com:you/app-data.git\n',
    });
    expect(await readGitClone(folder)).toEqual({ branch: "main", remoteUrl: "git@github.com:you/app-data.git" });
  });

  it("handles a clone without a remote", async () => {
    expect(await readGitClone(folderWith({ ".git/HEAD": "ref: refs/heads/main\n" }))).toEqual({
      branch: "main",
      remoteUrl: null,
    });
  });
});
