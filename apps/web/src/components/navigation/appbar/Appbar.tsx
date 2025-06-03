import { type ReactElement } from "react";
import { GithubIcon, LinkedInIcon, Navbar } from "ui-package";
import { Button, Link, NavbarItem, NavbarMenuItem } from "@heroui/react";
import type { IAppSocialLinks } from "~/classes/app-social-links/IAppSocialLinks";

export interface AppbarProps extends IAppSocialLinks {}

export function Appbar({ onGithubClick, onLinkedInClick }: AppbarProps): ReactElement {
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
