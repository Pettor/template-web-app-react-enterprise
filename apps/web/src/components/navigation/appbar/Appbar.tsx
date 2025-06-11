import { type ReactElement } from "react";
import { GithubIcon, LinkedInIcon, Navbar } from "ui-package";
import {
  Avatar,
  Button,
  Divider,
  Link,
  NavbarItem,
  NavbarMenuItem,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@heroui/react";
import type { IAppSocialLinks } from "~/classes/app-social-links/IAppSocialLinks";
import type { ThemeSwitchProps } from "~/components/actions/theme-switch/ThemeSwitch";
import { ThemeSwitch } from "~/components/actions/theme-switch/ThemeSwitch";
import type { ProfileCardProps } from "~/components/feedback/profile-card/ProfileCard";
import { ProfileCard } from "~/components/feedback/profile-card/ProfileCard";

export interface AppbarProps {
  profile: ProfileCardProps;
  socialLinks: IAppSocialLinks;
  themeSwitch: ThemeSwitchProps;
}

export function Appbar({ profile, socialLinks, themeSwitch }: AppbarProps): ReactElement {
  const { onGithubClick, onLinkedInClick } = socialLinks;

  const menuRender = (
    <>
      <NavbarMenuItem key="1">
        <Link href="#">something</Link>
      </NavbarMenuItem>
      <NavbarMenuItem key="2">something</NavbarMenuItem>
    </>
  );

  const centerElement = (
    <>
      <NavbarItem>
        <Link color="foreground" href="#">
          Features
        </Link>
      </NavbarItem>
      <NavbarItem isActive>
        <Link aria-current="page" href="#">
          Customers
        </Link>
      </NavbarItem>
      <NavbarItem>
        <Link color="foreground" href="#">
          Integrations
        </Link>
      </NavbarItem>
    </>
  );

  const endElement = (
    <>
      <Popover placement="bottom-end">
        <PopoverTrigger data-testid="home-page__menu-button">
          <Avatar size="sm" />
        </PopoverTrigger>
        <PopoverContent>
          <ProfileCard {...profile} />
        </PopoverContent>
      </Popover>
      <Divider orientation="vertical" />
      <ThemeSwitch {...themeSwitch} />
      <Divider orientation="vertical" />
      <Button isIconOnly className="p-2" color="default" onPress={onGithubClick}>
        <GithubIcon />
      </Button>
      <Button isIconOnly className="p-2" color="default" onPress={onLinkedInClick}>
        <LinkedInIcon />
      </Button>
    </>
  );

  return <Navbar title="App" centerElement={centerElement} menuElement={menuRender} endElement={endElement} />;
}
