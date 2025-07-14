export default {
  source: ["src/**/*.json"],
  platforms: {
    css: {
      transformGroup: "css",
      buildPath: "dist/css/",
      files: [
        {
          destination: "variables.css",
          format: "css/variables",
          options: {
            outputReferences: true,
          },
        },
      ],
    },
    tailwind: {
      transformGroup: "js",
      buildPath: "dist/tailwind/",
      files: [
        {
          destination: "theme.js",
          format: "javascript/es6",
        },
        {
          destination: "theme.d.ts",
          format: "typescript/es6-declarations",
        },
      ],
    },
  },
};
