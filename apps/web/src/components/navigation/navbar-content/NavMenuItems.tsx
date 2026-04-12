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
        description: "NavMenuItems - Home menu item",
        defaultMessage: "Home",
        id: "ciFxoL",
      }),
      href: "#/",
      icon: <HomeIcon className="h-5 w-5" />,
    },
    {
      id: "dashboard",
      name: intl.formatMessage({
        description: "NavMenuItems - Dashboard menu item",
        defaultMessage: "Dashboard",
        id: "JZPB0K",
      }),
      href: "#/dashboard",
      icon: <ChartBarSquareIcon className="h-5 w-5" />,
    },
  ];
}
