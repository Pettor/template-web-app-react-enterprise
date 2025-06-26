import { INITIAL_VIEWPORTS } from "storybook/viewport";
import { IntlProvider } from "react-intl";
import { withThemeByClassName } from "@storybook/addon-themes";
import type { Preview } from "@storybook/react";
import "../src/main.css";

const preview: Preview = {
  decorators: [
    (Story, context) => (
      <IntlProvider locale="en" messages={{}}>
        <Story {...context} />
      </IntlProvider>
    ),
    withThemeByClassName({
      themes: {
        light: "light",
        dark: "dark",
      },
      defaultTheme: "light",
    }),
  ],
  parameters: {
    options: {
      storySort: {
        method: "alphabetical",
        order: ["Design System", "Views", "Actions", "Display", "Feedback", "Forms", "Layout", "Navigation", "Shared"],
      },
    },
    viewport: {
      options: INITIAL_VIEWPORTS,
    },
  },
};

export default preview;
