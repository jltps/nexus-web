import { cn } from "@/lib/utils";

/** Tailwind v4's `prose` typography is opt-in. We hand-roll a tiny ruleset
 *  because we don't want the plugin's defaults: headings should pick up our
 *  semibold + tight tracking, links should be primary, code should use
 *  the muted surface, lists should re-emerge from the preflight reset. */
export function Prose({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "max-w-none text-[15px] leading-7 text-foreground",
        "[&>*+*]:mt-4",
        "[&_h1]:mt-0 [&_h1]:mb-4 [&_h1]:text-3xl [&_h1]:font-semibold [&_h1]:tracking-tight",
        "[&_h2]:mt-10 [&_h2]:mb-3 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:tracking-tight",
        "[&_h3]:mt-8 [&_h3]:mb-2 [&_h3]:text-base [&_h3]:font-semibold",
        "[&_p]:text-muted-foreground [&_p]:leading-7",
        "[&_a]:text-primary [&_a:hover]:underline",
        "[&_strong]:text-foreground [&_strong]:font-semibold",
        "[&_ul]:list-disc [&_ul]:pl-6 [&_ul]:text-muted-foreground [&_ul_li]:mt-1.5",
        "[&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:text-muted-foreground [&_ol_li]:mt-1.5",
        "[&_code]:rounded [&_code]:bg-muted [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:text-[0.85em] [&_code]:font-mono",
        "[&_pre]:overflow-x-auto [&_pre]:rounded-md [&_pre]:bg-muted [&_pre]:p-4 [&_pre]:text-sm",
        "[&_pre_code]:bg-transparent [&_pre_code]:p-0",
        "[&_blockquote]:border-l-2 [&_blockquote]:border-border [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-muted-foreground",
        "[&_hr]:my-8 [&_hr]:border-border",
        className,
      )}
    >
      {children}
    </div>
  );
}
