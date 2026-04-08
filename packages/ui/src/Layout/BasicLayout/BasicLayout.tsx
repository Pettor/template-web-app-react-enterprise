import type { ReactElement, ReactNode } from "react";
import clsx from "clsx";

export interface BasicLayoutProps {
  className?: string;
  backgroundElement?: ReactNode;
  children: ReactNode;
}

export function BasicLayout({ className, backgroundElement, children }: BasicLayoutProps): ReactElement {
  return (
    <div className={clsx("relative flex min-h-dvh flex-col", className)}>
      {backgroundElement}
      <main className="flex flex-1 items-center justify-center p-4">{children}</main>
    </div>
  );
}
