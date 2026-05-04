import path from "node:path";
import { createBaseConfig, createPWAConfig, createReactConfig, mergeConfigs } from "@config/vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import basicSsl from "@vitejs/plugin-basic-ssl";
import { defineConfig, loadEnv, mergeConfig } from "vite";
import istanbul from "vite-plugin-istanbul";
import proxy from "vite-plugin-http2-proxy";

// Repo root — two levels up from apps/web
const repoRoot = path.resolve(import.meta.dirname, "../..");

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
          // Istanbul instrumentation is only active when VITE_COVERAGE is set (E2E coverage runs).
          // Only instrument apps/web/src — packages/api and packages/ui are covered by their
          // own dedicated test runners (unit tests and Storybook) which produce separate
          // coverage reports that are merged later. Including them here causes path-format
          // conflicts between Istanbul (main-thread, URL paths) and Vitest V8 (absolute paths),
          // and API code runs in a Web Worker so window.__coverage__ can't capture it anyway.
          ...(process.env.VITE_COVERAGE
            ? [
                istanbul({
                  cwd: repoRoot,
                  include: ["apps/web/src/**/*.ts", "apps/web/src/**/*.tsx"],
                  exclude: ["node_modules", "**/*.stories.*", "**/*.test.*", "**/*.spec.*", "**/index.ts"],
                  extension: [".ts", ".tsx"],
                  requireEnv: false,
                }),
              ]
            : []),
        ],
      });
  }
});
