// @ts-check
const eslint = require("@eslint/js");
const tseslint = require("typescript-eslint");
const angular = require("angular-eslint");

module.exports = tseslint.config(
  {
    files: ["**/*.ts"],
    extends: [
      // eslint.configs.recommended,
      // ...tseslint.configs.recommended,
      // ...tseslint.configs.stylistic,
      // ...angular.configs.tsRecommended,
    ],
    processor: angular.processInlineTemplates,
    rules: {
      "no-unused-expressions": "off",
      "@angular-eslint/component-selector": "off",
      "@typescript-eslint/no-inferrable-types": "off",
      "@angular-eslint/template/eqeqeq": "off",
      "@angular-eslint/no-input-rename": "off",
      "@angular-eslint/no-output-on-prefix": "off",
      "@typescript-eslint/no-empty-interface": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-namespace": "off",
      "@typescript-eslint/ban-types": "off",
      "no-prototype-builtins": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "no-sparse-arrays": "off",
      "@typescript-eslint/no-empty-function": "off",
      "@angular-eslint/component-class-suffix": "error",
      "@angular-eslint/directive-selector": "off",
    },
  },
  {
    files: ["**/*.html"],
    extends: [
      // ...angular.configs.templateRecommended,
      // ...angular.configs.templateAccessibility,
    ],
    rules: {},
  }
);
