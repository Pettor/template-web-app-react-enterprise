import react from "@vitejs/plugin-react";
import type { UserConfig } from "vite";
import { type BaseViteConfigOptions } from "./base";

export interface ReactViteConfigOptions extends BaseViteConfigOptions {
  /**
   * Enable React Compiler
   * @default true
   */
  enableReactCompiler?: boolean;

  /**
   * React Compiler configuration
   */
  reactCompilerConfig?: {
    target?: string;
  };

  /**
   * Additional React plugin options
   */
  reactOptions?: Parameters<typeof react>[0];
}

export function createReactConfig(options: ReactViteConfigOptions = {}): UserConfig {
  const { enableReactCompiler = true, reactCompilerConfig = { target: "19" }, reactOptions = {} } = options;

  const reactPluginOptions = {
    ...reactOptions,
    babel: {
      ...reactOptions.babel,
      plugins: [...(enableReactCompiler ? [["babel-plugin-react-compiler", reactCompilerConfig]] : [])],
    },
  };

  return {
    plugins: [react(reactPluginOptions)],
  } satisfies UserConfig;
}
