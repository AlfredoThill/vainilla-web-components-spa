import globals from "globals";
import * as importPlugin from "eslint-plugin-import";
import * as htmlPlugin from "eslint-plugin-html";
import * as prettierPlugin from "eslint-plugin-prettier";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    languageOptions: {
      globals: globals.browser
    },
    plugins: {
      import: importPlugin,
      html: htmlPlugin,
      prettier: prettierPlugin
    },
    files: ["**/*.html"],
    rules: {
      "no-console": "warn", // Warns on console.log() statements
      "no-unused-vars": "warn", // Warns on unused variables
      "import/no-unresolved": "error", // Ensures all imports resolve
      "import/named": "error",
      "import/default": "error",
      "import/namespace": "error"
    },
    
  },
];


