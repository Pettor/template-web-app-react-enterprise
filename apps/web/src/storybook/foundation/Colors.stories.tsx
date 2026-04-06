import { useEffect, useRef, useState, type ReactElement, type ReactNode } from "react";
import { Card, CardContent } from "@heroui/react";
import { DocumentationDecorator, DocumentationLayout } from "@package/storybook";

export default {
  title: "Design System/Colors",
  tags: ["no-tests"],
  decorators: [DocumentationDecorator],
  parameters: {
    a11y: {
      test: "off",
    },
    layout: "fullscreen",
  },
};

function resolveContrastColor(el: HTMLElement): "black" | "white" {
  const bg = getComputedStyle(el).backgroundColor;
  const canvas = document.createElement("canvas");
  canvas.width = 1;
  canvas.height = 1;
  const ctx = canvas.getContext("2d");
  if (!ctx) return "black";
  ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue("--background").trim() || "#ffffff";
  ctx.fillRect(0, 0, 1, 1);
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, 1, 1);
  const { data } = ctx.getImageData(0, 0, 1, 1);
  const r = data[0] ?? 0;
  const g = data[1] ?? 0;
  const b = data[2] ?? 0;
  return (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255 > 0.5 ? "black" : "white";
}

function ColorSection({ title, children }: { title: string; children: ReactNode }): ReactElement {
  return (
    <div>
      <p className="text-xl font-medium">{title}</p>
      <div className="h-2" />
      <div className="flex h-full w-full flex-row flex-wrap items-center justify-start px-4 py-1">{children}</div>
    </div>
  );
}

function ColorItem({ text, bgColor }: { text: string; bgColor: string }): ReactElement {
  const ref = useRef<HTMLDivElement>(null);
  const [textColor, setTextColor] = useState<"black" | "white">("black");

  useEffect(() => {
    function update(): void {
      if (ref.current) setTextColor(resolveContrastColor(ref.current));
    }
    update();
    const observer = new MutationObserver(update);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class", "data-theme"] });
    return (): void => observer.disconnect();
  }, [bgColor]);

  return (
    <Card variant="secondary" ref={ref} className={`m-2 h-15 w-35 ${bgColor}`}>
      <CardContent className="items-center justify-center truncate text-xs" style={{ color: textColor }}>
        {text}
      </CardContent>
    </Card>
  );
}

export function Colors(): ReactElement {
  return (
    <DocumentationLayout label="Colors">
      <div className="h-8" />
      <div className="flex flex-col gap-4">
        <ColorSection title="Base Colors">
          <ColorItem text="--white" bgColor="bg-[var(--white)]" />
          <ColorItem text="--black" bgColor="bg-[var(--black)]" />
          <ColorItem text="--snow" bgColor="bg-[var(--snow)]" />
          <ColorItem text="--eclipse" bgColor="bg-[var(--eclipse)]" />
        </ColorSection>
        <ColorSection title="Background & Surface">
          <ColorItem text="--background" bgColor="bg-background" />
          <ColorItem text="--foreground" bgColor="bg-foreground" />
          <ColorItem text="--surface" bgColor="bg-surface" />
          <ColorItem text="--surface-foreground" bgColor="bg-surface-foreground" />
          <ColorItem text="--overlay" bgColor="bg-overlay" />
          <ColorItem text="--overlay-foreground" bgColor="bg-overlay-foreground" />
        </ColorSection>
        <ColorSection title="Primary Colors">
          <ColorItem text="--accent" bgColor="bg-accent" />
          <ColorItem text="--accent-foreground" bgColor="bg-accent-foreground" />
          <ColorItem text="--accent-soft" bgColor="bg-accent-soft" />
          <ColorItem text="--accent-soft-foreground" bgColor="bg-accent-soft-foreground" />
        </ColorSection>
        <ColorSection title="Status Colors">
          <ColorItem text="--success" bgColor="bg-success" />
          <ColorItem text="--success-foreground" bgColor="bg-success-foreground" />
          <ColorItem text="--warning" bgColor="bg-warning" />
          <ColorItem text="--warning-foreground" bgColor="bg-warning-foreground" />
          <ColorItem text="--danger" bgColor="bg-danger" />
          <ColorItem text="--danger-foreground" bgColor="bg-danger-foreground" />
        </ColorSection>
        <ColorSection title="Form Field Colors">
          <ColorItem text="--field-background" bgColor="bg-field" />
          <ColorItem text="--field-foreground" bgColor="bg-field-foreground" />
          <ColorItem text="--field-placeholder" bgColor="bg-field-placeholder" />
          <ColorItem text="--field-border" bgColor="bg-field-border" />
        </ColorSection>
        <ColorSection title="Other Colors">
          <ColorItem text="--default" bgColor="bg-default" />
          <ColorItem text="--default-foreground" bgColor="bg-default-foreground" />
          <ColorItem text="--muted" bgColor="bg-muted" />
          <ColorItem text="--border" bgColor="bg-border" />
          <ColorItem text="--focus" bgColor="bg-focus" />
          <ColorItem text="--link" bgColor="bg-link" />
          <ColorItem text="--backdrop" bgColor="bg-[var(--backdrop)]" />
          <ColorItem text="--scrollbar" bgColor="bg-[var(--scrollbar)]" />
        </ColorSection>
      </div>
    </DocumentationLayout>
  );
}
