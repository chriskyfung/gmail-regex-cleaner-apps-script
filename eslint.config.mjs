import globals from "globals";
import js from "@eslint/js";
import gasPlugin from "eslint-plugin-googleappsscript";
import pluginPrettier from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier";

export default [
  // Global ignores
  {
    ignores: ["node_modules/", "dist/", ".clasp.json", "*.gasrc.js"],
  },

  // Base JavaScript configuration
  js.configs.recommended,

  // Google Apps Script specific configuration
  {
    files: ["src/**/*.js"],
    plugins: {
      gas: gasPlugin,
    },
    languageOptions: {
      ecmaVersion: 2021, // GAS supports up to ES2021 features
      sourceType: "script", // GAS uses script format, not module
      globals: {
        ...globals.googleapps, // Use the correct GAS environment globals
        ...gasPlugin.environments.googleappsscript.globals,
      },
    },
    rules: {
      // Basic rules for clean code
      "no-unused-vars": "warn",
      "no-var": "error",
      "prefer-const": "error",
      "prefer-arrow-callback": "error",
      "arrow-spacing": "error",

      // GAS-specific rules
      "no-alert": "error",
      "no-implied-eval": "error",
      "no-new-func": "error",

      // Add additional rules as needed for your project
    },
  },

  // Prettier configuration (must be last)
  prettierConfig,
  {
    plugins: {
      prettier: pluginPrettier,
    },
    rules: {
      "prettier/prettier": "error",
    },
  },
];
