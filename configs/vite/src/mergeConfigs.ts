import { mergeConfig } from "vite";

export function mergeConfigs(configs: any[]): Record<string, any> {
  return configs.reduce((mergedConfig, config) => {
    return mergeConfig(mergedConfig, config);
  }, {});
}
