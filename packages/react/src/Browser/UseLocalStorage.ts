import { useCallback, useEffect, useState } from "react";

export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T | ((prev: T) => T)) => void] {
  const readValue = useCallback((): T => {
    if (typeof window === "undefined") return initialValue;
    try {
      const raw = window.localStorage.getItem(key);
      return raw !== null ? (JSON.parse(raw) as T) : initialValue;
    } catch {
      return initialValue;
    }
  }, [key, initialValue]);

  const [storedValue, setStoredValue] = useState<T>(readValue);

  const setValue = useCallback(
    (value: T | ((prev: T) => T)) => {
      try {
        const next = value instanceof Function ? value(storedValue) : value;
        window.localStorage.setItem(key, JSON.stringify(next));
        setStoredValue(next);
        // Notify other instances in the same tab
        window.dispatchEvent(new StorageEvent("storage", { key }));
      } catch {
        // localStorage may be unavailable (private mode, quota exceeded)
      }
    },
    [key, storedValue]
  );

  useEffect(() => {
    function onStorage(event: StorageEvent): void {
      if (event.key === key) setStoredValue(readValue());
    }
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [key, readValue]);

  return [storedValue, setValue];
}
