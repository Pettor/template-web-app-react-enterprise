import type { ReactElement } from "react";
import { ArrowLeftStartOnRectangleIcon, InformationCircleIcon } from "@heroicons/react/20/solid";
import { ListBox, ListBoxItem, Separator, Skeleton } from "@heroui/react";
import { useIntl } from "react-intl";
import { ThemeSelector } from "~/components/actions/theme-selector/ThemeSelector";
import { useThemeSelector } from "~/components/actions/theme-selector/UseThemeSelector";
import type { AppSessionContent } from "~/core/session/AppSessionContent";

export interface AccountPanelProps extends AppSessionContent {}

export function AccountPanel({ name, email, onAbout, onLogout }: AccountPanelProps): ReactElement {
  const intl = useIntl();
  const themeSelector = useThemeSelector();

  return (
    <div className="w-full">
      <p className="text-sm font-medium">
        {intl.formatMessage({
          description: "AccountPanel - Account",
          defaultMessage: "Account",
          id: "gU4PNF",
        })}
      </p>
      <div className="mt-2 flex flex-row gap-4 py-2" data-testid="account-panel__details">
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
          description: "AccountPanel - Theme",
          defaultMessage: "Theme",
          id: "XnkIZ5",
        })}
      </p>
      <div className="h-2" />
      <ThemeSelector {...themeSelector} />
      <div className="h-2" />
      <Separator />
      <div className="h-2" />
      <ListBox
        aria-label={intl.formatMessage({
          description: "AccountPanel - Menu aria label",
          defaultMessage: "Account menu",
          id: "v7OEay",
        })}
        onAction={(key) => {
          if (key === "about") onAbout?.();
          if (key === "logout") onLogout?.();
        }}
      >
        <ListBoxItem
          id="about"
          textValue="About"
          data-testid="account-panel__info-button"
          aria-label={intl.formatMessage({
            description: "AccountPanel - Info aria label",
            defaultMessage: "About",
            id: "IRF2z6",
          })}
        >
          <InformationCircleIcon className="h-5 w-5" />
          <span className="text-base">
            {intl.formatMessage({
              description: "AccountPanel - Info",
              defaultMessage: "About",
              id: "Ev82Za",
            })}
          </span>
        </ListBoxItem>
        <ListBoxItem
          id="logout"
          textValue="Logout"
          data-testid="account-panel__logout-button"
          aria-label={intl.formatMessage({
            description: "AccountPanel - Logout aria label",
            defaultMessage: "Logout",
            id: "2/eu+Q",
          })}
        >
          <ArrowLeftStartOnRectangleIcon className="h-5 w-5" />
          <span className="text-base">
            {intl.formatMessage({
              description: "AccountPanel - Logout",
              defaultMessage: "Logout",
              id: "dmAbtE",
            })}
          </span>
        </ListBoxItem>
      </ListBox>
    </div>
  );
}
