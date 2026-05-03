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
          // cwd is set to the repo root so that test-exclude can resolve workspace package paths
          // (e.g. packages/api/src/**) correctly — without this, paths outside apps/web are
          // outside the cwd and the **-glob fails to match parent-directory traversal segments.
          ...(process.env.VITE_COVERAGE
            ? [
                istanbul({
                  cwd: repoRoot,
                  include: [
                    "apps/web/src/**/*.ts",
                    "apps/web/src/**/*.tsx",
                    "packages/api/src/**/*.ts",
                    "packages/ui/src/**/*.ts",
                    "packages/ui/src/**/*.tsx",
                  ],
                  exclude: [
                    "node_modules",
                    "**/*.stories.*",
                    "**/*.test.*",
                    "**/*.spec.*",
                    "**/index.ts",
                    // Storybook-only helper components are not production code
                    "packages/ui/src/Storybook/**",
                  ],
                  extension: [".ts", ".tsx"],
                  requireEnv: false,
                }),
              ]
            : []),
        ],
      });
  }
});
