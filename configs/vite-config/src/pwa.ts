import type { PluginOption, UserConfig } from "vite";
import { mergeConfig } from "vite";
import { VitePWA, type VitePWAOptions } from "vite-plugin-pwa";
import { type ReactViteConfigOptions } from "./react";

export interface PWAViteConfigOptions extends ReactViteConfigOptions {
  /**
   * PWA configuration options
   */
  pwaOptions?: VitePWAOptions;

  /**
   * App manifest configuration
   */
  manifest?: {
    name?: string;
    shortName?: string;
    description?: string;
    themeColor?: string;
    backgroundColor?: string;
  };
}

export function createPWAConfig(options: PWAViteConfigOptions = {}): UserConfig {
  const { pwaOptions = {}, manifest = {} } = options;

  const defaultPWAOptions: Partial<VitePWAOptions> = {
    devOptions: {
      enabled: false,
    },
    includeAssets: [
      "favicon.ico",
      "apple-touch-icon.png",
      "pwa-192x192.png",
      "pwa-512x512.png",
      "screenshot-desktop.png",
      "screenshot-phone.png",
    ],
    injectRegister: "auto",
    manifest: {
      background_color: manifest.backgroundColor || "#ffffff",
      display: "standalone",
      description: manifest.description || "React Enterprise Template using Turborepo, TailwindCSS, HeroUI and Vite.",
      name: manifest.name || "ReactEnterpriseTemplate",
      icons: [
        {
          src: "pwa-192x192.png",
          sizes: "192x192",
          type: "image/png",
        },
        {
          src: "pwa-512x512.png",
          sizes: "512x512",
          type: "image/png",
        },
      ],
      screenshots: [
        {
          src: "screenshot-desktop.png",
          sizes: "690x670",
          type: "image/png",
          form_factor: "wide",
          label: "WebTemplate on Desktop",
        },
        {
          src: "screenshot-phone.png",
          sizes: "435x608",
          type: "image/png",
          form_factor: "narrow",
          label: "WebTemplate on Phone",
        },
      ],
      short_name: manifest.shortName || "WebTemplate",
      theme_color: manifest.themeColor || "#ffffff",
    },
    registerType: "autoUpdate",
    workbox: {
      globPatterns: ["**/*.{js,css,html,ico,png,svg}"],
      navigateFallbackDenylist: [/storybook/],
    },
    ...pwaOptions,
  };

  return {
    plugins: [VitePWA(defaultPWAOptions)],
  } satisfies UserConfig;
}
