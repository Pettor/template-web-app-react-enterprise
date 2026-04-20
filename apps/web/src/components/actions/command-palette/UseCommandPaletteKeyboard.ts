import { useEffect, useRef } from "react";
import type { Command } from "./Command";

export interface UseCommandPaletteKeyboardProps {
  isOpen: boolean;
  filtered: Command[];
  activeId: string | undefined;
  commands: Command[];
  onClose: () => void;
  setActiveId: (id: string | undefined) => void;
}

export function useCommandPaletteKeyboard({
  isOpen,
  filtered,
  activeId,
  commands,
  onClose,
  setActiveId,
}: UseCommandPaletteKeyboardProps): void {
  const filteredRef = useRef(filtered);
  filteredRef.current = filtered;
  const activeIdRef = useRef(activeId);
  activeIdRef.current = activeId;
  const commandsRef = useRef(commands);
  commandsRef.current = commands;
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  // Attach a native, capture-phase keydown listener on `document` while the
  // palette is open. Native capture fires before any React synthetic handler
  // (including react-aria's input handlers), which lets us intercept arrow
  // keys while focus stays on the search input.
  useEffect(() => {
    if (!isOpen) return;

    function onKeyDown(event: KeyboardEvent): void {
      const list = filteredRef.current;
      switch (event.key) {
        case "ArrowDown": {
          if (list.length === 0) return;
          event.preventDefault();
          event.stopPropagation();
          const current = activeIdRef.current;
          const i = current ? list.findIndex((c) => c.id === current) : -1;
          setActiveId(list[(i + 1 + list.length) % list.length]!.id);
          return;
        }
        case "ArrowUp": {
          if (list.length === 0) return;
          event.preventDefault();
          event.stopPropagation();
          const current = activeIdRef.current;
          const i = current ? list.findIndex((c) => c.id === current) : 0;
          setActiveId(list[(i - 1 + list.length) % list.length]!.id);
          return;
        }
        case "Home": {
          if (list.length === 0) return;
          event.preventDefault();
          event.stopPropagation();
          setActiveId(list[0]!.id);
          return;
        }
        case "End": {
          if (list.length === 0) return;
          event.preventDefault();
          event.stopPropagation();
          setActiveId(list[list.length - 1]!.id);
          return;
        }
        case "Enter": {
          const id = activeIdRef.current;
          if (!id) return;
          event.preventDefault();
          event.stopPropagation();
          const command = commandsRef.current.find((c) => c.id === id);
          if (!command) return;
          onCloseRef.current();
          queueMicrotask(() => command.perform());
          return;
        }
        case "Escape": {
          event.preventDefault();
          event.stopPropagation();
          onCloseRef.current();
          return;
        }
        default:
          return;
      }
    }

    document.addEventListener("keydown", onKeyDown, true);
    return () => document.removeEventListener("keydown", onKeyDown, true);
  }, [isOpen, setActiveId]);
}
