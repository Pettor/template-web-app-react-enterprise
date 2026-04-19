import { useMemo } from "react";
import {
  ArrowLeftStartOnRectangleIcon,
  ComputerDesktopIcon,
  HomeIcon,
  MoonIcon,
  Squares2X2Icon,
  SunIcon,
} from "@heroicons/react/20/solid";
import { useNavigate } from "@tanstack/react-router";
import { useSetAtom } from "jotai";
import { useIntl } from "react-intl";
import type { CommandPaletteProps } from "./CommandPalette";
import { useAuth } from "~/core/auth/UseAuth";
import type { Command } from "~/core/command-palette/Command";
import { useCommandPalette } from "~/core/command-palette/UseCommandPalette";
import { useCommandPaletteShortcut } from "~/core/command-palette/UseCommandPaletteShortcut";
import { useCommandShortcuts } from "~/core/command-palette/UseCommandShortcuts";
import { themeModeAtom } from "~/core/theme/ThemeAtoms";
import type { ThemeMode } from "~/core/theme/ThemeMode";

/**
 * Builds the app's default command list (navigation, theme, logout), wires up
 * the Cmd/Ctrl+K shortcut and per-command shortcuts, and returns props ready to
 * spread onto `<CommandPalette>`. To add or change commands, extend the array
 * returned from `useMemo` below — `Command` is intentionally minimal.
 */
export function useCommandPaletteController(): CommandPaletteProps {
  const intl = useIntl();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const setThemeMode = useSetAtom(themeModeAtom);
  const { isOpen, close } = useCommandPalette();

  const navigationGroup = intl.formatMessage({
    description: "CommandPaletteController - Navigation group label",
    defaultMessage: "Navigation",
    id: "vEUsuB",
  });
  const appearanceGroup = intl.formatMessage({
    description: "CommandPaletteController - Appearance group label",
    defaultMessage: "Appearance",
    id: "c6U7l1",
  });
  const accountGroup = intl.formatMessage({
    description: "CommandPaletteController - Account group label",
    defaultMessage: "Account",
    id: "5Z4vri",
  });

  const commands = useMemo<Command[]>(() => {
    function setTheme(mode: ThemeMode): void {
      setThemeMode(mode);
    }

    return [
      {
        id: "goto-home",
        label: intl.formatMessage({
          description: "CommandPaletteController - Go to home label",
          defaultMessage: "Go to Home",
          id: "D8e3/v",
        }),
        description: intl.formatMessage({
          description: "CommandPaletteController - Go to home description",
          defaultMessage: "Navigate to the home view",
          id: "cvb6xv",
        }),
        group: navigationGroup,
        keywords: ["home", "start"],
        icon: <HomeIcon className="h-4 w-4" />,
        shortcut: { mod: true, shift: true, key: "h" },
        perform: () => {
          void navigate({ to: "/" });
        },
      },
      {
        id: "goto-dashboard",
        label: intl.formatMessage({
          description: "CommandPaletteController - Go to dashboard label",
          defaultMessage: "Go to Dashboard",
          id: "Ha5oML",
        }),
        description: intl.formatMessage({
          description: "CommandPaletteController - Go to dashboard description",
          defaultMessage: "Open the dashboard view",
          id: "D7tsxt",
        }),
        group: navigationGroup,
        keywords: ["dashboard", "overview"],
        icon: <Squares2X2Icon className="h-4 w-4" />,
        shortcut: { mod: true, shift: true, key: "d" },
        perform: () => {
          void navigate({ to: "/dashboard" });
        },
      },
      {
        id: "theme-auto",
        label: intl.formatMessage({
          description: "CommandPaletteController - Theme system label",
          defaultMessage: "Theme: System",
          id: "iFv3J1",
        }),
        group: appearanceGroup,
        keywords: ["auto", "system", "theme"],
        icon: <ComputerDesktopIcon className="h-4 w-4" />,
        perform: () => setTheme("auto"),
      },
      {
        id: "theme-light",
        label: intl.formatMessage({
          description: "CommandPaletteController - Theme light label",
          defaultMessage: "Theme: Light",
          id: "gGAiHh",
        }),
        group: appearanceGroup,
        keywords: ["light", "theme"],
        icon: <SunIcon className="h-4 w-4" />,
        shortcut: { mod: true, shift: true, key: "l" },
        perform: () => setTheme("light"),
      },
      {
        id: "theme-dark",
        label: intl.formatMessage({
          description: "CommandPaletteController - Theme dark label",
          defaultMessage: "Theme: Dark",
          id: "iMmhhl",
        }),
        group: appearanceGroup,
        keywords: ["dark", "theme"],
        icon: <MoonIcon className="h-4 w-4" />,
        shortcut: { mod: true, shift: true, key: "k" },
        perform: () => setTheme("dark"),
      },
      {
        id: "logout",
        label: intl.formatMessage({
          description: "CommandPaletteController - Logout label",
          defaultMessage: "Log out",
          id: "vdNNyC",
        }),
        description: intl.formatMessage({
          description: "CommandPaletteController - Logout description",
          defaultMessage: "End the current session",
          id: "L125qQ",
        }),
        group: accountGroup,
        keywords: ["logout", "signout", "exit"],
        icon: <ArrowLeftStartOnRectangleIcon className="h-4 w-4" />,
        perform: () => {
          void logout();
        },
      },
    ];
  }, [intl, navigate, setThemeMode, logout, navigationGroup, appearanceGroup, accountGroup]);

  useCommandPaletteShortcut();
  useCommandShortcuts(commands);

  return { isOpen, commands, onClose: close };
}
