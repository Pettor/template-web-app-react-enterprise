import { atomWithStorage, createJSONStorage } from "jotai/utils";
import type { AppData } from "./AppData";
import { createEmptyData, normalizeData } from "./AppData";

const storage = createJSONStorage<AppData>(() => localStorage);

/**
 * The app's data. Always kept in this browser's storage; when sync is set up,
 * `core/sync` mirrors it to the data folder or GitHub repository.
 */
export const appDataAtom = atomWithStorage<AppData>(
  "app-data",
  createEmptyData(),
  {
    ...storage,
    getItem: (key, initialValue) => normalizeData(storage.getItem(key, initialValue)),
  },
  { getOnInit: true }
);
