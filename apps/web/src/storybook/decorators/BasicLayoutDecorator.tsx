import { BasicLayout } from "@package/ui";
import type { Decorator } from "@storybook/react-vite";

export function BasicLayoutDecorator(): Decorator {
  return (Story) => (
    <BasicLayout>
      <Story />
    </BasicLayout>
  );
}
