import { useAtom } from "jotai";
import { themeModeEffect } from "./ThemeAtoms";

export function useTheme(): void {
  useAtom(themeModeEffect);
}
