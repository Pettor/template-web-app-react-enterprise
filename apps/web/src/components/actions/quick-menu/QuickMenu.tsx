import type { ReactElement } from "react";
import { ArrowLeftStartOnRectangleIcon, Cog6ToothIcon } from "@heroicons/react/20/solid";
import { ListBox, ListBoxItem } from "@heroui/react";
import { useIntl } from "react-intl";

export interface QuickMenuProps {
  onSettings: () => void;
  onLogout: () => void;
}

export function QuickMenu({ onSettings, onLogout }: QuickMenuProps): ReactElement {
  const intl = useIntl();

  return (
    <ListBox
      aria-label={intl.formatMessage({
        description: "QuickMenu - Menu aria label",
        defaultMessage: "Quick menu",
        id: "bPsPbO",
      })}
      onAction={(key) => {
        if (key === "settings") onSettings();
        if (key === "logout") onLogout();
      }}
    >
      <ListBoxItem
        id="settings"
        textValue="Settings"
        data-testid="quick-menu__settings-button"
        aria-label={intl.formatMessage({
          description: "QuickMenu - Settings aria label",
          defaultMessage: "Settings",
          id: "RgSSfJ",
        })}
      >
        <Cog6ToothIcon className="h-5 w-5" />
        <span className="text-base">
          {intl.formatMessage({
            description: "QuickMenu - Settings",
            defaultMessage: "Settings",
            id: "r6wPzh",
          })}
        </span>
      </ListBoxItem>
      <ListBoxItem
        id="logout"
        textValue="Logout"
        data-testid="quick-menu__logout-button"
        aria-label={intl.formatMessage({
          description: "QuickMenu - Logout aria label",
          defaultMessage: "Logout",
          id: "ayezYz",
        })}
      >
        <ArrowLeftStartOnRectangleIcon className="h-5 w-5" />
        <span className="text-base">
          {intl.formatMessage({
            description: "QuickMenu - Logout",
            defaultMessage: "Logout",
            id: "o7x+hU",
          })}
        </span>
      </ListBoxItem>
    </ListBox>
  );
}
