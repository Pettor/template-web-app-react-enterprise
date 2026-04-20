import { useEffect } from "react";
import type { Command } from "./Command";
import { matchesShortcut } from "./CommandShortcut";

/**
 * Registers a single global keydown listener that fires each command whose
 * `shortcut` descriptor matches the event.
 *
 * Non-modifier shortcuts are ignored while focus is inside an editable
 * element so they don't interfere with typing. Modifier shortcuts (⌘/Ctrl)
 * always fire regardless of focus, matching typical desktop conventions.
 */
export function useCommandShortcuts(commands: Command[]): void {
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent): void {
      const target = event.target as HTMLElement | null;
      const editable =
        !!target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable);

      for (const command of commands) {
        if (!command.shortcut) continue;
        if (!matchesShortcut(event, command.shortcut)) continue;
        if (editable && !command.shortcut.mod) continue;
        event.preventDefault();
        command.perform();
        return;
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [commands]);
}
