import globals from "globals";
import js from "@eslint/js";
import gasPlugin from "eslint-plugin-googleappsscript";
import pluginPrettier from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier";
import jest from "eslint-plugin-jest";

export default [
  // Global ignores
  {
    ignores: ["node_modules/", "dist/", ".clasp.json", "*.gasrc.js"],
  },

  // Base JavaScript configuration
  js.configs.recommended,

  // Google Apps Script configuration for src/code.js
  {
    files: ["src/code.js"],
    plugins: {
      gas: gasPlugin,
    },
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: "script",
      globals: {
        ...globals.googleapps,
        ...gasPlugin.environments.googleappsscript.globals,
        module: "writable", // For CommonJS compatibility in tests
      },
    },
    rules: {
      "no-unused-vars": "warn",
      "no-var": "error",
      "prefer-const": "error",
    },
  },

  // Google Apps Script configuration for src/examples.js
  {
    files: ["src/examples.js"],
    plugins: {
      gas: gasPlugin,
    },
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: "script",
      globals: {
        ...globals.googleapps,
        ...gasPlugin.environments.googleappsscript.globals,
        main: "readonly", // main is defined in code.js
      },
    },
    rules: {
      "no-unused-vars": [
        "warn",
        { args: "none", varsIgnorePattern: "^remove" },
      ],
      "no-var": "error",
      "prefer-const": "error",
    },
  },

  // Jest test configuration
  {
    files: ["src/**/*.test.js"],
    ...jest.configs["flat/recommended"],
    languageOptions: {
      globals: {
        ...globals.jest,
      },
    },
    rules: {
      ...jest.configs["flat/recommended"].rules,
      "jest/prefer-expect-assertions": "off",
    },
  },

  // Node.js specific configuration (for test files)
  {
    files: ["src/**/*.test.js"],
    languageOptions: {
      globals: {
        ...globals.node,
      },
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