import tailwindcss from "@tailwindcss/vite";
import type { UserConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export interface BaseViteConfigOptions {
  /**
   * Enable TypeScript path mapping
   * @default true
   */
  enableTsconfigPaths?: boolean;

  /**
   * Enable Tailwind CSS
   * @default true
   */
  enableTailwind?: boolean;

  /**
   * Additional plugins to include
   */
  additionalPlugins?: UserConfig["plugins"];
}

export function createBaseConfig(options: BaseViteConfigOptions = {}): UserConfig {
  const { enableTsconfigPaths = true, enableTailwind = true, additionalPlugins = [] } = options;

  const plugins: UserConfig["plugins"] = [];

  if (enableTailwind) {
    plugins.push(tailwindcss());
  }

  if (enableTsconfigPaths) {
    plugins.push(tsconfigPaths());
  }

  if (additionalPlugins) {
    plugins.push(...(Array.isArray(additionalPlugins) ? additionalPlugins : [additionalPlugins]));
  }

  return {
    plugins,
    build: {
      commonjsOptions: {
        exclude: ["@faker-js/faker"],
      },
    },
  } satisfies UserConfig;
}
