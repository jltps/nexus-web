"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log to the server-side error path. We do not send to any third-party.
    console.error("[nexus-web] runtime error", error);
  }, [error]);

  return (
    <main className="flex flex-1 items-center justify-center px-4 py-24">
      <div className="flex max-w-md flex-col items-center text-center">
        <Logo size={56} className="mb-6" />
        <h1 className="text-3xl font-semibold tracking-tight">
          Something went wrong.
        </h1>
        <p className="mt-3 text-muted-foreground">
          That&rsquo;s on us, not you. Try again — or head back home.
        </p>
        {error.digest ? (
          <p className="mt-2 text-xs font-mono text-muted-foreground">
            Ref: {error.digest}
          </p>
        ) : null}
        <div className="mt-6 flex gap-2">
          <Button onClick={() => reset()}>Try again</Button>
          <Button asChild variant="outline">
            <a href="/">Home</a>
          </Button>
        </div>
      </div>
    </main>
  );
}
