import type { ReactElement, ReactNode } from "react";
import { Navbar as HeroNavbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button } from "@heroui/react";
import { Logo } from "../../Layout";

export interface NavbarProps {
  title: string;
  centerElement?: ReactNode;
  endElement?: ReactNode;
}

export function Navbar({ title, centerElement, endElement }: NavbarProps): ReactElement {
  return (
    <HeroNavbar>
      <NavbarBrand>
        <Logo size="small" />
        <p className="font-bold text-inherit">ACME</p>
      </NavbarBrand>
      <NavbarContent className="hidden gap-4 sm:flex" justify="center">
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
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Link href="#">Login</Link>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} color="primary" href="#" variant="flat">
            Sign Up
          </Button>
        </NavbarItem>
      </NavbarContent>
    </HeroNavbar>

    /*     <div className="glass navbar bg-opacity-55 dark:bg-opacity-100 p-0 dark:bg-none">
      <div className="navbar container mx-auto min-h-0 p-0">
        <div className="navbar-start h-full">
          <Logo size="small" />
          <span className="text-base font-semibold md:text-2xl">{title}</span>
        </div>
        <div className="navbar-center h-8">{centerElement}</div>
        <div className="navbar-end h-8">{endElement}</div>
      </div>
    </div> */
  );
}
