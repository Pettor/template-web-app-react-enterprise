import { Logo } from "../Logo/Logo";
import type { ReactElement, ReactNode } from "react";

export interface NavbarLayoutProps {
  navbarElement: ReactNode;
  backgroundElement?: ReactNode;
  footer?: boolean;
  children?: ReactNode;
}

export function NavbarLayout({ backgroundElement, navbarElement, footer, children }: NavbarLayoutProps): ReactElement {
  return (
    <div className="relative flex flex-col">
      <div className="flex flex-col">
        {backgroundElement}
        {navbarElement}
        <main className="container m-auto">{children}</main>
        {footer && (
          <footer className="container mx-auto my-auto mt-8 flex max-w-7xl flex-col place-items-center px-12 pb-12">
            <aside className="grid place-items-center gap-0.5">
              <Logo size="large" />
              <p className="text-base font-bold">Made with ☕ by Petter Hancock</p>
              <p>Copyright © 2024 - All right reserved</p>
            </aside>
          </footer>
        )}
      </div>
    </div>
  );
}
