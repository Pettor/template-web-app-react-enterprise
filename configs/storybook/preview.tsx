import { INITIAL_VIEWPORTS } from "storybook/addon-viewport";
import { Preview } from "@storybook/react";
import { IntlProvider } from "react-intl";
import { withThemeByClassName } from "@storybook/addon-themes";

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
    viewport: {
      viewports: INITIAL_VIEWPORTS,
    },
  },
};

export default preview;
