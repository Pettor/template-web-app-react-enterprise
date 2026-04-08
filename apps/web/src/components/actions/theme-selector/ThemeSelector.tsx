import type { ReactElement, ReactNode } from "react";
import { ComputerDesktopIcon, MoonIcon, SunIcon } from "@heroicons/react/20/solid";
import { Radio, RadioGroup } from "@heroui/react";
import clsx from "clsx";
import { useIntl } from "react-intl";
import type { ThemeMode } from "~/core/theme/ThemeMode";

export interface ThemeSelectorProps {
  mode: ThemeMode;
  onSelect: (mode: ThemeMode) => void;
}

interface ThemeOptionProps {
  value: ThemeMode;
  label: string;
  icon: ReactNode;
  preview: ReactNode;
}

function ThemeOption({ value, label, icon, preview }: ThemeOptionProps): ReactElement {
  return (
    <Radio value={value} className="group flex cursor-pointer flex-col items-center gap-1.5" aria-label={label}>
      {({ isSelected }) => (
        <>
          <div
            className={clsx(
              "flex h-16 w-20 items-end overflow-hidden rounded-lg border-2 transition-colors",
              isSelected ? "border-primary" : "border-default-200 group-hover:border-default-400"
            )}
          >
            {preview}
          </div>
          <div className="flex items-center gap-1">
            <span className={clsx("text-xs", isSelected ? "text-primary font-medium" : "text-default-500")}>
              {icon}
            </span>
            <span className={clsx("text-xs", isSelected ? "text-primary font-medium" : "text-default-500")}>
              {label}
            </span>
          </div>
        </>
      )}
    </Radio>
  );
}

function LightPreview(): ReactElement {
  return (
    <div className="flex h-full w-full flex-col bg-white">
      <div className="h-2 w-full bg-gray-100" />
      <div className="flex flex-1 gap-1 p-1.5">
        <div className="w-1/3 rounded-sm bg-gray-100" />
        <div className="flex flex-1 flex-col gap-1">
          <div className="h-1.5 w-3/4 rounded-sm bg-gray-200" />
          <div className="h-1 w-1/2 rounded-sm bg-gray-100" />
          <div className="h-1 w-2/3 rounded-sm bg-gray-100" />
        </div>
      </div>
    </div>
  );
}

function DarkPreview(): ReactElement {
  return (
    <div className="flex h-full w-full flex-col bg-zinc-900">
      <div className="h-2 w-full bg-zinc-800" />
      <div className="flex flex-1 gap-1 p-1.5">
        <div className="w-1/3 rounded-sm bg-zinc-800" />
        <div className="flex flex-1 flex-col gap-1">
          <div className="h-1.5 w-3/4 rounded-sm bg-zinc-700" />
          <div className="h-1 w-1/2 rounded-sm bg-zinc-800" />
          <div className="h-1 w-2/3 rounded-sm bg-zinc-800" />
        </div>
      </div>
    </div>
  );
}

function AutoPreview(): ReactElement {
  return (
    <div className="flex h-full w-full">
      <div className="flex w-1/2 flex-col overflow-hidden bg-white">
        <div className="h-2 w-full bg-gray-100" />
        <div className="flex flex-1 flex-col gap-1 p-1.5">
          <div className="h-1.5 w-3/4 rounded-sm bg-gray-200" />
          <div className="h-1 w-1/2 rounded-sm bg-gray-100" />
        </div>
      </div>
      <div className="flex w-1/2 flex-col overflow-hidden bg-zinc-900">
        <div className="h-2 w-full bg-zinc-800" />
        <div className="flex flex-1 flex-col gap-1 p-1.5">
          <div className="h-1.5 w-3/4 rounded-sm bg-zinc-700" />
          <div className="h-1 w-1/2 rounded-sm bg-zinc-800" />
        </div>
      </div>
    </div>
  );
}

export function ThemeSelector({ mode, onSelect }: ThemeSelectorProps): ReactElement {
  const intl = useIntl();

  return (
    <RadioGroup
      value={mode}
      onChange={(value) => onSelect(value as ThemeMode)}
      orientation="horizontal"
      aria-label={intl.formatMessage({
        description: "ThemeSelector - aria label",
        defaultMessage: "Theme",
        id: "OzfxPl",
      })}
      className="flex gap-3"
    >
      <ThemeOption
        value="auto"
        label={intl.formatMessage({
          description: "ThemeSelector - Auto label",
          defaultMessage: "Auto",
          id: "2k1SHW",
        })}
        icon={<ComputerDesktopIcon className="h-3 w-3" />}
        preview={<AutoPreview />}
      />
      <ThemeOption
        value="light"
        label={intl.formatMessage({
          description: "ThemeSelector - Light label",
          defaultMessage: "Light",
          id: "dZ0E8S",
        })}
        icon={<SunIcon className="h-3 w-3" />}
        preview={<LightPreview />}
      />
      <ThemeOption
        value="dark"
        label={intl.formatMessage({
          description: "ThemeSelector - Dark label",
          defaultMessage: "Dark",
          id: "Bv70i1",
        })}
        icon={<MoonIcon className="h-3 w-3" />}
        preview={<DarkPreview />}
      />
    </RadioGroup>
  );
}
