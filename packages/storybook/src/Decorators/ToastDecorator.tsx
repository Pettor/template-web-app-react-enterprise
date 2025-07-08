import { HeroUIProvider } from "@heroui/react";
import { ToastProvider } from "@heroui/toast";
import type { Decorator } from "@storybook/react-vite";

export const ToastDecorator: Decorator = (Story) => {
  return (
    <HeroUIProvider>
      <ToastProvider />
      {Story()}
    </HeroUIProvider>
  );
};
