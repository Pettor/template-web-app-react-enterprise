import { useEffect, useRef, useState, type ReactElement, type ReactNode } from "react";
import clsx from "clsx";
import { Logo } from "../../Branding/Logo/Logo";

export interface NavbarProps {
  title: string;
  centerElement?: ReactNode;
  endElement?: ReactNode;
  menuElement?: ReactNode;
}

export function Navbar({ title, centerElement, endElement, menuElement }: NavbarProps): ReactElement {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    function handleScroll(): void {
      const currentScrollY = window.scrollY;
      setVisible(currentScrollY < lastScrollY.current || currentScrollY < 10);
      lastScrollY.current = currentScrollY;
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  return (
    <>
      <header
        className={clsx(
          "bg-background/50 sticky top-0 z-40 w-full border-b backdrop-blur-lg transition-transform duration-300",
          !visible && "-translate-y-full"
        )}
      >
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
      </header>

      {menuElement && (
        <div
          className={clsx(
            "fixed inset-0 z-50 bg-black/50 backdrop-blur-sm transition-opacity duration-300 sm:hidden",
            isMenuOpen ? "opacity-100" : "pointer-events-none opacity-0"
          )}
          onClick={() => setIsMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {menuElement && (
        <aside
          className={clsx(
            "bg-background fixed top-0 left-0 z-50 flex h-full w-80 flex-col border-r shadow-lg transition-transform duration-300 sm:hidden",
            isMenuOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <div className="flex h-16 shrink-0 items-center justify-between border-b px-6">
            <div className="flex items-center gap-2">
              <Logo size="small" />
              <p className="font-bold">{title}</p>
            </div>
            <button aria-label="Close menu" onClick={() => setIsMenuOpen(false)}>
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="flex-1 overflow-y-auto">{menuElement}</div>
        </aside>
      )}
    </>
  );
}
