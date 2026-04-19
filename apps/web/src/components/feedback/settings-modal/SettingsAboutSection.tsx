import type { ReactElement } from "react";
import { useIntl } from "react-intl";
import { AboutDetails, type AboutDetailsProps } from "~/components/feedback/about-details/AboutDetails";

export interface SettingsAboutSectionProps extends AboutDetailsProps {}

export function SettingsAboutSection(props: SettingsAboutSectionProps): ReactElement {
  const intl = useIntl();

  return (
    <div className="flex flex-col gap-4">
      <p className="text-lg font-semibold">
        {intl.formatMessage({
          description: "SettingsAboutSection: heading - section title",
          defaultMessage: "About",
          id: "pSAw7P",
        })}
      </p>
      <AboutDetails {...props} />
    </div>
  );
}
