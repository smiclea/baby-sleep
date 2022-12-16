/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
  root: true,
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/eslint-config-typescript/recommended",
    "@vue/eslint-config-prettier",
  ],
  plugins: ["baby-sleep"],
  rules: {
    "prettier/prettier": [
      "error",
      {
        arrowParens: "avoid",
      },
    ],
    "baby-sleep/import-alias": [
      "error",
      {
        aliases: [
          {
            alias: "@",
            matcher: "^src",
          },
        ],
      },
    ],
    "@typescript-eslint/no-non-null-assertion": "off",
  },
};
