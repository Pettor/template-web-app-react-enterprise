import { useEffect, useState } from "react";

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia(query).matches;
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const media = window.matchMedia(query);
    setMatches(media.matches);
    function listener(event: MediaQueryListEvent): void {
      setMatches(event.matches);
    }
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [query]);

  return matches;
}

type Breakpoint = "sm" | "md" | "lg" | "xl" | "2xl";

const breakpoints: Record<Breakpoint, string> = {
  sm: "(min-width: 640px)",
  md: "(min-width: 768px)",
  lg: "(min-width: 1024px)",
  xl: "(min-width: 1280px)",
  "2xl": "(min-width: 1536px)",
};

export function useBreakpoint(size: Breakpoint): boolean {
  return useMediaQuery(breakpoints[size]);
}
