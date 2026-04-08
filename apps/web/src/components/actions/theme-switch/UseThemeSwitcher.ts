import { useAtom } from "jotai";
import type { ThemeSwitchProps } from "./ThemeSwitch";
import { themeModeAtom } from "~/core/theme/ThemeAtoms";

export function useThemeSwitcher(): ThemeSwitchProps {
  const [themeMode, toggleTheme] = useAtom(themeModeAtom);

  function setTheme(): void {
    toggleTheme();
  }

  return {
    mode: themeMode,
    onSwitch: setTheme,
  };
}
