import baseConfig from "storybook-config/preview";
import "../src/main.css";
import type { Preview } from "@storybook/react";
import { HeroUIProvider } from "@heroui/react";

export const preview: Preview = {
  ...baseConfig,
  decorators: [
    (Story) => (
      <HeroUIProvider>
        <Story />
      </HeroUIProvider>
    ),
  ],
  parameters: {
    ...baseConfig.parameters,
    options: {
      storySort: {
        method: "alphabetical",
        order: ["Design System", "Shared"],
      },
    },
  },
};
