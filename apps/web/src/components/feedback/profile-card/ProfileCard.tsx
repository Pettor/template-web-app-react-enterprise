import type { ReactElement } from "react";
import { InformationCircleIcon, ArrowLeftStartOnRectangleIcon } from "@heroicons/react/20/solid";
import { useIntl } from "react-intl";
import type { IAppSessionContent } from "~/classes/app-session/IAppSessionContent";
import { Divider, Listbox, ListboxItem, Skeleton, Spacer, User } from "@heroui/react";

export interface ProfileCardProps extends IAppSessionContent {}

export function ProfileCard({ name, email, onAbout, onLogout }: ProfileCardProps): ReactElement {
  const intl = useIntl();

  return (
    <div className="w-80 p-4">
      <p className="text-xl">
        {intl.formatMessage({
          description: "ProfileCard - Personal",
          defaultMessage: "Personal",
          id: "3k1Z4e",
        })}
      </p>
      <div className="mt-2 flex flex-row gap-4 py-2">
        <User
          name={name ? name : <Skeleton className="my-1 h-4 w-30 rounded-2xl" />}
          description={email ? email : <Skeleton className="my-1 h-3 w-30 rounded-2xl" />}
          data-testid="profile-card__details"
        />
      </div>
      <Spacer y={2} />
      <Divider />
      <Spacer y={2} />
      <Listbox>
        <ListboxItem
          startContent={<InformationCircleIcon className="h-5 w-5" />}
          onPress={onAbout}
          data-testid="profile-card__info-button"
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
