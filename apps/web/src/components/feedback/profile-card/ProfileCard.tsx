import type { ReactElement } from "react";
import { InformationCircleIcon, ArrowLeftStartOnRectangleIcon } from "@heroicons/react/20/solid";
import { Divider, Listbox, ListboxItem, Skeleton, Spacer, User } from "@heroui/react";
import { useIntl } from "react-intl";
import type { IAppSessionContent } from "~/classes/app-session/IAppSessionContent";

export interface ProfileCardProps extends IAppSessionContent {}

export function ProfileCard({ name, email, onAbout, onLogout }: ProfileCardProps): ReactElement {
  const intl = useIntl();

  return (
    <div className="w-80 p-4">
      <p className="text-xl">
        {intl.formatMessage({
          description: "ProfileCard - Personal",
          defaultMessage: "Personal",
          id: "hErN+M",
        })}
      </p>
      <div className="mt-2 flex flex-row gap-4 py-2">
        <User
          name={name ? name : <Skeleton className="w-30 my-1 h-4 rounded-2xl" />}
          description={email ? email : <Skeleton className="w-30 my-1 h-3 rounded-2xl" />}
          data-testid="profile-card__details"
        />
      </div>
      <Spacer y={2} />
      <Divider />
      <Spacer y={2} />
      <Listbox
        role="group"
        aria-label={intl.formatMessage({
          description: "ProfileCard - Menu aria label",
          defaultMessage: "Profile menu",
          id: "yS5N1i",
        })}
      >
        <ListboxItem
          startContent={<InformationCircleIcon className="h-5 w-5" />}
          onPress={onAbout}
          data-testid="profile-card__info-button"
          aria-label={intl.formatMessage({
            description: "ProfileCard - Info aria label",
            defaultMessage: "About",
            id: "TJ0KjQ",
          })}
        >
          <span className="text-base">
            {intl.formatMessage({
              description: "ProfileCard - Info",
              defaultMessage: "About",
              id: "NfKNqH",
            })}
          </span>
        </ListboxItem>
        <ListboxItem
          startContent={<ArrowLeftStartOnRectangleIcon className="h-5 w-5" />}
          onPress={onLogout}
          data-testid="profile-card__logout-button"
          aria-label={intl.formatMessage({
            description: "ProfileCard - Logout aria label",
            defaultMessage: "Logout",
            id: "kVNu3C",
          })}
        >
          <span className="text-base">
            {intl.formatMessage({
              description: "ProfileCard - Logout",
              defaultMessage: "Logout",
              id: "bXlo7I",
            })}
          </span>
        </ListboxItem>
      </Listbox>
    </div>
  );
}
