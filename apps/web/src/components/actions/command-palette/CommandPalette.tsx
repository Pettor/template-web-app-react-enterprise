import { useEffect, useMemo, useState, type ReactElement } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { InputGroup, InputGroupInput, InputGroupPrefix, ListBox, ListBoxItem, Modal, TextField } from "@heroui/react";
import { useIntl } from "react-intl";
import type { Command } from "~/core/command-palette/Command";

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

export function CommandPalette({ isOpen, commands, onClose }: CommandPaletteProps): ReactElement {
  const intl = useIntl();
  const [query, setQuery] = useState("");

  // Reset the query whenever the palette opens so the user starts fresh.
  useEffect(() => {
    if (isOpen) {
      setQuery("");
    }
  }, [isOpen]);

  const filtered = useMemo(() => filterCommands(commands, query), [commands, query]);
  const groups = useMemo(() => groupCommands(filtered), [filtered]);

  function runCommand(id: string): void {
    const command = commands.find((c) => c.id === id);
    if (!command) return;
    onClose();
    // Defer so the modal close animation can start before navigation/state change.
    queueMicrotask(() => command.perform());
  }

  return (
    <Modal isOpen={isOpen} onOpenChange={(open) => !open && onClose()}>
      <Modal.Backdrop variant="blur">
        <Modal.Container size="md" className="items-start pt-[15vh]">
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
                    placeholder={intl.formatMessage({
                      description: "CommandPalette - Search placeholder",
                      defaultMessage: "Type a command or search…",
                      id: "pOZo69",
                    })}
                    data-testid="command-palette__search"
                  />
                </InputGroup>
              </TextField>
            </Modal.Header>
            <Modal.Body className="max-h-96 overflow-y-auto p-2">
              {filtered.length === 0 ? (
                <div className="text-default-500 flex items-center justify-center p-6 text-sm">
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
                      <ListBox
                        aria-label={group.name === DEFAULT_GROUP ? "Commands" : group.name}
                        onAction={(key) => runCommand(String(key))}
                      >
                        {group.commands.map((command) => (
                          <ListBoxItem
                            key={command.id}
                            id={command.id}
                            textValue={command.label}
                            data-testid={`command-palette__item-${command.id}`}
                          >
                            {command.icon && (
                              <span className="text-default-600 flex h-5 w-5 items-center justify-center">
                                {command.icon}
                              </span>
                            )}
                            <div className="flex flex-col">
                              <span className="text-sm">{command.label}</span>
                              {command.description && (
                                <span className="text-default-500 text-xs">{command.description}</span>
                              )}
                            </div>
                          </ListBoxItem>
                        ))}
                      </ListBox>
                    </div>
                  ))}
                </div>
              )}
            </Modal.Body>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}
