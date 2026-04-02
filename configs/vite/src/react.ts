import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import babel from "@rolldown/plugin-babel";
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
  reactCompilerConfig?: Parameters<typeof reactCompilerPreset>[0];

  /**
   * Additional React plugin options
   */
  reactOptions?: Parameters<typeof react>[0];
}

export function createReactConfig(options: ReactViteConfigOptions = {}): UserConfig {
  const { enableReactCompiler = true, reactCompilerConfig, reactOptions = {} } = options;

  return {
    plugins: [
      react(reactOptions),
      ...(enableReactCompiler ? [babel({ presets: [reactCompilerPreset(reactCompilerConfig)] })] : []),
    ],
  } satisfies UserConfig;
}
