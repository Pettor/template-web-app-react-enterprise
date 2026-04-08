import { useAtom } from "jotai";
import type { ThemeSelectorProps } from "./ThemeSelector";
import { themeModeAtom } from "~/core/theme/ThemeAtoms";
import type { ThemeMode } from "~/core/theme/ThemeMode";

export function useThemeSelector(): ThemeSelectorProps {
  const [themeMode, setThemeMode] = useAtom(themeModeAtom);

  function onSelect(mode: ThemeMode): void {
    setThemeMode(mode);
  }

  return {
    mode: themeMode,
    onSelect,
  };
}
