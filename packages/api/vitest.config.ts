import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    coverage: {
      provider: "v8",
      reporter: ["cobertura", "text"],
      include: ["src/**/*.ts"],
      exclude: ["src/index.ts", "src/**/*.d.ts", "src/**/*.test.ts"],
    },
  },
});
