import type { Atom } from "jotai";
import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { atomEffect } from "jotai-effect";
import type { ThemeMode } from "./ThemeMode";

const themeLocalStorageAtom = atomWithStorage<ThemeMode>("theme", "auto");
const themeMediaQueryAtom = atom(() => window.matchMedia("(prefers-color-scheme: dark)"));

// Stores the user's preference: "auto", "light", or "dark"
export const themeModeAtom = atom(
  (get) => get(themeLocalStorageAtom) || "auto",
  (_get, set, newTheme: ThemeMode) => {
    set(themeLocalStorageAtom, newTheme);
  }
);

// Resolves "auto" to the actual applied theme
export const resolvedThemeModeAtom = atom((get) => {
  const mode = get(themeModeAtom);
  if (mode === "auto") {
    const mediaQuery = get(themeMediaQueryAtom);
    return mediaQuery.matches ? "dark" : "light";
  }
  return mode;
});

// Effects
export const themeModeEffect: Atom<void> = atomEffect((get) => {
  const resolved = get(resolvedThemeModeAtom);
  document.querySelector("html")?.setAttribute("class", resolved);
});
