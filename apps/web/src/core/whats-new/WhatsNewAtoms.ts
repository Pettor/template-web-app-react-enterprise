import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

/** Version that was running the last time "What's new" was shown (or skipped) on this device. */
export const whatsNewLastSeenVersionAtom = atomWithStorage<string | null>(
  "whats-new-last-seen-version",
  null,
  undefined,
  { getOnInit: true }
);

/** Set when the user reopens "What's new" by hand, so it shows even without unseen notes. */
export const whatsNewRequestedAtom = atom<boolean>(false);
