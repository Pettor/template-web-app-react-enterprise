import { type ReactElement } from "react";
import { Avatar, Button, Link, Popover, PopoverContent, PopoverTrigger } from "@heroui/react";
import { GithubIcon, LinkedInIcon, Navbar } from "@package/ui";
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
      <div key="1">
        <Link href="#">something</Link>
      </div>
      <div key="2">something</div>
    </>
  );

  const centerElement = (
    <>
      <Link href="#">Features</Link>
      <Link aria-current="page" href="#">
        Customers
      </Link>
      <Link href="#">Integrations</Link>
    </>
  );

  const endElement = (
    <>
      <Popover>
        <PopoverTrigger role="button" data-testid="home-page__menu-button">
          <Avatar size="sm" />
        </PopoverTrigger>
        <PopoverContent placement="bottom end">
          <ProfileCard {...profile} />
        </PopoverContent>
      </Popover>
      <ThemeSwitch {...themeSwitch} />
      <Button isIconOnly className="p-2" onPress={onGithubClick}>
        <GithubIcon />
      </Button>
      <Button isIconOnly className="p-2" onPress={onLinkedInClick}>
        <LinkedInIcon />
      </Button>
    </>
  );

  return <Navbar title="App" centerElement={centerElement} menuElement={menuRender} endElement={endElement} />;
}
