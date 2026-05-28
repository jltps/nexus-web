"use client";

import * as React from "react";
import { Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CopyButton({ value, label }: { value: string; label?: string }) {
  const [copied, setCopied] = React.useState(false);
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(value);
          setCopied(true);
          setTimeout(() => setCopied(false), 1500);
        } catch {
          /* clipboard blocked — silent */
        }
      }}
      aria-label={label ?? "Copy to clipboard"}
    >
      {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
      <span className="hidden sm:inline">{copied ? "Copied" : "Copy"}</span>
    </Button>
  );
}
