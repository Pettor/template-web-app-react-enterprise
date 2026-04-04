import { type ReactElement, type ReactNode } from "react";
import { Card, CardContent } from "@heroui/react";
import { DocumentationDecorator, DocumentationLayout } from "@package/storybook";
import clsx from "clsx";

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

function ColorSection({ title, children }: { title: string; children: ReactNode }): ReactElement {
  return (
    <div>
      <p className="text-xl font-medium">{title}</p>
      <div className="h-2" />
      <div className="flex h-full w-full flex-row flex-wrap items-center justify-start px-4 py-1">{children}</div>
    </div>
  );
}

function ColorItem({ text, bgColor, invert }: { text: string; bgColor: string; invert?: boolean }): ReactElement {
  return (
    <Card className={`m-2 h-25 w-25 ${bgColor}`}>
      <CardContent
        className={clsx("items-center justify-center truncate text-xs", invert ? "text-background" : "text-foreground")}
      >
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
          <ColorItem text="--black" bgColor="bg-[var(--black)]" invert />
          <ColorItem text="--snow" bgColor="bg-[var(--snow)]" />
          <ColorItem text="--eclipse" bgColor="bg-[var(--eclipse)]" invert />
        </ColorSection>
        <ColorSection title="Background & Surface">
          <ColorItem text="--background" bgColor="bg-background" />
          <ColorItem text="--foreground" bgColor="bg-foreground" invert />
          <ColorItem text="--surface" bgColor="bg-surface" />
          <ColorItem text="--surface-foreground" bgColor="bg-surface-foreground" invert />
          <ColorItem text="--overlay" bgColor="bg-overlay" />
          <ColorItem text="--overlay-foreground" bgColor="bg-overlay-foreground" invert />
        </ColorSection>
        <ColorSection title="Primary Colors">
          <ColorItem text="--accent" bgColor="bg-accent" invert />
          <ColorItem text="--accent-foreground" bgColor="bg-accent-foreground" />
          <ColorItem text="--accent-soft" bgColor="bg-accent-soft" />
          <ColorItem text="--accent-soft-foreground" bgColor="bg-accent-soft-foreground" invert />
        </ColorSection>
        <ColorSection title="Status Colors">
          <ColorItem text="--success" bgColor="bg-success" />
          <ColorItem text="--success-foreground" bgColor="bg-success-foreground" invert />
          <ColorItem text="--warning" bgColor="bg-warning" />
          <ColorItem text="--warning-foreground" bgColor="bg-warning-foreground" invert />
          <ColorItem text="--danger" bgColor="bg-danger" invert />
          <ColorItem text="--danger-foreground" bgColor="bg-danger-foreground" />
        </ColorSection>
        <ColorSection title="Form Field Colors">
          <ColorItem text="--field-background" bgColor="bg-field" />
          <ColorItem text="--field-foreground" bgColor="bg-field-foreground" invert />
          <ColorItem text="--field-placeholder" bgColor="bg-field-placeholder" />
          <ColorItem text="--field-border" bgColor="bg-field-border" />
        </ColorSection>
        <ColorSection title="Other Colors">
          <ColorItem text="--default" bgColor="bg-default" />
          <ColorItem text="--default-foreground" bgColor="bg-default-foreground" invert />
          <ColorItem text="--muted" bgColor="bg-muted" />
          <ColorItem text="--border" bgColor="bg-border" />
          <ColorItem text="--focus" bgColor="bg-focus" invert />
          <ColorItem text="--link" bgColor="bg-link" invert />
          <ColorItem text="--backdrop" bgColor="bg-[var(--backdrop)]" invert />
          <ColorItem text="--scrollbar" bgColor="bg-[var(--scrollbar)]" />
        </ColorSection>
      </div>
    </DocumentationLayout>
  );
}
