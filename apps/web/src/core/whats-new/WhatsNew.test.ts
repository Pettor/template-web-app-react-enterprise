import { describe, expect, it } from "vitest";
import type { ReleaseNote } from "./ReleaseNotes";
import { RELEASE_NOTES } from "./ReleaseNotes";
import {
  compareReleaseLines,
  compareVersions,
  getNewerVersion,
  getReleasedNotes,
  getUnseenReleaseNotes,
  isAnnounceableVersion,
} from "./WhatsNew";

const message = { id: "test", defaultMessage: "test" };

function note(version: string): ReleaseNote {
  return { version, tagline: message, highlights: [], fixes: [] };
}

const notes = [note("2.0.0"), note("1.1.0"), note("1.0.0"), note("0.5.0"), note("0.4.0")];

function versions(result: ReleaseNote[]): string[] {
  return result.map((item) => item.version);
}

function unseen(currentVersion: string, lastSeenVersion: string | null): string[] {
  return versions(getUnseenReleaseNotes({ notes, currentVersion, lastSeenVersion }));
}

describe("compareVersions", () => {
  it("compares numerically, not as text", () => {
    expect(compareVersions("0.10.0", "0.9.0")).toBe(1);
    expect(compareVersions("1.0.0", "1.0.0")).toBe(0);
    expect(compareVersions("1.2", "1.2.1")).toBe(-1);
  });

  it("ignores pre-release and build suffixes", () => {
    expect(compareVersions("0.2.0-build.42", "0.2.0")).toBe(0);
  });
});

describe("compareReleaseLines", () => {
  it("ignores the patch number", () => {
    expect(compareReleaseLines("0.4.3", "0.4.2")).toBe(0);
    expect(compareReleaseLines("0.4.0", "0.4.9")).toBe(0);
  });

  it("compares major, then minor", () => {
    expect(compareReleaseLines("0.5.0", "0.4.9")).toBe(1);
    expect(compareReleaseLines("2.0.0", "1.9.9")).toBe(1);
    expect(compareReleaseLines("0.10.0", "0.9.0")).toBe(1);
    expect(compareReleaseLines("1.0.0", "1.1.0")).toBe(-1);
  });
});

describe("isAnnounceableVersion", () => {
  it("accepts major and minor versions only", () => {
    expect(isAnnounceableVersion("0.5.0")).toBe(true);
    expect(isAnnounceableVersion("2.0.0")).toBe(true);
    expect(isAnnounceableVersion("0.4.3")).toBe(false);
    expect(isAnnounceableVersion("0.5")).toBe(false);
    expect(isAnnounceableVersion("0.5.0-beta.1")).toBe(false);
  });
});

describe("getUnseenReleaseNotes", () => {
  it("shows nothing on a fresh install", () => {
    expect(unseen("2.0.0", null)).toEqual([]);
  });

  it("shows a new minor version (0.4 → 0.5)", () => {
    expect(unseen("0.5.0", "0.4.2")).toEqual(["0.5.0"]);
  });

  it("shows a new major version (1.x → 2.x)", () => {
    expect(unseen("2.0.0", "1.1.4")).toEqual(["2.0.0"]);
  });

  it("stays quiet after a patch update (0.4.2 → 0.4.3)", () => {
    expect(unseen("0.4.3", "0.4.2")).toEqual([]);
  });

  it("still shows the minor's notes when the first build you get is a patch (0.4.2 → 0.5.1)", () => {
    expect(unseen("0.5.1", "0.4.2")).toEqual(["0.5.0"]);
  });

  it("shows every release line missed, newest first", () => {
    expect(unseen("2.0.3", "0.5.1")).toEqual(["2.0.0", "1.1.0", "1.0.0"]);
  });

  it("shows nothing when the version didn't change or went back", () => {
    expect(unseen("1.0.0", "1.0.0")).toEqual([]);
    expect(unseen("0.5.0", "1.1.0")).toEqual([]);
  });

  it("skips notes for versions that aren't released yet", () => {
    expect(unseen("1.0.2", "0.5.0")).toEqual(["1.0.0"]);
  });

  it("ignores build suffixes on the running version", () => {
    expect(unseen("0.5.0-build.42", "0.4.0")).toEqual(["0.5.0"]);
  });
});

describe("getReleasedNotes", () => {
  it("lists everything up to the running release line, newest first", () => {
    expect(versions(getReleasedNotes([note("0.4.0"), note("1.0.0"), note("0.5.0")], "0.5.2"))).toEqual([
      "0.5.0",
      "0.4.0",
    ]);
  });
});

describe("getNewerVersion", () => {
  it("moves forward", () => {
    expect(getNewerVersion("0.3.0", null)).toBe("0.3.0");
    expect(getNewerVersion("0.3.1", "0.3.0")).toBe("0.3.1");
  });

  it("never goes back, so an older tab can't bring notes back for a newer one", () => {
    expect(getNewerVersion("0.2.0", "0.3.0")).toBe("0.3.0");
  });
});

describe("RELEASE_NOTES", () => {
  it("only has entries for major and minor versions (x.y.0)", () => {
    for (const release of RELEASE_NOTES) {
      expect(isAnnounceableVersion(release.version), `${release.version} must be x.y.0`).toBe(true);
    }
  });

  it("is sorted newest first with no duplicates", () => {
    for (let i = 1; i < RELEASE_NOTES.length; i++) {
      expect(compareVersions(RELEASE_NOTES[i - 1]!.version, RELEASE_NOTES[i]!.version)).toBe(1);
    }
  });

  it("has at least one highlight per release", () => {
    for (const release of RELEASE_NOTES) {
      expect(release.highlights.length, `${release.version} needs a highlight`).toBeGreaterThan(0);
    }
  });
});
