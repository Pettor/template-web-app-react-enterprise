import { z } from "zod";

/** Only the data version, so a manifest this version can't otherwise read still says what it needs. */
const DataVersionSchema = z.object({ dataVersion: z.number().int().nonnegative().catch(0) });

/** The data version in an `app.json`; 0 for a folder from before data versions or one that can't be read. */
export function readDataVersion(manifest: string): number {
  try {
    const parsed = DataVersionSchema.safeParse(JSON.parse(manifest));
    return parsed.success ? parsed.data.dataVersion : 0;
  } catch {
    return 0;
  }
}

/** A newer version of the app wrote to the data folder; this app must be updated before it syncs again. */
export class NewerDataVersionError extends Error {
  constructor(
    /** The folder's data version. */
    readonly folderVersion: number
  ) {
    super(`This data folder was written by a newer version of the app (data version ${folderVersion}).`);
    this.name = "NewerDataVersionError";
  }
}
