import type { ReactElement } from "react";
import { useIntl } from "react-intl";
import type { ThemeSelectorProps } from "~/components/actions/theme-selector/ThemeSelector";
import { ThemeSelector } from "~/components/actions/theme-selector/ThemeSelector";

export interface SettingsAppearanceSectionProps {
  themeSelector: ThemeSelectorProps;
}

export function SettingsAppearanceSection({ themeSelector }: SettingsAppearanceSectionProps): ReactElement {
  const intl = useIntl();

  return (
    <div className="flex flex-col gap-4">
      <p className="text-lg font-semibold">
        {intl.formatMessage({
          description: "SettingsAppearanceSection: heading - section title",
          defaultMessage: "Appearance",
          id: "WjIIT5",
        })}
      </p>
      <p className="text-default-500 text-sm">
        {intl.formatMessage({
          description: "SettingsAppearanceSection: body - section description",
          defaultMessage: "Choose your preferred theme for the application.",
          id: "e/5NIm",
        })}
      </p>
      <ThemeSelector {...themeSelector} />
    </div>
  );
}
