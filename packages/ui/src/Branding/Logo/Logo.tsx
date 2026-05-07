import type { ReactElement } from "react";
import logoUrl from "../assets/template-512x512.svg";

export interface LogoProps {
  size: "small" | "medium" | "large";
}

export function Logo({ size = "large" }: LogoProps): ReactElement {
  let xy = 0;
  switch (size) {
    case "small":
      xy = 60;
      break;
    case "medium":
      xy = 80;
      break;
    case "large":
      xy = 100;
      break;
  }

  return (
    <div className="flex items-center">
      <img src={logoUrl} width={xy} height={xy} alt="Logo" />
    </div>
  );
}
