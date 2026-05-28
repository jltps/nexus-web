"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

/** Wraps next-themes with Nexus defaults: system theme by default, applied
 *  via a `data-theme` attribute on <html> so it matches our CSS variables. */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="data-theme"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  );
}
