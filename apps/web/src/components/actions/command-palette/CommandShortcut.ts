/**
 * Keyboard shortcut descriptor used by commands in the command palette.
 *
 * `mod` is the platform-agnostic "command" modifier: it maps to ⌘ on macOS
 * and Ctrl everywhere else, so a single shortcut description works on both.
 */
export interface CommandShortcut {
  mod?: boolean;
  shift?: boolean;
  alt?: boolean;
  /** Single key identifier (case-insensitive), e.g. "k", "d", "/". */
  key: string;
}

export function isMac(): boolean {
  if (typeof navigator === "undefined") return false;
  const platform = navigator.platform ?? "";
  const ua = navigator.userAgent ?? "";
  return /Mac|iPhone|iPad|iPod/.test(platform) || /Mac|iPhone|iPad|iPod/.test(ua);
}

export function matchesShortcut(event: KeyboardEvent, shortcut: CommandShortcut): boolean {
  const modPressed = isMac() ? event.metaKey : event.ctrlKey;
  if (!!shortcut.mod !== modPressed) return false;
  if (!!shortcut.shift !== event.shiftKey) return false;
  if (!!shortcut.alt !== event.altKey) return false;
  return event.key.toLowerCase() === shortcut.key.toLowerCase();
}
