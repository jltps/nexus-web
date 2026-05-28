import { SiteNav } from "@/components/nav/site-nav";
import { SiteFooter } from "@/components/footer/site-footer";
import { DocsSidebar } from "@/components/docs/docs-sidebar";
import { docsSections } from "@/components/docs/docs-nav";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SiteNav />
      <div className="mx-auto flex max-w-6xl flex-1 gap-8 px-4 py-10 sm:px-6">
        <aside className="hidden w-60 shrink-0 md:block">
          <DocsSidebar sections={docsSections} />
        </aside>
        <article className="min-w-0 flex-1 pb-16">{children}</article>
      </div>
      <SiteFooter />
    </>
  );
}
