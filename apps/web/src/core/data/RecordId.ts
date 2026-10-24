const CROCKFORD = "0123456789ABCDEFGHJKMNPQRSTVWXYZ";

/**
 * Creates a ULID: 10 characters of millisecond timestamp followed by 16
 * random characters, Crockford base32. Ids sort by creation time, so record
 * files list in the order they were made.
 */
export function createRecordId(now: number = Date.now()): string {
  let time = "";
  let remaining = now;
  for (let i = 0; i < 10; i += 1) {
    time = CROCKFORD[remaining % 32] + time;
    remaining = Math.floor(remaining / 32);
  }

  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);
  let random = "";
  for (const byte of bytes) {
    random += CROCKFORD[byte % 32];
  }

  return time + random;
}

/** ISO 8601 in UTC without milliseconds, e.g. `2026-10-21T08:00:00Z`. Sorts as text. */
export function toUtcTimestamp(date: Date): string {
  return `${date.toISOString().slice(0, 19)}Z`;
}
