import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";

export default function NotFound() {
  return (
    <main className="flex flex-1 items-center justify-center px-4 py-24">
      <div className="flex max-w-md flex-col items-center text-center">
        <Logo size={56} className="mb-6" />
        <p className="text-sm font-medium text-muted-foreground">404</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight">
          We couldn&rsquo;t find that page.
        </h1>
        <p className="mt-3 text-muted-foreground">
          The link might be stale, or you may have typed it. Either way, the
          home page is one click away.
        </p>
        <div className="mt-6 flex gap-2">
          <Button asChild>
            <Link href="/">Home</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/docs">Docs</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
