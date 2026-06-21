/** Abstract, on-brand placeholder for a product screenshot. Built from
 *  semantic tokens only (no literal colors, no gradients beyond the logo,
 *  no fake copy) so it reads as a stylized app frame rather than a real
 *  capture. Decorative — hidden from assistive tech. Swap the inner panels
 *  for a real <img src="/screenshots/…"> once captures exist (BRAND §8). */
export function ProductVisual() {
  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6">
      <div
        aria-hidden="true"
        className="overflow-hidden rounded-xl border bg-card shadow-md"
      >
        {/* Title bar */}
        <div className="flex items-center gap-2 border-b bg-muted/40 px-4 py-3">
          <span className="size-2.5 rounded-full bg-muted-foreground/30" />
          <span className="size-2.5 rounded-full bg-muted-foreground/30" />
          <span className="size-2.5 rounded-full bg-muted-foreground/30" />
          <span className="ml-3 h-3 w-40 rounded bg-muted-foreground/15" />
        </div>

        {/* Three-pane app body: meeting list · notes · transcript */}
        <div className="grid grid-cols-[1fr] gap-px bg-border sm:grid-cols-[180px_1fr_200px]">
          {/* Meeting list */}
          <div className="hidden flex-col gap-3 bg-card p-4 sm:flex">
            <div className="h-2.5 w-20 rounded bg-muted-foreground/20" />
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex flex-col gap-1.5">
                <div className="h-2 w-full rounded bg-muted" />
                <div className="h-2 w-2/3 rounded bg-muted" />
              </div>
            ))}
          </div>

          {/* Notes column — primary-tinted bars stand in for AI key points */}
          <div className="flex flex-col gap-3 bg-card p-5">
            <div className="h-3 w-1/2 rounded bg-muted-foreground/25" />
            <div className="mt-1 flex items-center gap-2">
              <span className="size-3 rounded-sm bg-primary/30" />
              <div className="h-2.5 w-3/4 rounded bg-muted" />
            </div>
            <div className="flex items-center gap-2">
              <span className="size-3 rounded-sm bg-primary/30" />
              <div className="h-2.5 w-2/3 rounded bg-muted" />
            </div>
            <div className="flex items-center gap-2">
              <span className="size-3 rounded-sm bg-primary/30" />
              <div className="h-2.5 w-4/5 rounded bg-muted" />
            </div>
            <div className="mt-2 h-2.5 w-full rounded bg-muted" />
            <div className="h-2.5 w-5/6 rounded bg-muted" />
            <div className="h-2.5 w-2/3 rounded bg-muted" />
          </div>

          {/* Transcript column — speaker-tinted rows */}
          <div className="hidden flex-col gap-3 bg-card p-4 lg:flex">
            <div className="h-2.5 w-16 rounded bg-muted-foreground/20" />
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="flex items-start gap-2">
                <span
                  className={`mt-0.5 size-2.5 shrink-0 rounded-full ${
                    i % 2 === 0 ? "bg-primary/40" : "bg-info/40"
                  }`}
                />
                <div className="flex w-full flex-col gap-1">
                  <div className="h-2 w-full rounded bg-muted" />
                  <div className="h-2 w-1/2 rounded bg-muted" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
