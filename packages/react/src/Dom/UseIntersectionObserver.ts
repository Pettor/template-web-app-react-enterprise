import type { RefObject } from "react";
import { useEffect, useRef, useState } from "react";

export function useIntersectionObserver(
  ref: RefObject<Element | null>,
  options?: IntersectionObserverInit
): IntersectionObserverEntry | undefined {
  const [entry, setEntry] = useState<IntersectionObserverEntry>();
  // Snapshot options at mount — avoids re-running the effect when
  // the caller passes an inline object literal on every render.
  const optionsRef = useRef(options);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(([e]) => {
      if (e) setEntry(e);
    }, optionsRef.current);
    observer.observe(element);
    return () => observer.disconnect();
  }, [ref]);

  return entry;
}
