export default {
  env: {
    browser: true,
    es2021: true,
    nose: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "universe/native",
    "universe/shared/typescript-analysis",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["react", "@typescript-eslint"],
  rules: {
    quotes: ["error", "single", { avoidEscape: true }],
    "import/newline-after-import": "error",
  },
};
