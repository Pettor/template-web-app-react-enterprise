import { useEffect, useState } from "react";

type Theme = "light" | "dark";

export function useStorybookTheme(): Theme {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const htmlTags = document.getElementsByTagName("html");
    const targetHtml = htmlTags.length > 1 ? htmlTags[1] : htmlTags[0];

    if (!targetHtml) return;

    const updateTheme = (): void => {
      const classList = targetHtml.classList;
      setTheme(classList.contains("dark") ? "dark" : "light");
    };

    // Initial check
    updateTheme();

    const observer = new MutationObserver(() => {
      updateTheme();
    });

    observer.observe(targetHtml, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  return theme;
}
