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
    <Radio
      value={value}
      aria-label={label}
      className={clsx(
        "group relative flex-col items-center gap-1.5 rounded-xl border-2 border-transparent p-1 transition-all",
        "data-[selected=true]:border-accent data-[selected=true]:bg-accent/10",
        "data-[focus-visible=true]:border-accent data-[focus-visible=true]:bg-accent/10"
      )}
    >
      <Radio.Control className="absolute top-1 right-1 size-4">
        <Radio.Indicator />
      </Radio.Control>
      <Radio.Content className="flex flex-col items-center gap-1.5">
        <div className="h-14 w-18 overflow-hidden rounded-md">{preview}</div>
        <div className="text-default-500 group-data-[selected=true]:text-accent flex items-center gap-1 text-xs">
          {icon}
          <span>{label}</span>
        </div>
      </Radio.Content>
    </Radio>
  );
}

function LightPreview(): ReactElement {
  return (
    <div className="flex h-full w-full flex-col bg-white">
      <div className="h-1.5 w-full bg-gray-100" />
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
      <div className="h-1.5 w-full bg-zinc-800" />
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
        <div className="h-1.5 w-full bg-gray-100" />
        <div className="flex flex-1 flex-col gap-1 p-1.5">
          <div className="h-1.5 w-3/4 rounded-sm bg-gray-200" />
          <div className="h-1 w-1/2 rounded-sm bg-gray-100" />
        </div>
      </div>
      <div className="flex w-1/2 flex-col overflow-hidden bg-zinc-900">
        <div className="h-1.5 w-full bg-zinc-800" />
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
        description: "ThemeSelector: aria-label - theme radio group",
        defaultMessage: "Theme",
        id: "aTH1qx",
      })}
      className="flex gap-2"
    >
      <ThemeOption
        value="auto"
        label={intl.formatMessage({
          description: "ThemeSelector: label - auto option",
          defaultMessage: "Auto",
          id: "0nOfE7",
        })}
        icon={<ComputerDesktopIcon className="h-3 w-3" />}
        preview={<AutoPreview />}
      />
      <ThemeOption
        value="light"
        label={intl.formatMessage({
          description: "ThemeSelector: label - light option",
          defaultMessage: "Light",
          id: "34xMGO",
        })}
        icon={<SunIcon className="h-3 w-3" />}
        preview={<LightPreview />}
      />
      <ThemeOption
        value="dark"
        label={intl.formatMessage({
          description: "ThemeSelector: label - dark option",
          defaultMessage: "Dark",
          id: "yqsqER",
        })}
        icon={<MoonIcon className="h-3 w-3" />}
        preview={<DarkPreview />}
      />
    </RadioGroup>
  );
}
