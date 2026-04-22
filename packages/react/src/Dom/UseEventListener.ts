import { useEffect, useRef } from "react";

export function useEventListener(
  target: EventTarget | null,
  event: string,
  handler: (event: Event) => void,
  options?: AddEventListenerOptions
): void {
  const savedHandler = useRef(handler);
  savedHandler.current = handler;

  useEffect(() => {
    if (target === null) return;
    function listener(event: Event): void {
      savedHandler.current(event);
    }
    target.addEventListener(event, listener, options);
    return () => target.removeEventListener(event, listener, options);
  }, [target, event, options]);
}
