import Link from "next/link";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CTA() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-3xl rounded-2xl border bg-card px-6 py-12 text-center shadow-xs sm:px-12">
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Bring meeting notes back to your machine.
        </h2>
        <p className="mt-3 text-muted-foreground">
          Free, native Windows installer. No accounts, no signup, no bots.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button asChild size="xl">
            <Link href="/download">
              <Download className="mr-2 size-4" />
              Download
            </Link>
          </Button>
          <Button asChild size="xl" variant="ghost">
            <Link href="/docs/getting-started">How it works</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
