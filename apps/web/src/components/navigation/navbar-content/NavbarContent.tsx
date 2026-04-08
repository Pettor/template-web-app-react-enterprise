import { type ReactElement } from "react";
import { Avatar, Button, Link, Popover, PopoverContent, PopoverTrigger } from "@heroui/react";
import { GithubIcon, LinkedInIcon, Navbar } from "@package/ui";
import type { ThemeSwitchProps } from "~/components/actions/theme-switch/ThemeSwitch";
import { ThemeSwitch } from "~/components/actions/theme-switch/ThemeSwitch";
import type { ProfileCardProps } from "~/components/feedback/profile-card/ProfileCard";
import { ProfileCard } from "~/components/feedback/profile-card/ProfileCard";
import type { AppSocialLinks } from "~/core/social-links/AppSocialLinks";

export interface NavbarContentProps {
  profile: ProfileCardProps;
  socialLinks: AppSocialLinks;
  themeSwitch: ThemeSwitchProps;
}

export function NavbarContent({ profile, socialLinks, themeSwitch }: NavbarContentProps): ReactElement {
  const { onGithubClick, onLinkedInClick } = socialLinks;
  const { name } = profile;

  function getAvatarFallback(name: string): string {
    const names = name.split(" ");
    if (!names || !names[0]) {
      return "";
    }

    if (names.length === 1 || !names[1]) {
      return names[0].charAt(0).toUpperCase();
    }
    return names[0].charAt(0).toUpperCase() + names[1].charAt(0).toUpperCase();
  }

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
    <div className="flex gap-1">
      <Popover>
        <PopoverTrigger role="button" data-testid="home-page__menu-button">
          <Avatar size="sm">
            <Avatar.Fallback>{getAvatarFallback(name)}</Avatar.Fallback>
          </Avatar>
        </PopoverTrigger>
        <PopoverContent placement="bottom end">
          <ProfileCard {...profile} />
        </PopoverContent>
      </Popover>
      <ThemeSwitch {...themeSwitch} />
      <Button className="fill-black dark:fill-white" variant="secondary" isIconOnly onPress={onGithubClick}>
        <GithubIcon />
      </Button>
      <Button className="fill-black dark:fill-white" variant="secondary" isIconOnly onPress={onLinkedInClick}>
        <LinkedInIcon />
      </Button>
    </div>
  );

  return <Navbar title="App" centerElement={centerElement} menuElement={menuRender} endElement={endElement} />;
}
