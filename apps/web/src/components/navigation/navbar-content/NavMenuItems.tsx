import type { ReactElement } from "react";
import {
  BoltIcon,
  CodeBracketIcon,
  PuzzlePieceIcon,
  SparklesIcon,
  SwatchIcon,
  UserGroupIcon,
} from "@heroicons/react/20/solid";

export interface NavMenuItem {
  id: string;
  name: string;
  href: string;
  icon: ReactElement;
  children?: NavMenuItem[];
}

export const NAV_MENU_ITEMS: NavMenuItem[] = [
  {
    id: "features",
    name: "Features",
    href: "#",
    icon: <SparklesIcon className="h-5 w-5" />,
    children: [
      { id: "react", name: "React", href: "#", icon: <CodeBracketIcon className="h-4 w-4" /> },
      { id: "vite", name: "Vite", href: "#", icon: <BoltIcon className="h-4 w-4" /> },
      { id: "tailwind", name: "Tailwind CSS", href: "#", icon: <SwatchIcon className="h-4 w-4" /> },
    ],
  },
  {
    id: "customers",
    name: "Customers",
    href: "#",
    icon: <UserGroupIcon className="h-5 w-5" />,
  },
  {
    id: "integrations",
    name: "Integrations",
    href: "#",
    icon: <PuzzlePieceIcon className="h-5 w-5" />,
  },
];
