import type { ReactElement } from "react";
import { ArrowLeftStartOnRectangleIcon, Cog6ToothIcon, MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { ListBox, ListBoxItem } from "@heroui/react";
import { useIntl } from "react-intl";

export interface QuickMenuProps {
  onSettings: () => void;
  onLogout: () => void;
  onSearch: () => void;
}

export function QuickMenu({ onSettings, onLogout, onSearch }: QuickMenuProps): ReactElement {
  const intl = useIntl();

  return (
    <ListBox
      aria-label={intl.formatMessage({
        description: "QuickMenu: aria-label - menu",
        defaultMessage: "Quick menu",
        id: "I8uzDd",
      })}
      onAction={(key) => {
        if (key === "search") onSearch();
        if (key === "settings") onSettings();
        if (key === "logout") onLogout();
      }}
    >
      <ListBoxItem
        id="search"
        textValue="Search"
        data-testid="quick-menu__search-button"
        aria-label={intl.formatMessage({
          description: "QuickMenu: aria-label - search menu item",
          defaultMessage: "Search",
          id: "kMdtRQ",
        })}
      >
        <MagnifyingGlassIcon className="h-5 w-5" />
        <span className="text-base">
          {intl.formatMessage({
            description: "QuickMenu: menu-item - search",
            defaultMessage: "Search",
            id: "wv66GT",
          })}
        </span>
      </ListBoxItem>
      <ListBoxItem
        id="settings"
        textValue="Settings"
        data-testid="quick-menu__settings-button"
        aria-label={intl.formatMessage({
          description: "QuickMenu: aria-label - settings menu item",
          defaultMessage: "Settings",
          id: "ricuZW",
        })}
      >
        <Cog6ToothIcon className="h-5 w-5" />
        <span className="text-base">
          {intl.formatMessage({
            description: "QuickMenu: menu-item - settings",
            defaultMessage: "Settings",
            id: "WEd/gz",
          })}
        </span>
      </ListBoxItem>
      <ListBoxItem
        id="logout"
        textValue="Logout"
        data-testid="quick-menu__logout-button"
        aria-label={intl.formatMessage({
          description: "QuickMenu: aria-label - logout menu item",
          defaultMessage: "Logout",
          id: "oqInO0",
        })}
      >
        <ArrowLeftStartOnRectangleIcon className="h-5 w-5" />
        <span className="text-base">
          {intl.formatMessage({
            description: "QuickMenu: menu-item - logout",
            defaultMessage: "Logout",
            id: "dxC6lJ",
          })}
        </span>
      </ListBoxItem>
    </ListBox>
  );
}
