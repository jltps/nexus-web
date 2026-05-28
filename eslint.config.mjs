import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "node_modules/**",
  ]),
  {
    rules: {
      // We control our own copy. Apostrophes/quotes in JSX text are valid
      // and readable — escaping them every time hurts more than it helps.
      "react/no-unescaped-entities": "off",
      // Allow <a href> inside the error boundary so it works even if the
      // app router is in an error state (Link relies on the client router).
      "@next/next/no-html-link-for-pages": "off",
      // next-themes' canonical "have we mounted?" pattern uses
      // useEffect + setState. The React 19 rule flags this as
      // potentially cascading, but it's a one-shot bool and is the
      // documented workaround for hydration mismatch. Allow it.
      "react-hooks/set-state-in-effect": "off",
    },
  },
]);

export default eslintConfig;
