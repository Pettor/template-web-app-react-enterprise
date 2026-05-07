import type { ReactElement } from "react";

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
    <div className="text-accent flex items-center">
      <svg xmlns="http://www.w3.org/2000/svg" width={xy} height={xy} viewBox="0 0 512 512">
        <g transform="translate(256,256)">
          <g stroke="currentColor" strokeWidth="18" fill="none">
            <ellipse rx="195" ry="74" />
            <ellipse rx="195" ry="74" transform="rotate(60)" />
            <ellipse rx="195" ry="74" transform="rotate(120)" />
          </g>
          <circle r="36" fill="currentColor" />
        </g>
      </svg>
    </div>
  );
}
