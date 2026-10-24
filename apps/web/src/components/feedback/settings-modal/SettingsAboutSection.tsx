import type { ReactElement } from "react";
import { SparklesIcon } from "@heroicons/react/20/solid";
import { Button } from "@heroui/react";
import { useIntl } from "react-intl";
import { AboutDetails, type AboutDetailsProps } from "~/components/feedback/about-details/AboutDetails";

export interface SettingsAboutSectionProps extends AboutDetailsProps {
  /** Shows the "See what's new" button when set. */
  onShowWhatsNew?: () => void;
}

export function SettingsAboutSection({ onShowWhatsNew, ...aboutDetails }: SettingsAboutSectionProps): ReactElement {
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
      <AboutDetails {...aboutDetails} />
      {onShowWhatsNew && (
        <Button
          variant="secondary"
          className="mx-4 self-start"
          onPress={onShowWhatsNew}
          data-testid="settings__whats-new"
        >
          <SparklesIcon className="h-4 w-4" />
          {intl.formatMessage({
            description: "SettingsAboutSection: button - open the What's new dialog",
            defaultMessage: "See what's new",
            id: "m1xG2X",
          })}
        </Button>
      )}
    </div>
  );
}
