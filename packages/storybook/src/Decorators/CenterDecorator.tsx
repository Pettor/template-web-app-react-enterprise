import type { Decorator } from "@storybook/react-vite";

export const CenterDecorator: Decorator = (Story) => {
  return <div className="flex w-full justify-center">{Story()}</div>;
};
