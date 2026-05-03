import { createBaseConfig, createPWAConfig, createReactConfig, mergeConfigs } from "@config/vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import basicSsl from "@vitejs/plugin-basic-ssl";
import { defineConfig, loadEnv, mergeConfig } from "vite";
import istanbul from "vite-plugin-istanbul";
import proxy from "vite-plugin-http2-proxy";

// https://vitejs.dev/config/
export default defineConfig(({ mode, command }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const config = mergeConfigs([
    createBaseConfig(),
    createReactConfig({ enableReactCompiler: command === "build" }),
    createPWAConfig(),
    {
      plugins: [tanstackRouter({ routeToken: "route" })],
    },
    { resolve: { dedupe: ["react", "react-dom"] } },
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
          // basicSsl() below provides the self-signed cert; https: true signals intent
          https: true,
          port: 5173,
        },
        plugins: [
          basicSsl(),
          proxy({
            "^/api": {
              target: `${env.VITE_CONNECT_HOST}:${env.VITE_CONNECT_PORT}`,
              secure: false,
            },
          }),
          // Istanbul instrumentation is only active when VITE_COVERAGE is set (E2E coverage runs)
          ...(process.env.VITE_COVERAGE
            ? [
                istanbul({
                  include: ["src/**/*.ts", "src/**/*.tsx"],
                  exclude: ["node_modules", "src/**/*.stories.*", "src/**/*.test.*", "src/**/*.spec.*"],
                  extension: [".ts", ".tsx"],
                  requireEnv: false,
                }),
              ]
            : []),
        ],
      });
  }
});
