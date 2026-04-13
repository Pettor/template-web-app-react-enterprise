import { useEffect, useMemo, useRef, useState, type KeyboardEvent as ReactKeyboardEvent, type ReactElement } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { InputGroup, InputGroupInput, InputGroupPrefix, Kbd, Modal, TextField } from "@heroui/react";
import { useIntl } from "react-intl";
import type { Command } from "~/core/command-palette/Command";
import { type CommandShortcut, isMac } from "~/core/command-palette/CommandShortcut";

export interface CommandPaletteProps {
  isOpen: boolean;
  commands: Command[];
  onClose: () => void;
}

interface CommandGroup {
  name: string;
  commands: Command[];
}

const DEFAULT_GROUP = "__default__";

function filterCommands(commands: Command[], query: string): Command[] {
  const normalized = query.trim().toLowerCase();
  if (!normalized) {
    return commands;
  }
  return commands.filter((command) => {
    const haystack = [command.label, command.description ?? "", ...(command.keywords ?? []), command.group ?? ""]
      .join(" ")
      .toLowerCase();
    return haystack.includes(normalized);
  });
}

function groupCommands(commands: Command[]): CommandGroup[] {
  const groups = new Map<string, Command[]>();
  for (const command of commands) {
    const key = command.group ?? DEFAULT_GROUP;
    const existing = groups.get(key);
    if (existing) {
      existing.push(command);
    } else {
      groups.set(key, [command]);
    }
  }
  return Array.from(groups.entries()).map(([name, groupCommands]) => ({ name, commands: groupCommands }));
}

function ShortcutDisplay({ shortcut }: { shortcut: CommandShortcut }): ReactElement {
  const mac = isMac();
  return (
    <Kbd className="text-[10px]">
      {shortcut.mod && (mac ? <Kbd.Abbr keyValue="command" /> : <Kbd.Content>Ctrl</Kbd.Content>)}
      {shortcut.alt && (mac ? <Kbd.Abbr keyValue="option" /> : <Kbd.Content>Alt</Kbd.Content>)}
      {shortcut.shift && (mac ? <Kbd.Abbr keyValue="shift" /> : <Kbd.Content>Shift</Kbd.Content>)}
      <Kbd.Content>{shortcut.key.toUpperCase()}</Kbd.Content>
    </Kbd>
  );
}

