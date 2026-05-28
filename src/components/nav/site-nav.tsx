import Link from "next/link";
import { Logo } from "@/components/logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";

const navLinks = [
  { href: "/download", label: "Download" },
  { href: "/docs", label: "Docs" },
  { href: "/roadmap", label: "Roadmap" },
  { href: "/changelog", label: "Changelog" },
];

export function SiteNav() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link
          href="/"
          className="flex items-center gap-2 font-semibold tracking-tight"
        >
          <Logo size={24} />
          <span className="text-base">Nexus</span>
        </Link>
        <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
          {navLinks.map((l) => (
            <Button asChild variant="ghost" size="sm" key={l.href}>
              <Link href={l.href}>{l.label}</Link>
            </Button>
          ))}
        </nav>
        <div className="flex items-center gap-1">
          <ThemeToggle />
          <Button asChild size="sm" className="hidden sm:inline-flex">
            <Link href="/download">Get Nexus</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
