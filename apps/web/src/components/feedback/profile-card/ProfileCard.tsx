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
          data-testid="profile-card__info-button"
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
    // <div className="card bg-base-100 dark:bg-base-200 w-screen shadow-xl sm:w-80">
    //   <div className="card-body rounded-xl shadow-inner dark:bg-none">
    //     <span className="text-xl font-semibold">Personal</span>
    //     <div className="mt-2 flex flex-row items-center justify-center gap-4 py-2">
    //       <div className="flex h-full items-center justify-center">
    //         <UserCircleIcon className="full-neutral dark:fill-neutral-content h-8 w-8" />
    //       </div>
    //       <div className="flex min-w-0 flex-1 flex-col gap-2">
    //         <span className="h-5 truncate" data-testid="profile-card__name-text">
    //           {name ? name : <div className="skeleton h-full" />}
    //         </span>
    //         <span className="h-5 truncate" data-testid="profile-card__email-text">
    //           {email ? email : <div className="skeleton h-full" />}
    //         </span>
    //       </div>
    //     </div>
    //     <div className="divider m-0" />
    //     <ul className="menu rounded-box w-full gap-2 p-0">
    //       <li>
    //         <button className="w-full" onClick={onAbout} data-testid="profile-card__info-button">
    //           <InformationCircleIcon className="h-5 w-5" />
    //           <span className="text-base">
    //             {intl.formatMessage({
    //               description: "ProfileCard - Info",
    //               defaultMessage: "About",
    //               id: "NfKNqH",
    //             })}
    //           </span>
    //         </button>
    //       </li>
    //       <li>
    //         <button onClick={onLogout} data-testid="profile-card__settings-button">
    //           <Cog8ToothIcon className="h-5 w-5" />
    //           <span className="text-base">
    //             {intl.formatMessage({
    //               description: "ProfileCard - Settings",
    //               defaultMessage: "Settings",
    //               id: "uZ3xat",
    //             })}
    //           </span>
    //         </button>
    //       </li>
    //       <li>
    //         <button onClick={onLogout} data-testid="profile-card__logout-button">
    //           <ArrowLeftStartOnRectangleIcon className="h-5 w-5" />
    //           <span className="text-base">
    //             {intl.formatMessage({
    //               description: "ProfileCard - Logout",
    //               defaultMessage: "Logout",
    //               id: "bXlo7I",
    //             })}
    //           </span>
    //         </button>
    //       </li>
    //     </ul>
    //   </div>
    // </div>
  );
}
