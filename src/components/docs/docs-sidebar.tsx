"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export interface DocLink {
  href: string;
  label: string;
}
export interface DocSection {
  title: string;
  links: DocLink[];
}

export function DocsSidebar({ sections }: { sections: DocSection[] }) {
  const pathname = usePathname();
  return (
    <nav
      aria-label="Docs"
      className="sticky top-16 max-h-[calc(100vh-4rem)] overflow-y-auto pb-12 pr-4 text-sm"
    >
      {sections.map((s) => (
        <div key={s.title} className="mb-6">
          <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {s.title}
          </div>
          <ul className="space-y-1">
            {s.links.map((l) => {
              const active = pathname === l.href;
              return (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className={cn(
                      "block rounded-md px-2 py-1.5 text-sm transition-colors",
                      active
                        ? "bg-primary/10 font-medium text-primary"
                        : "text-muted-foreground hover:bg-accent hover:text-foreground",
                    )}
                  >
                    {l.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}
