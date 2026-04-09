import type { ReactElement } from "react";
import { InformationCircleIcon, ArrowLeftStartOnRectangleIcon } from "@heroicons/react/20/solid";
import { ListBox, ListBoxItem, Separator, Skeleton } from "@heroui/react";
import { useIntl } from "react-intl";
import { ThemeSelector } from "~/components/actions/theme-selector/ThemeSelector";
import { useThemeSelector } from "~/components/actions/theme-selector/UseThemeSelector";
import type { AppSessionContent } from "~/core/session/AppSessionContent";

export interface ProfileCardProps extends AppSessionContent {}

export function ProfileCard({ name, email, onAbout, onLogout }: ProfileCardProps): ReactElement {
  const intl = useIntl();
  const themeSelector = useThemeSelector();

  return (
    <div className="w-full">
      <p className="text-sm font-medium">
        {intl.formatMessage({
          description: "ProfileCard - Personal",
          defaultMessage: "Personal",
          id: "hErN+M",
        })}
      </p>
      <div className="mt-2 flex flex-row gap-4 py-2" data-testid="profile-card__details">
        <div className="flex flex-col">
          <span className="font-semibold">{name ? name : <Skeleton className="my-1 h-4 w-30 rounded-2xl" />}</span>
          <span className="text-sm">{email ? email : <Skeleton className="my-1 h-3 w-30 rounded-2xl" />}</span>
        </div>
      </div>
      <div className="h-2" />
      <Separator />
      <div className="h-2" />
      <p className="text-sm font-medium">
        {intl.formatMessage({
          description: "ProfileCard - Theme",
          defaultMessage: "Theme",
          id: "aZX0CI",
        })}
      </p>
      <div className="h-2" />
      <ThemeSelector {...themeSelector} />
      <div className="h-2" />
      <Separator />
      <div className="h-2" />
      <ListBox
        aria-label={intl.formatMessage({
          description: "ProfileCard - Menu aria label",
          defaultMessage: "Profile menu",
          id: "yS5N1i",
        })}
        onAction={(key) => {
          if (key === "about") onAbout?.();
          if (key === "logout") onLogout?.();
        }}
      >
        <ListBoxItem
          id="about"
          textValue="About"
          data-testid="profile-card__info-button"
          aria-label={intl.formatMessage({
            description: "ProfileCard - Info aria label",
            defaultMessage: "About",
            id: "TJ0KjQ",
          })}
        >
          <InformationCircleIcon className="h-5 w-5" />
          <span className="text-base">
            {intl.formatMessage({
              description: "ProfileCard - Info",
              defaultMessage: "About",
              id: "NfKNqH",
            })}
          </span>
        </ListBoxItem>
        <ListBoxItem
          id="logout"
          textValue="Logout"
          data-testid="profile-card__logout-button"
          aria-label={intl.formatMessage({
            description: "ProfileCard - Logout aria label",
            defaultMessage: "Logout",
            id: "kVNu3C",
          })}
        >
          <ArrowLeftStartOnRectangleIcon className="h-5 w-5" />
          <span className="text-base">
            {intl.formatMessage({
              description: "ProfileCard - Logout",
              defaultMessage: "Logout",
              id: "bXlo7I",
            })}
          </span>
        </ListBoxItem>
      </ListBox>
    </div>
  );
}
