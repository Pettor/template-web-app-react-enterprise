import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  addons: ["@storybook/addon-a11y", "@storybook/addon-themes", "@storybook/addon-vitest"],
  core: {
    builder: {
      name: "@storybook/builder-vite",
      options: {
        viteConfigPath: ".storybook/vite.config.ts",
      },
    },
  },
  docs: {
    defaultName: "Docs",
  },
  framework: "@storybook/react-vite",
  stories: ["../node_modules/@app/web/src/**/*.stories.@(ts|tsx)", "../node_modules/@package/ui/src/**/*.stories.tsx"],
};

export default config;
