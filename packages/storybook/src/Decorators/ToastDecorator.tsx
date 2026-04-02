import { ToastProvider } from "@heroui/react";
import type { Decorator } from "@storybook/react-vite";

export const ToastDecorator: Decorator = (Story) => {
  return (
    <>
      <ToastProvider />
      {Story()}
    </>
  );
};
