import { Card, CardBody, CardHeader, Spacer } from "@heroui/react";
import { useMemo, useState, type ReactElement, type ReactNode } from "react";
import { DocumentationDecorator, DocumentationLayout } from "storybook-package";

export default {
  title: "Design System/Colors",
  tags: ["no-tests"],
  decorators: [DocumentationDecorator],
  parameters: {
    layout: "fullscreen",
  },
};

function ColorSection({ title, children }: { title: string; children: ReactNode }): ReactElement {
  return (
    <div>
      <p className="text-3xl">{title}</p>
      <Spacer y={2} />
      <div className="flex">{children}</div>
    </div>
  );
}

function ColorItem({ text, bgColor }: { text: string; bgColor: string }): ReactElement {
  // From the <html> element get class dark or light

  const [theme] = useState<string>(() => {
    const htmlElement = document.querySelector("html");
    return htmlElement?.classList.contains("dark") ? "dark" : "light";
  });
  console.log("Theme:", theme);

  // What theme is storybook using
  const [cardRef, setCardRef] = useState<HTMLDivElement | null>(null);

  const refCallback = (node: HTMLDivElement | null) => {
    setCardRef(node);
  };

  function rgbToHex(rgb: string): string {
    const result = rgb.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);

    if (!result || !result[1] || !result[2] || !result[3]) {
      return "#ffffff";
    }

    const r = parseInt(result[1], 10);
    const g = parseInt(result[2], 10);
    const b = parseInt(result[3], 10);

    return "#" + [r, g, b].map((x) => x.toString(16).padStart(2, "0")).join("");
  }

  const hexColor = useMemo(() => {
    if (!cardRef) {
      return "";
    }

    let el: HTMLElement | null = cardRef;

    while (el) {
      const bg = window.getComputedStyle(el).backgroundColor;

      // If it's not fully transparent, return it
      if (bg && bg !== "transparent" && bg !== "rgba(0, 0, 0, 0)") {
        return rgbToHex(bg);
      }

      // Otherwise, walk up the DOM tree
      el = el.parentElement;
    }

    // Default to white if no background color is found
    return "rgb(255, 255, 255)";
  }, [bgColor, cardRef]);

  const textFromHex = useMemo(() => {
    if (!hexColor) {
      return "";
    }

    // Using hext decide if black or white text is better
    const sanitizedHex = hexColor.replace(/^#/, "");

    // Convert to RGB
    console.log("Sanitized Hex:", sanitizedHex);
    const r = parseInt(sanitizedHex.substring(0, 2), 16);
    const g = parseInt(sanitizedHex.substring(2, 4), 16);
    const b = parseInt(sanitizedHex.substring(4, 6), 16);

    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 128 ? "text-black" : "text-white";
  }, [hexColor]);

  return (
    <Card ref={refCallback} className={`mr-2 ${bgColor} ${textFromHex}`} isBlurred>
      <CardHeader>{text}</CardHeader>
      <CardBody>{hexColor}</CardBody>
    </Card>
  );
}

export function Colors(): ReactElement {
  return (
    <DocumentationLayout label="Layout">
      <Spacer y={8} />
      <ColorSection title="Base">
        <ColorItem text="Background" bgColor="bg-background" />
        <ColorItem text="Foreground" bgColor="bg-foreground" />
        <ColorItem text="Divider" bgColor="bg-divider" />
        <ColorItem text="Focus" bgColor="bg-focus" />
      </ColorSection>
    </DocumentationLayout>
  );
}
