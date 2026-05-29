import Link from "next/link";
import { Logo } from "@/components/logo";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border/60 py-10 text-sm text-muted-foreground">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 sm:px-6 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2">
          <Logo size={20} />
          <span className="font-semibold text-foreground">Nexus</span>
          <span className="hidden md:inline">·</span>
          <span className="hidden md:inline">
            Bot-free meeting notepad for Windows
          </span>
        </div>
        <nav className="flex flex-wrap gap-x-6 gap-y-2" aria-label="Footer">
          <Link href="/privacy" className="hover:text-foreground">
            Privacy
          </Link>
          <Link href="/terms" className="hover:text-foreground">
            Terms
          </Link>
          <Link href="/docs" className="hover:text-foreground">
            Docs
          </Link>
          <Link href="/roadmap" className="hover:text-foreground">
            Roadmap
          </Link>
          <Link href="/changelog" className="hover:text-foreground">
            Changelog
          </Link>
          <Link href="/about" className="hover:text-foreground">
            About
          </Link>
        </nav>
      </div>
    </footer>
  );
}
