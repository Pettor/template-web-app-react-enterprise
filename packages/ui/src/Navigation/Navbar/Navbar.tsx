import { useState, type ReactElement, type ReactNode } from "react";
import { Logo } from "../../Branding/Logo/Logo";
import type { NavbarMenuItem } from "@heroui/react";
import { Navbar as HeroNavbar, NavbarContent, NavbarMenuToggle, NavbarBrand, NavbarMenu } from "@heroui/react";

export interface NavbarProps {
  title: string;
  centerElement?: ReactNode;
  endElement?: ReactNode;
  menuElement?: ReactElement<typeof NavbarMenuItem> | ReactElement<typeof NavbarMenuItem>[];
}

export function Navbar({ title, centerElement, endElement, menuElement }: NavbarProps): ReactElement {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <HeroNavbar shouldHideOnScroll isBordered onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} className="sm:hidden" />
        <NavbarBrand>
          <Logo size="small" />
          <p className="font-bold text-inherit">{title}</p>
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent className="hidden gap-4 sm:flex" justify="center">
        {centerElement}
      </NavbarContent>
      <NavbarContent justify="end">{endElement}</NavbarContent>
      <NavbarMenu>{menuElement}</NavbarMenu>
    </HeroNavbar>
  );
}
