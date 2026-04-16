import { NavbarLayout, StorybookNavbarContentComponent } from "@package/ui";
import type { Decorator } from "@storybook/react-vite";

export function NavbarLayoutDecorator(): Decorator {
  return (Story) => (
    <NavbarLayout
      navbarElement={<StorybookNavbarContentComponent />}
      footer
      footerText="Made with ☕ by Petter Hancock"
      footerCopyright="Copyright © 2024 - All rights reserved"
    >
      <Story />
    </NavbarLayout>
  );
}
