import { Card, CardBody, Spacer } from "@heroui/react";
import clsx from "clsx";
import { type ReactElement, type ReactNode } from "react";
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
      <p className="text-xl font-medium">{title}</p>
      <Spacer y={2} />
      <div className="flex h-full w-full flex-row flex-wrap items-center justify-start px-4 py-1">{children}</div>
    </div>
  );
}

function ColorItem({ text, bgColor, invert }: { text: string; bgColor: string; invert?: boolean }): ReactElement {
  return (
    <Card className={`m-2 h-25 w-25 ${bgColor}`}>
      <CardBody
        className={clsx("items-center justify-center truncate text-xs", invert ? "text-background" : "text-foreground")}
      >
        {text}
      </CardBody>
    </Card>
  );
}

export function Colors(): ReactElement {
  return (
    <DocumentationLayout label="Colors">
      <Spacer y={8} />
      <div className="flex flex-col gap-4">
        <ColorSection title="Layout">
          <ColorItem text="background" bgColor="bg-background" />
          <ColorItem text="foreground" bgColor="bg-foreground" invert />
          <ColorItem text="divider" bgColor="bg-divider" />
          <ColorItem text="focus" bgColor="bg-focus" />
        </ColorSection>
        <ColorSection title="Content">
          <ColorItem text="content1" bgColor="bg-content1" />
          <ColorItem text="content2" bgColor="bg-content2" />
          <ColorItem text="content3" bgColor="bg-content3" />
          <ColorItem text="content4" bgColor="bg-content4" />
        </ColorSection>
        <ColorSection title="Base">
          <ColorItem text="default" bgColor="bg-default" />
          <ColorItem text="primary" bgColor="bg-primary" invert />
          <ColorItem text="secondary" bgColor="bg-secondary" invert />
          <ColorItem text="success" bgColor="bg-success" />
          <ColorItem text="warning" bgColor="bg-warning" />
          <ColorItem text="danger" bgColor="bg-danger" invert />
        </ColorSection>
        <ColorSection title="Default">
          <ColorItem text="default-50" bgColor="bg-default-50" />
          <ColorItem text="default-100" bgColor="bg-default-100" />
          <ColorItem text="default-200" bgColor="bg-default-200" />
          <ColorItem text="default-300" bgColor="bg-default-300" />
          <ColorItem text="default-400" bgColor="bg-default-400" />
          <ColorItem text="default-500" bgColor="bg-default-500" />
          <ColorItem text="default-600" bgColor="bg-default-600" invert />
          <ColorItem text="default-700" bgColor="bg-default-700" invert />
          <ColorItem text="default-800" bgColor="bg-default-800" invert />
          <ColorItem text="default-900" bgColor="bg-default-900" invert />
        </ColorSection>
        <ColorSection title="Primary">
          <ColorItem text="primary-50" bgColor="bg-primary-50" />
          <ColorItem text="primary-100" bgColor="bg-primary-100" />
          <ColorItem text="primary-200" bgColor="bg-primary-200" />
          <ColorItem text="primary-300" bgColor="bg-primary-300" />
          <ColorItem text="primary-400" bgColor="bg-primary-400" />
          <ColorItem text="primary-500" bgColor="bg-primary-500" invert />
          <ColorItem text="primary-600" bgColor="bg-primary-600" invert />
          <ColorItem text="primary-700" bgColor="bg-primary-700" invert />
          <ColorItem text="primary-800" bgColor="bg-primary-800" invert />
          <ColorItem text="primary-900" bgColor="bg-primary-900" invert />
        </ColorSection>
        <ColorSection title="Secondary">
          <ColorItem text="secondary-50" bgColor="bg-secondary-50" />
          <ColorItem text="secondary-100" bgColor="bg-secondary-100" />
          <ColorItem text="secondary-200" bgColor="bg-secondary-200" />
          <ColorItem text="secondary-300" bgColor="bg-secondary-300" />
          <ColorItem text="secondary-400" bgColor="bg-secondary-400" />
          <ColorItem text="secondary-500" bgColor="bg-secondary-500" invert />
          <ColorItem text="secondary-600" bgColor="bg-secondary-600" invert />
          <ColorItem text="secondary-700" bgColor="bg-secondary-700" invert />
          <ColorItem text="secondary-800" bgColor="bg-secondary-800" invert />
          <ColorItem text="secondary-900" bgColor="bg-secondary-900" invert />
        </ColorSection>
        <ColorSection title="Success">
          <ColorItem text="success-50" bgColor="bg-success-50" />
          <ColorItem text="success-100" bgColor="bg-success-100" />
          <ColorItem text="success-200" bgColor="bg-success-200" />
          <ColorItem text="success-300" bgColor="bg-success-300" />
          <ColorItem text="success-400" bgColor="bg-success-400" />
          <ColorItem text="success-500" bgColor="bg-success-500" invert />
          <ColorItem text="success-600" bgColor="bg-success-600" invert />
          <ColorItem text="success-700" bgColor="bg-success-700" invert />
          <ColorItem text="success-800" bgColor="bg-success-800" invert />
          <ColorItem text="success-900" bgColor="bg-success-900" invert />
        </ColorSection>
        <ColorSection title="Warning">
          <ColorItem text="warning-50" bgColor="bg-warning-50" />
          <ColorItem text="warning-100" bgColor="bg-warning-100" />
          <ColorItem text="warning-200" bgColor="bg-warning-200" />
          <ColorItem text="warning-300" bgColor="bg-warning-300" />
          <ColorItem text="warning-400" bgColor="bg-warning-400" />
          <ColorItem text="warning-500" bgColor="bg-warning-500" invert />
          <ColorItem text="warning-600" bgColor="bg-warning-600" invert />
          <ColorItem text="warning-700" bgColor="bg-warning-700" invert />
          <ColorItem text="warning-800" bgColor="bg-warning-800" invert />
          <ColorItem text="warning-900" bgColor="bg-warning-900" invert />
        </ColorSection>
        <ColorSection title="Danger">
          <ColorItem text="danger-50" bgColor="bg-danger-50" />
          <ColorItem text="danger-100" bgColor="bg-danger-100" />
          <ColorItem text="danger-200" bgColor="bg-danger-200" />
          <ColorItem text="danger-300" bgColor="bg-danger-300" />
          <ColorItem text="danger-400" bgColor="bg-danger-400" />
          <ColorItem text="danger-500" bgColor="bg-danger-500" invert />
          <ColorItem text="danger-600" bgColor="bg-danger-600" invert />
          <ColorItem text="danger-700" bgColor="bg-danger-700" invert />
          <ColorItem text="danger-800" bgColor="bg-danger-800" invert />
          <ColorItem text="danger-900" bgColor="bg-danger-900" invert />
        </ColorSection>
      </div>
    </DocumentationLayout>
  );
}
