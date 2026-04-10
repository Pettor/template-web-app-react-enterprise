import type { ReactElement } from "react";
import { useIntl } from "react-intl";
import { ThemeSelector } from "~/components/actions/theme-selector/ThemeSelector";
import { useThemeSelector } from "~/components/actions/theme-selector/UseThemeSelector";

export function SettingsAppearanceSection(): ReactElement {
  const intl = useIntl();
  const themeSelector = useThemeSelector();

  return (
    <div className="flex flex-col gap-4">
      <p className="text-lg font-semibold">
        {intl.formatMessage({
          description: "SettingsAppearanceSection - Title",
          defaultMessage: "Appearance",
          id: "6wfjEs",
        })}
      </p>
      <p className="text-default-500 text-sm">
        {intl.formatMessage({
          description: "SettingsAppearanceSection - Description",
          defaultMessage: "Choose your preferred theme for the application.",
          id: "6VdpKO",
        })}
      </p>
      <ThemeSelector {...themeSelector} />
    </div>
  );
}
