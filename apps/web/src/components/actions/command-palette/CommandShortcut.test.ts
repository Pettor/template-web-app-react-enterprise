import { describe, expect, it } from "vitest";
import { isMac, matchesShortcut } from "./CommandShortcut";

describe("isMac", () => {
  it("returns a boolean", () => {
    expect(typeof isMac()).toBe("boolean");
  });
});

describe("matchesShortcut", () => {
  function makeEvent(
    key: string,
    opts: { metaKey?: boolean; ctrlKey?: boolean; shiftKey?: boolean; altKey?: boolean } = {}
  ): KeyboardEvent {
    return {
      key,
      metaKey: opts.metaKey ?? false,
      ctrlKey: opts.ctrlKey ?? false,
      shiftKey: opts.shiftKey ?? false,
      altKey: opts.altKey ?? false,
    } as unknown as KeyboardEvent;
  }

  function modEvent(key: string, extra: { shiftKey?: boolean; altKey?: boolean } = {}): KeyboardEvent {
    // Provide the correct modifier key based on the current platform.
    return makeEvent(key, isMac() ? { metaKey: true, ...extra } : { ctrlKey: true, ...extra });
  }

  it("matches a simple key with no modifiers", () => {
    expect(matchesShortcut(makeEvent("k"), { key: "k" })).toBe(true);
  });

  it("does not match when key differs", () => {
    expect(matchesShortcut(makeEvent("j"), { key: "k" })).toBe(false);
  });

  it("matches case-insensitively", () => {
    expect(matchesShortcut(makeEvent("K"), { key: "k" })).toBe(true);
  });

  it("does not match when mod is required but no modifier is pressed", () => {
    expect(matchesShortcut(makeEvent("k"), { mod: true, key: "k" })).toBe(false);
  });

  it("matches the platform modifier + key", () => {
    expect(matchesShortcut(modEvent("k"), { mod: true, key: "k" })).toBe(true);
  });

  it("does not match when shift is required but not pressed", () => {
    expect(matchesShortcut(modEvent("k"), { mod: true, shift: true, key: "k" })).toBe(false);
  });

  it("matches platform modifier + shift + key", () => {
    expect(matchesShortcut(modEvent("k", { shiftKey: true }), { mod: true, shift: true, key: "k" })).toBe(true);
  });

  it("does not match when alt is required but not pressed", () => {
    expect(matchesShortcut(modEvent("k"), { mod: true, alt: true, key: "k" })).toBe(false);
  });

  it("matches platform modifier + alt + key", () => {
    expect(matchesShortcut(modEvent("k", { altKey: true }), { mod: true, alt: true, key: "k" })).toBe(true);
  });

  it("does not match when unexpected shift is pressed", () => {
    expect(matchesShortcut(makeEvent("k", { shiftKey: true }), { key: "k" })).toBe(false);
  });
});
