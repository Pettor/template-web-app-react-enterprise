import { useEffect } from "react";
import { useCommandPalette } from "./UseCommandPalette";

/**
 * Registers a global keyboard listener that toggles the command palette when
 * the user presses Cmd+K (macOS) or Ctrl+K (Windows/Linux).
 */
export function useCommandPaletteShortcut(): void {
  const { toggle } = useCommandPalette();

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent): void {
      const isModifier = event.metaKey || event.ctrlKey;
      if (isModifier && !event.shiftKey && !event.altKey && event.key.toLowerCase() === "k") {
        event.preventDefault();
        toggle();
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [toggle]);
}
