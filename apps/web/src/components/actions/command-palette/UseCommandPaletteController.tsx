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
import type { Command } from "./Command";
import type { CommandPaletteProps } from "./CommandPalette";
import { useCommandPalette } from "./UseCommandPalette";
import { useCommandPaletteShortcut } from "./UseCommandPaletteShortcut";
import { useCommandShortcuts } from "./UseCommandShortcuts";
import { useAuth } from "~/core/auth/UseAuth";
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
    description: "CommandPaletteController: label - navigation group",
    defaultMessage: "Navigation",
    id: "RCtY7O",
  });
  const appearanceGroup = intl.formatMessage({
    description: "CommandPaletteController: label - appearance group",
    defaultMessage: "Appearance",
    id: "vWoN3+",
  });
  const accountGroup = intl.formatMessage({
    description: "CommandPaletteController: label - account group",
    defaultMessage: "Account",
    id: "9cU9e3",
  });

  const commands = useMemo<Command[]>(() => {
    function setTheme(mode: ThemeMode): void {
      setThemeMode(mode);
    }

    return [
      {
        id: "goto-home",
        label: intl.formatMessage({
          description: "CommandPaletteController: label - go to home command",
          defaultMessage: "Go to Home",
          id: "0M2q2L",
        }),
        description: intl.formatMessage({
          description: "CommandPaletteController: caption - go to home command",
          defaultMessage: "Navigate to the home view",
          id: "rHCEXQ",
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
          description: "CommandPaletteController: label - go to dashboard command",
          defaultMessage: "Go to Dashboard",
          id: "sPhJsx",
        }),
        description: intl.formatMessage({
          description: "CommandPaletteController: caption - go to dashboard command",
          defaultMessage: "Open the dashboard view",
          id: "lHbB2E",
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
          description: "CommandPaletteController: label - theme system command",
          defaultMessage: "Theme: System",
          id: "xr2NN2",
        }),
        group: appearanceGroup,
        keywords: ["auto", "system", "theme"],
        icon: <ComputerDesktopIcon className="h-4 w-4" />,
        perform: () => setTheme("auto"),
      },
      {
        id: "theme-light",
        label: intl.formatMessage({
          description: "CommandPaletteController: label - theme light command",
          defaultMessage: "Theme: Light",
          id: "MibXHq",
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
          description: "CommandPaletteController: label - theme dark command",
          defaultMessage: "Theme: Dark",
          id: "5ywSOX",
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
          description: "CommandPaletteController: label - logout command",
          defaultMessage: "Log out",
          id: "9/X3Xw",
        }),
        description: intl.formatMessage({
          description: "CommandPaletteController: caption - logout command",
          defaultMessage: "End the current session",
          id: "oUdMPU",
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
