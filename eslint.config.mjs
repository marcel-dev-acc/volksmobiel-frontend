import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";


export default [
  {files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"]},
  {languageOptions: { globals: globals.browser }},
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    rules: {
      "@typescript-eslint/require-await": 0,
      "quotes": [2, "single"],
      "@typescript-eslint/consistent-type-imports": 2,
      "@typescript-eslint/strict-boolean-expressions": 0,
      "@typescript-eslint/explicit-function-return-type": 2,
      "dot-notation": 0,
      "@typescript-eslint/no-floating-promises": 0,
      "@typescript-eslint/no-misused-promises": 0,
      "sort-imports": [
        "error",
        {
          "ignoreCase": true,
          "ignoreDeclarationSort": true,
          "ignoreMemberSort": true,
          "memberSyntaxSortOrder": ["single", "multiple", "all", "none"],
          "allowSeparatedGroups": true,
        },
      ],
    },
    settings: {
      react: {
        version: "18.3.1",
      },
    },
  },
];