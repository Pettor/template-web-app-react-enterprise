import { useState, type ReactElement, type ReactNode } from "react";
import { Logo } from "../../Branding/Logo/Logo";

export interface NavbarProps {
  title: string;
  centerElement?: ReactNode;
  endElement?: ReactNode;
  menuElement?: ReactNode;
}

export function Navbar({ title, centerElement, endElement, menuElement }: NavbarProps): ReactElement {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-background sticky top-0 z-40 w-full border-b">
      <div className="flex h-16 w-full items-center justify-between px-6">
        <div className="flex items-center gap-2">
          {menuElement && (
            <button
              className="sm:hidden"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          )}
          <Logo size="small" />
          <p className="font-bold">{title}</p>
        </div>
        {centerElement && <div className="hidden gap-4 sm:flex">{centerElement}</div>}
        <div className="flex items-center">{endElement}</div>
      </div>
      {isMenuOpen && menuElement && (
        <div className="bg-background absolute left-0 w-full border-b sm:hidden">{menuElement}</div>
      )}
    </header>
  );
}
