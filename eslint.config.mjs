import globals from "globals";
import pluginJs from "@eslint/js";


export default [
  {
    files: ["**/*.js"],
    languageOptions: {
      sourceType: "commonjs",
      globals: {
        ...globals.browser,
        ...globals.node, 
      },
    },
  },
  {
    files: ["**/*.test.js", "**/__tests__/**/*.js", "**/*.test.ts", "**/__tests__/**/*.ts"],
    languageOptions: {
      globals: {
        ...globals.jest,
        ...globals.node
      },
    },
  },
  pluginJs.configs.recommended,
  {
    ignores: ["dist/"],
  },
];