import type { Decorator } from "@storybook/react-vite";

export const CommonDecorator: Decorator = (Story) => {
  return (
    <div className="p-8">
      <Story />
    </div>
  );
};
