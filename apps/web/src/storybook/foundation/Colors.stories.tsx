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
        <ColorSection title="Base">
          <ColorItem text="background" bgColor="bg-background" />
          <ColorItem text="foreground" bgColor="bg-foreground" invert />
          <ColorItem text="overlay" bgColor="bg-overlay" />
          <ColorItem text="muted" bgColor="bg-muted" />
        </ColorSection>
        <ColorSection title="Surface">
          <ColorItem text="surface" bgColor="bg-surface" />
          <ColorItem text="surface-secondary" bgColor="bg-surface-secondary" />
          <ColorItem text="surface-tertiary" bgColor="bg-surface-tertiary" />
        </ColorSection>
        <ColorSection title="Semantic">
          <ColorItem text="default" bgColor="bg-default" />
          <ColorItem text="accent" bgColor="bg-accent" invert />
          <ColorItem text="success" bgColor="bg-success" />
          <ColorItem text="warning" bgColor="bg-warning" />
          <ColorItem text="danger" bgColor="bg-danger" invert />
        </ColorSection>
        <ColorSection title="Hover">
          <ColorItem text="default-hover" bgColor="bg-default-hover" />
          <ColorItem text="accent-hover" bgColor="bg-accent-hover" invert />
          <ColorItem text="success-hover" bgColor="bg-success-hover" />
          <ColorItem text="warning-hover" bgColor="bg-warning-hover" />
          <ColorItem text="danger-hover" bgColor="bg-danger-hover" invert />
        </ColorSection>
        <ColorSection title="Soft">
          <ColorItem text="accent-soft" bgColor="bg-accent-soft" />
          <ColorItem text="success-soft" bgColor="bg-success-soft" />
          <ColorItem text="warning-soft" bgColor="bg-warning-soft" />
          <ColorItem text="danger-soft" bgColor="bg-danger-soft" />
        </ColorSection>
        <ColorSection title="Foreground">
          <ColorItem text="default-fg" bgColor="bg-default-foreground" invert />
          <ColorItem text="accent-fg" bgColor="bg-accent-foreground" />
          <ColorItem text="success-fg" bgColor="bg-success-foreground" />
          <ColorItem text="warning-fg" bgColor="bg-warning-foreground" />
          <ColorItem text="danger-fg" bgColor="bg-danger-foreground" />
        </ColorSection>
        <ColorSection title="Miscellaneous">
          <ColorItem text="border" bgColor="bg-border" />
          <ColorItem text="separator" bgColor="bg-separator" />
          <ColorItem text="focus" bgColor="bg-focus" invert />
          <ColorItem text="field" bgColor="bg-field" />
        </ColorSection>
      </div>
    </DocumentationLayout>
  );
}
