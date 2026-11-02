import { describe, expect, it } from "vitest";
import { readDataVersion } from "./DataVersion";

describe("DataVersion", () => {
  it("reads the data version from app.json", () => {
    expect(readDataVersion('{ "schema": "app.data/v1", "dataVersion": 4 }')).toBe(4);
  });

  it("treats a missing, malformed or unreadable version as 0", () => {
    expect(readDataVersion('{ "schema": "app.data/v1" }')).toBe(0);
    expect(readDataVersion('{ "dataVersion": "2" }')).toBe(0);
    expect(readDataVersion("not json")).toBe(0);
  });
});
