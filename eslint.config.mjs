import js from "@eslint/js";
import globals from "globals";
import html from "eslint-plugin-html";

export default [
  js.configs.recommended,
  {
    files: ["**/*.js", "**/*.html"],
    plugins: {
      html,
    },
    languageOptions: {
      ecmaVersion: 5,
      sourceType: "script",
      globals: {
        ...globals.browser,
        YT: "readonly",
        google: "readonly",
        firebase: "readonly",
        firebaseConfig: "readonly",
        YT_API_KEY: "readonly",
        FEATURED_PLAYLISTS: "readonly",
        Sortable: "readonly",
        Promise: "readonly",
      },
    },
    rules: {
      "no-var": "off",
      "prefer-const": "off",
      "prefer-arrow-callback": "off",
      "no-unused-vars": "off",
      "no-console": "off",
      "no-empty": "warn",
      "semi": ["error", "always"],
      "no-redeclare": "off",
    },
  },
];
