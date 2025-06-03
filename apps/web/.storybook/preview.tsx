import baseConfig from "storybook-config/preview";
import type { Preview } from "@storybook/react";
import "../src/main.css";

const preview: Preview = {
  ...baseConfig,
  parameters: {
    ...baseConfig.parameters,
    options: {
      storySort: {
        method: "alphabetical",
        order: ["Design System", "Views", "Actions", "Display", "Feedback", "Forms", "Layout", "Navigation", "Shared"],
      },
    },
  },
};

export default preview;