export function CommandPalette({ isOpen, commands, onClose }: CommandPaletteProps): ReactElement {
  const intl = useIntl();
  const [query, setQuery] = useState("");
  const [activeId, setActiveId] = useState<string | undefined>(undefined);
  const listRef = useRef<HTMLDivElement | null>(null);

  // Reset the query whenever the palette opens so the user starts fresh.
  useEffect(() => {
    if (isOpen) {
      setQuery("");
    }
  }, [isOpen]);

  const filtered = useMemo(() => filterCommands(commands, query), [commands, query]);
  const groups = useMemo(() => groupCommands(filtered), [filtered]);

  // Keep the active item valid whenever the filtered list changes.
  useEffect(() => {
    if (filtered.length === 0) {
      setActiveId(undefined);
      return;
    }
    setActiveId((prev) => (prev && filtered.some((c) => c.id === prev) ? prev : filtered[0]!.id));
  }, [filtered]);

  // Scroll the active item into view when it changes via keyboard.
  useEffect(() => {
    if (!activeId || !listRef.current) return;
    const element = listRef.current.querySelector<HTMLElement>(`[data-command-id="${activeId}"]`);
    element?.scrollIntoView({ block: "nearest" });
  }, [activeId]);

  function runCommand(id: string | undefined): void {
    if (!id) return;
    const command = commands.find((c) => c.id === id);
    if (!command) return;
    onClose();
    // Defer so the modal close animation can start before navigation/state change.
    queueMicrotask(() => command.perform());
  }

  function moveActive(delta: number): void {
    if (filtered.length === 0) return;
    const currentIndex = activeId ? filtered.findIndex((c) => c.id === activeId) : -1;
    const nextIndex = (currentIndex + delta + filtered.length) % filtered.length;
    setActiveId(filtered[nextIndex]!.id);
  }

  function handleInputKeyDown(event: ReactKeyboardEvent<HTMLInputElement>): void {
    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        moveActive(1);
        return;
      case "ArrowUp":
        event.preventDefault();
        moveActive(-1);
        return;
      case "Home":
        if (filtered.length > 0) {
          event.preventDefault();
          setActiveId(filtered[0]!.id);
        }
        return;
      case "End":
        if (filtered.length > 0) {
          event.preventDefault();
          setActiveId(filtered[filtered.length - 1]!.id);
        }
        return;
      case "Enter":
        event.preventDefault();
        runCommand(activeId);
        return;
      case "Escape":
        // Close in a single press: preempt TextField's clear-on-escape
        // behavior and the Modal's own Escape handler.
        event.preventDefault();
        event.stopPropagation();
        onClose();
        return;
      default:
        return;
    }
  }

  return (
    <Modal isOpen={isOpen} onOpenChange={(open) => !open && onClose()}>
      <Modal.Backdrop variant="blur">
        <Modal.Container size="md">
          <Modal.Dialog
            aria-label={intl.formatMessage({
              description: "CommandPalette - Dialog aria label",
              defaultMessage: "Command palette",
              id: "h5GJcX",
            })}
            className="overflow-hidden shadow-2xl"
          >
            <Modal.Header className="border-b p-0">
              <TextField aria-label="command-palette-search" className="w-full">
                <InputGroup fullWidth className="border-0 shadow-none">
                  <InputGroupPrefix>
                    <MagnifyingGlassIcon className="text-default-500 h-5 w-5" />
                  </InputGroupPrefix>
                  <InputGroupInput
                    autoFocus
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={handleInputKeyDown}
                    placeholder={intl.formatMessage({
                      description: "CommandPalette - Search placeholder",
                      defaultMessage: "Type a command or search…",
                      id: "pOZo69",
                    })}
                    aria-activedescendant={activeId ? `command-palette__option-${activeId}` : undefined}
                    data-testid="command-palette__search"
                  />
                </InputGroup>
              </TextField>
            </Modal.Header>
            <Modal.Body className="h-96 overflow-y-auto p-2">
              <div ref={listRef} role="listbox" aria-label="Commands" className="h-full">
                {filtered.length === 0 ? (
                  <div className="text-default-500 flex h-full items-center justify-center p-6 text-sm">
                    {intl.formatMessage({
                      description: "CommandPalette - Empty state",
                      defaultMessage: "No commands found",
                      id: "vXSAj4",
                    })}
                  </div>
                ) : (
                  <div className="flex flex-col gap-3">
                    {groups.map((group) => (
                      <div key={group.name}>
                        {group.name !== DEFAULT_GROUP && (
                          <div className="text-default-500 px-2 pb-1 text-xs font-medium uppercase">{group.name}</div>
                        )}
                        <div className="flex flex-col">
                          {group.commands.map((command) => {
                            const isActive = command.id === activeId;
                            return (
                              <div
                                key={command.id}
                                id={`command-palette__option-${command.id}`}
                                role="option"
                                aria-selected={isActive}
                                data-command-id={command.id}
                                data-testid={`command-palette__item-${command.id}`}
                                onMouseEnter={() => setActiveId(command.id)}
                                onMouseDown={(e) => {
                                  // Prevent the input from losing focus on click.
                                  e.preventDefault();
                                  runCommand(command.id);
                                }}
                                className={`flex cursor-pointer items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors ${
                                  isActive ? "bg-default-100 text-default-900" : "text-default-700"
                                }`}
                              >
                                {command.icon && (
                                  <span className="text-default-600 flex h-5 w-5 items-center justify-center">
                                    {command.icon}
                                  </span>
                                )}
                                <div className="flex min-w-0 flex-1 flex-col">
                                  <span className="truncate">{command.label}</span>
                                  {command.description && (
                                    <span className="text-default-500 truncate text-xs">{command.description}</span>
                                  )}
                                </div>
                                {command.shortcut && <ShortcutDisplay shortcut={command.shortcut} />}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </Modal.Body>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}
