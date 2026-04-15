import { useCallback } from "react";
import { useAtom } from "jotai";
import { commandPaletteOpenAtom } from "./CommandPaletteAtoms";

export interface UseCommandPaletteResult {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
}

export function useCommandPalette(): UseCommandPaletteResult {
  const [isOpen, setIsOpen] = useAtom(commandPaletteOpenAtom);

  const open = useCallback(() => setIsOpen(true), [setIsOpen]);
  const close = useCallback(() => setIsOpen(false), [setIsOpen]);
  const toggle = useCallback(() => setIsOpen((prev) => !prev), [setIsOpen]);

  return { isOpen, open, close, toggle };
}
