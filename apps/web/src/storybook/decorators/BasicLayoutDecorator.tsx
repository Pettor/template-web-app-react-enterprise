import { BasicLayout, BlueFadeBackground, GridBackground } from "@package/ui";
import type { Decorator } from "@storybook/react-vite";

export function BasicLayoutDecorator(): Decorator {
  return (Story) => (
    <BasicLayout
      backgroundElement={
        <>
          <BlueFadeBackground />
          <GridBackground />
        </>
      }
    >
      <Story />
    </BasicLayout>
  );
}
