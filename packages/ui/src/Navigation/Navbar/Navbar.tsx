import { useEffect, useRef, useState, type ReactElement, type ReactNode } from "react";
import clsx from "clsx";
import { Logo } from "../../Branding/Logo/Logo";

export interface NavbarProps {
  title: string;
  centerElement?: ReactNode;
  endElement?: ReactNode;
  startElement?: ReactNode;
}

export function Navbar({ title, centerElement, endElement, startElement }: NavbarProps): ReactElement {
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

  return (
    <header
      className={clsx(
        "bg-background/50 sticky top-0 z-40 w-full border-b backdrop-blur-lg transition-transform duration-300",
        !visible && "-translate-y-full"
      )}
    >
      <div className="flex h-16 w-full items-center justify-between px-6">
        <div className="flex items-center gap-2">
          {startElement}
          <Logo size="small" />
          <p className="font-bold">{title}</p>
        </div>
        {centerElement && <div className="hidden gap-4 sm:flex">{centerElement}</div>}
        <div className="flex items-center">{endElement}</div>
      </div>
    </header>
  );
}
