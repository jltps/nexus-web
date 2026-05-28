"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Monitor, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

/** Cycles light → dark → system. Tiny inline label keeps the action discoverable
 *  without dropdown JS. Renders nothing meaningful before mount to avoid hydration
 *  mismatch (next-themes pattern). */
export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);

  const next = theme === "light" ? "dark" : theme === "dark" ? "system" : "light";
  const Icon = !mounted
    ? Sun
    : resolvedTheme === "dark"
      ? Moon
      : theme === "system"
        ? Monitor
        : Sun;

  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label={`Switch theme (current: ${mounted ? theme : "system"})`}
      onClick={() => setTheme(next)}
    >
      <Icon className="size-4" />
    </Button>
  );
}
