import type { ReactElement } from "react";
import { BoltIcon, CodeBracketIcon, HomeIcon, SparklesIcon, SwatchIcon, UsersIcon } from "@heroicons/react/20/solid";
import { GithubIcon, LinkedInIcon } from "@package/ui";

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

export function createNavMenuItems(socialLinks: NavMenuSocialLinks): NavMenuItem[] {
  return [
    {
      id: "home",
      name: "Home",
      href: "#/",
      icon: <HomeIcon className="h-5 w-5" />,
    },
    {
      id: "features",
      name: "Features",
      href: "#",
      icon: <SparklesIcon className="h-5 w-5" />,
      children: [
        {
          id: "react",
          name: "React",
          href: "https://react.dev",
          icon: <CodeBracketIcon className="h-4 w-4" />,
          external: true,
        },
        {
          id: "vite",
          name: "Vite",
          href: "https://vite.dev",
          icon: <BoltIcon className="h-4 w-4" />,
          external: true,
        },
        {
          id: "tailwind",
          name: "Tailwind CSS",
          href: "https://tailwindcss.com",
          icon: <SwatchIcon className="h-4 w-4" />,
          external: true,
        },
      ],
    },
    {
      id: "social",
      name: "Social",
      href: "#",
      icon: <UsersIcon className="h-5 w-5" />,
      children: [
        {
          id: "github",
          name: "GitHub",
          href: socialLinks.github,
          icon: <GithubIcon />,
          external: true,
        },
        {
          id: "linkedin",
          name: "LinkedIn",
          href: socialLinks.linkedIn,
          icon: <LinkedInIcon />,
          external: true,
        },
      ],
    },
  ];
}
