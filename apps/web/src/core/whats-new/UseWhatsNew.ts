import { useCallback, useEffect, useMemo } from "react";
import { useAtom } from "jotai";
import type { ReleaseNote } from "./ReleaseNotes";
import { RELEASE_NOTES } from "./ReleaseNotes";
import { getNewerVersion, getReleasedNotes, getUnseenReleaseNotes } from "./WhatsNew";
import { whatsNewLastSeenVersionAtom, whatsNewRequestedAtom } from "./WhatsNewAtoms";

export interface UseWhatsNewResult {
  isOpen: boolean;
  /** Newest first. */
  releases: ReleaseNote[];
  /** Whether any notes exist for this version or older, i.e. whether `open()` has anything to show. */
  hasReleaseNotes: boolean;
  open: () => void;
  close: () => void;
}

/** Shows release notes once after a major or minor update, and whenever the user asks for them. */
export function useWhatsNew(): UseWhatsNewResult {
  const currentVersion: string = import.meta.env.VITE_APP_VERSION;
  const [lastSeenVersion, setLastSeenVersion] = useAtom(whatsNewLastSeenVersionAtom);
  const [isRequested, setRequested] = useAtom(whatsNewRequestedAtom);

  const released = useMemo(() => getReleasedNotes(RELEASE_NOTES, currentVersion), [currentVersion]);
  const unseen = useMemo(
    () => getUnseenReleaseNotes({ notes: RELEASE_NOTES, currentVersion, lastSeenVersion }),
    [currentVersion, lastSeenVersion]
  );

  // Nothing to announce (fresh install, patch update, or no notes written): remember the version quietly.
  // Only ever forward: an older build in another tab must not undo what a newer one marked as seen.
  useEffect(() => {
    if (unseen.length === 0 && getNewerVersion(currentVersion, lastSeenVersion) !== lastSeenVersion) {
      setLastSeenVersion(currentVersion);
    }
  }, [currentVersion, lastSeenVersion, setLastSeenVersion, unseen.length]);

  const releases = isRequested ? released : unseen;

  const open = useCallback(() => setRequested(true), [setRequested]);

  const close = useCallback(() => {
    setRequested(false);
    setLastSeenVersion((stored) => getNewerVersion(currentVersion, stored));
  }, [currentVersion, setLastSeenVersion, setRequested]);

  return { isOpen: releases.length > 0, releases, hasReleaseNotes: released.length > 0, open, close };
}
