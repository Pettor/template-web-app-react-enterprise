import type { Decorator } from "@storybook/react-vite";

export const ContainerDecorator: Decorator = (Story) => {
  return (
    <div className="container">
      <Story />
    </div>
  );
};
