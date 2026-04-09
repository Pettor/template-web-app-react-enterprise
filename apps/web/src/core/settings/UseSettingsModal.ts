import { useCallback, useMemo } from "react";
import { useAtom } from "jotai";
import { settingsModalAtom } from "./SettingsAtoms";
import type { SettingsSection } from "./SettingsSection";
import { getAuthStatus } from "~/core/auth/AuthState";

export interface UseSettingsModalResult {
  isOpen: boolean;
  initialSection?: SettingsSection;
  sections: SettingsSection[];
  open: (section?: SettingsSection) => void;
  close: () => void;
}

export function useSettingsModal(): UseSettingsModalResult {
  const [state, setState] = useAtom(settingsModalAtom);
  const authStatus = getAuthStatus();

  const sections = useMemo<SettingsSection[]>(() => {
    if (authStatus === "authenticated") {
      return ["account", "appearance", "about"];
    }
    return ["appearance", "about"];
  }, [authStatus]);

  const open = useCallback(
    (section?: SettingsSection) => {
      setState({ isOpen: true, initialSection: section });
    },
    [setState]
  );

  const close = useCallback(() => {
    setState({ isOpen: false });
  }, [setState]);

  return {
    isOpen: state.isOpen,
    initialSection: state.initialSection,
    sections,
    open,
    close,
  };
}
