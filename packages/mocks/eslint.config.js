import { config } from "@config/eslint/react";
export default [
  ...config,
  {
    rules: {
      "@typescript-eslint/explicit-function-return-type": "off",
    },
  },
];
