import type { ReactElement } from "react";
import { InformationCircleIcon, ArrowLeftStartOnRectangleIcon } from "@heroicons/react/20/solid";
import { ListBox, ListBoxItem, Separator, Skeleton } from "@heroui/react";
import { useIntl } from "react-intl";
import type { IAppSessionContent } from "~/classes/app-session/IAppSessionContent";

export interface ProfileCardProps extends IAppSessionContent {}

export function ProfileCard({ name, email, onAbout, onLogout }: ProfileCardProps): ReactElement {
  const intl = useIntl();

  return (
    <div className="flex w-80 flex-col gap-3 p-4">
      <p className="text-lg font-semibold">
        {intl.formatMessage({
          description: "ProfileCard - Personal",
          defaultMessage: "Personal",
          id: "hErN+M",
        })}
      </p>
      <div className="flex flex-row gap-4" data-testid="profile-card__details">
        <div className="flex flex-col gap-0.5">
          <span className="font-semibold">{name ? name : <Skeleton className="my-1 h-4 w-30 rounded-2xl" />}</span>
          <span className="text-foreground/70 text-sm">
            {email ? email : <Skeleton className="my-1 h-3 w-30 rounded-2xl" />}
          </span>
        </div>
      </div>
      <Separator />
      <ListBox
        aria-label={intl.formatMessage({
          description: "ProfileCard - Menu aria label",
          defaultMessage: "Profile menu",
          id: "yS5N1i",
        })}
      >
        <ListBoxItem
          id="about"
          textValue="About"
          onPress={onAbout}
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
          onPress={onLogout}
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
