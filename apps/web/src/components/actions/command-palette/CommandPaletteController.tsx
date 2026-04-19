import type { ReactElement } from "react";
import { CommandPalette } from "./CommandPalette";
import { useCommandPaletteController } from "./UseCommandPaletteController";

export function CommandPaletteController(): ReactElement {
  const props = useCommandPaletteController();
  return <CommandPalette {...props} />;
}
