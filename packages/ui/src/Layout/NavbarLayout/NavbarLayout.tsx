import type { ReactElement, ReactNode } from "react";
import { Surface } from "@heroui/react";
import { Logo } from "../../Branding/Logo/Logo";

export interface NavbarLayoutProps {
  navbarElement: ReactNode;
  backgroundElement?: ReactNode;
  footer?: boolean;
  children?: ReactNode;
}

export function NavbarLayout({ backgroundElement, navbarElement, footer, children }: NavbarLayoutProps): ReactElement {
  return (
    <Surface className="relative flex min-h-screen flex-col" variant="default">
      {backgroundElement}
      {navbarElement}
      <main className="container mx-auto flex-1 p-4">{children}</main>
      {footer && (
        <footer className="container mx-auto flex flex-col place-items-center px-12 pb-12">
          <div className="grid place-items-center gap-0.5">
            <Logo size="large" />
            <p className="text-base font-bold">Made with ☕ by Petter Hancock</p>
            <p>Copyright © 2024 - All right reserved</p>
          </div>
        </footer>
      )}
    </Surface>
  );
}
