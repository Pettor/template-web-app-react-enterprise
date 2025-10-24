import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import { createBaseConfig, createPWAConfig, createReactConfig, mergeConfigs } from "@config/vite";
import basicSsl from "@vitejs/plugin-basic-ssl";
import { defineConfig, loadEnv, mergeConfig } from "vite";
import proxy from "vite-plugin-http2-proxy";

// https://vitejs.dev/config/
export default defineConfig(({ mode, command }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const config = mergeConfigs([
    createBaseConfig(),
    createReactConfig(),
    createPWAConfig(),
    {
      plugins: [TanStackRouterVite()],
    },
  ]);

  switch (command) {
    case "build":
      return mergeConfig(config, {
        base: "./",
        build: {
          commonjsOptions: {
            exclude: ["@faker-js/faker"],
          },
        },
      });
    case "serve":
      return mergeConfig(config, {
        server: {
          cors: true,
          https: true,
        },
        plugins: [
          basicSsl(),
          proxy({
            "^/api": {
              target: `${env.VITE_CONNECT_HOST}:${env.VITE_CONNECT_PORT}`,
              secure: false,
            },
          }),
        ],
      });
  }
});
