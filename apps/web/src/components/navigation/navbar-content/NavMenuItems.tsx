import type { ReactElement } from "react";
import { ChartBarSquareIcon, HomeIcon } from "@heroicons/react/20/solid";
import type { IntlShape } from "react-intl";

export interface NavMenuItem {
  id: string;
  name: string;
  href: string;
  icon: ReactElement;
  external?: boolean;
  children?: NavMenuItem[];
}

export interface NavMenuSocialLinks {
  github: string;
  linkedIn: string;
}

export function createNavMenuItems(_socialLinks: NavMenuSocialLinks, intl: IntlShape): NavMenuItem[] {
  return [
    {
      id: "home",
      name: intl.formatMessage({
        description: "NavMenuItems: menu-item - home",
        defaultMessage: "Home",
        id: "dygLxQ",
      }),
      href: "#/",
      icon: <HomeIcon className="h-5 w-5" />,
    },
    {
      id: "dashboard",
      name: intl.formatMessage({
        description: "NavMenuItems: menu-item - dashboard",
        defaultMessage: "Dashboard",
        id: "boO2/q",
      }),
      href: "#/dashboard",
      icon: <ChartBarSquareIcon className="h-5 w-5" />,
    },
  ];
}
