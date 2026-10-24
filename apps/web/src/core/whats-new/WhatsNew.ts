import type { ReleaseNote } from "./ReleaseNotes";

function parseVersion(version: string): number[] {
  return version
    .split(/[-+]/)[0]!
    .split(".")
    .map((part) => Number(part) || 0);
}

/** Compares dotted versions numerically ("0.10.0" > "0.9.0"); a pre-release or build suffix is ignored. */
export function compareVersions(a: string, b: string): number {
  const partsA = parseVersion(a);
  const partsB = parseVersion(b);
  for (let i = 0; i < Math.max(partsA.length, partsB.length); i++) {
    const diff = (partsA[i] ?? 0) - (partsB[i] ?? 0);
    if (diff !== 0) {
      return Math.sign(diff);
    }
  }
  return 0;
}

/**
 * Compares only `major.minor`, the part of a version that "What's new" cares about.
 * "0.5.3" and "0.5.0" are the same release line; "0.5.0" is newer than "0.4.9".
 */
export function compareReleaseLines(a: string, b: string): number {
  const [majorA = 0, minorA = 0] = parseVersion(a);
  const [majorB = 0, minorB = 0] = parseVersion(b);
  return Math.sign(majorA - majorB) || Math.sign(minorA - minorB);
}

/** Release notes are only written for major and minor versions: `x.y.0`, no suffix. */
export function isAnnounceableVersion(version: string): boolean {
  return /^\d+\.\d+\.0$/.test(version);
}

/**
 * The version to remember as seen: never older than what's stored. A tab still running an older
 * build would otherwise lower it, and every newer tab would show its notes again.
 */
export function getNewerVersion(version: string, lastSeenVersion: string | null): string {
  return lastSeenVersion !== null && compareVersions(lastSeenVersion, version) > 0 ? lastSeenVersion : version;
}

/** Notes for every release line up to and including the running one, newest first. */
export function getReleasedNotes(notes: ReleaseNote[], currentVersion: string): ReleaseNote[] {
  return notes
    .filter((note) => compareReleaseLines(note.version, currentVersion) <= 0)
    .sort((a, b) => compareVersions(b.version, a.version));
}

export interface WhatsNewInput {
  notes: ReleaseNote[];
  currentVersion: string;
  /** Version that was running the last time this device saw (or skipped) "What's new"; null if never. */
  lastSeenVersion: string | null;
}

/**
 * Release notes to show after an update, newest first. Only a new major or minor
 * release line counts: 0.4.x → 0.5.x and 1.x → 2.x show notes, 0.4.2 → 0.4.3 does not.
 * Empty on a fresh install, after a patch update or a downgrade, and when no notes
 * were written for the release lines in between.
 */
export function getUnseenReleaseNotes({ notes, currentVersion, lastSeenVersion }: WhatsNewInput): ReleaseNote[] {
  if (lastSeenVersion === null) {
    // A fresh install has nothing to catch up on.
    return [];
  }
  return getReleasedNotes(notes, currentVersion).filter(
    (note) => compareReleaseLines(note.version, lastSeenVersion) > 0
  );
}
