import type { Decorator } from "@storybook/react-vite";

export const FullSizeDecorator: Decorator = (Story) => {
  return (
    <div className="flex h-svh w-svw flex-col">
      <Story />
    </div>
  );
};
