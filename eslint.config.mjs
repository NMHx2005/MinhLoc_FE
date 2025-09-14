import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      // Next.js specific rules
      "@next/next/no-img-element": "error",
      "@next/next/no-html-link-for-pages": "error",
      
      // React rules
      "react/no-unescaped-entities": "off",
      "react/prop-types": "off",
      "react/react-in-jsx-scope": "off",
      
      // TypeScript rules
      "@typescript-eslint/no-unused-vars": ["error", { 
        "argsIgnorePattern": "^_",
        "varsIgnorePattern": "^_" 
      }],
      "@typescript-eslint/no-explicit-any": "warn",
      
      // General rules
      "no-console": ["warn", { "allow": ["warn", "error"] }],
      "no-debugger": "error",
      "prefer-const": "error",
      "no-var": "error",
      
      // Import rules - Temporarily disabled for build
      // "import/order": [
      //   "error",
      //   {
      //     "groups": [
      //       "builtin",
      //       "external", 
      //       "internal",
      //       "parent",
      //       "sibling",
      //       "index"
      //     ],
      //     "newlines-between": "always",
      //     "alphabetize": {
      //       "order": "asc",
      //       "caseInsensitive": true
      //     }
      //   }
      // ],
    },
  },
];

export default eslintConfig;