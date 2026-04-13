import type { ReactElement } from "react";
import type { CommandShortcut } from "./CommandShortcut";

/**
 * A single actionable command exposed by the command palette.
 *
 * Keep the shape minimal so new commands can be added by simply appending
 * a new object to the list in `UseCommandPaletteCommands`.
 */
export interface Command {
  /** Stable identifier, used as the ListBox item key. */
  id: string;
  /** Primary label shown to the user and used for filtering. */
  label: string;
  /** Optional secondary description, also used for filtering. */
  description?: string;
  /** Optional leading icon. */
  icon?: ReactElement;
  /** Extra keywords that should match the command (not displayed). */
  keywords?: string[];
  /** Optional logical grouping label (e.g. "Navigation", "Theme"). */
  group?: string;
  /** Optional global keyboard shortcut that triggers the command from anywhere. */
  shortcut?: CommandShortcut;
  /** Invoked when the command is activated. */
  perform: () => void;
}
