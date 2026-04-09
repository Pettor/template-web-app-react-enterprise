import { atom } from "jotai";
import type { SettingsSection } from "./SettingsSection";

export interface SettingsModalState {
  isOpen: boolean;
  initialSection?: SettingsSection;
}

export const settingsModalAtom = atom<SettingsModalState>({ isOpen: false });
