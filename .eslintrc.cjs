/* ESLint config for a Vite + React + TypeScript project. */
module.exports = {
  root: true,
  env: { browser: true, es2022: true },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: "module",
    ecmaFeatures: { jsx: true },
  },
  settings: { react: { version: "detect" } },
  plugins: ["@typescript-eslint", "react", "react-hooks", "react-refresh"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
  ],
  rules: {
    // Prop typing comes from TypeScript; copy legitimately contains apostrophes.
    "react/prop-types": "off",
    "react/no-unescaped-entities": "off",
    // Cap cyclomatic complexity (quality standard: <= 10 per function).
    complexity: ["error", 10],
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
    "@typescript-eslint/no-unused-vars": [
      "error",
      { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
    ],
  },
  ignorePatterns: ["dist", "node_modules", "coverage"],
  overrides: [
    {
      files: ["*.cjs", "vite.config.ts", "vitest.config.ts"],
      env: { node: true },
    },
  ],
};
