import { useMemo, type ReactElement } from "react";
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
import { CommandPalette } from "~/components/actions/command-palette/CommandPalette";
import { useAuth } from "~/core/auth/UseAuth";
import type { Command } from "~/core/command-palette/Command";
import { useCommandPalette } from "~/core/command-palette/UseCommandPalette";
import { useCommandPaletteShortcut } from "~/core/command-palette/UseCommandPaletteShortcut";
import { useCommandShortcuts } from "~/core/command-palette/UseCommandShortcuts";
import { themeModeAtom } from "~/core/theme/ThemeAtoms";
import type { ThemeMode } from "~/core/theme/ThemeMode";

/**
 * Wires the presentational `CommandPalette` up to the app: registers the
 * Cmd/Ctrl+K shortcut, builds the default command list (navigation, theme,
 * logout) and dispatches each command to the right side effect.
 *
 * To add or change commands, extend the `commands` array returned from
 * `useMemo` below — `Command` is intentionally minimal.
 */
export function CommandPaletteModule(): ReactElement {
  const intl = useIntl();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const setThemeMode = useSetAtom(themeModeAtom);
  const { isOpen, close } = useCommandPalette();


  const navigationGroup = intl.formatMessage({
    description: "CommandPaletteModule - Navigation group label",
    defaultMessage: "Navigation",
    id: "j1tsyC",
  });
  const appearanceGroup = intl.formatMessage({
    description: "CommandPaletteModule - Appearance group label",
    defaultMessage: "Appearance",
    id: "bmHpDw",
  });
  const accountGroup = intl.formatMessage({
    description: "CommandPaletteModule - Account group label",
    defaultMessage: "Account",
    id: "VCtMhT",
  });

  const commands = useMemo<Command[]>(() => {
    function setTheme(mode: ThemeMode): void {
      setThemeMode(mode);
    }

    return [
      {
        id: "goto-home",
        label: intl.formatMessage({
          description: "CommandPaletteModule - Go to home label",
          defaultMessage: "Go to Home",
          id: "Y4yO4h",
        }),
        description: intl.formatMessage({
          description: "CommandPaletteModule - Go to home description",
          defaultMessage: "Navigate to the home view",
          id: "pN542Q",
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
          description: "CommandPaletteModule - Go to dashboard label",
          defaultMessage: "Go to Dashboard",
          id: "RG5SWG",
        }),
        description: intl.formatMessage({
          description: "CommandPaletteModule - Go to dashboard description",
          defaultMessage: "Open the dashboard view",
          id: "ZjU8B8",
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
          description: "CommandPaletteModule - Theme system label",
          defaultMessage: "Theme: System",
          id: "dRAKzT",
        }),
        group: appearanceGroup,
        keywords: ["auto", "system", "theme"],
        icon: <ComputerDesktopIcon className="h-4 w-4" />,
        perform: () => setTheme("auto"),
      },
      {
        id: "theme-light",
        label: intl.formatMessage({
          description: "CommandPaletteModule - Theme light label",
          defaultMessage: "Theme: Light",
          id: "KmJBXs",
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
          description: "CommandPaletteModule - Theme dark label",
          defaultMessage: "Theme: Dark",
          id: "uLZCKb",
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
          description: "CommandPaletteModule - Logout label",
          defaultMessage: "Log out",
          id: "UwhKeU",
        }),
        description: intl.formatMessage({
          description: "CommandPaletteModule - Logout description",
          defaultMessage: "End the current session",
          id: "ShqEhN",
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

  return <CommandPalette isOpen={isOpen} commands={commands} onClose={close} />;
}
