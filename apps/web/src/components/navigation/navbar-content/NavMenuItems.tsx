import type { ReactElement } from "react";
import { ChartBarSquareIcon, HomeIcon } from "@heroicons/react/20/solid";

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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function createNavMenuItems(_socialLinks: NavMenuSocialLinks): NavMenuItem[] {
  return [
    {
      id: "home",
      name: "Home",
      href: "#/",
      icon: <HomeIcon className="h-5 w-5" />,
    },
    {
      id: "dashboard",
      name: "Dashboard",
      href: "#/dashboard",
      icon: <ChartBarSquareIcon className="h-5 w-5" />,
    },
  ];
}
