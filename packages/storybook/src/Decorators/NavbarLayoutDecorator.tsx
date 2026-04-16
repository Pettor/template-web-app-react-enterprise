import type { ReactNode } from "react";
import type { Decorator } from "@storybook/react-vite";
import { NavbarLayout } from "@package/ui";

export function NavbarLayoutDecorator(navbarElement?: ReactNode): Decorator {
  return (Story) => (
    <NavbarLayout
      navbarElement={navbarElement}
      footer
      footerText="Made with ☕ by Petter Hancock"
      footerCopyright="Copyright © 2024 - All rights reserved"
    >
      <Story />
    </NavbarLayout>
  );
}
