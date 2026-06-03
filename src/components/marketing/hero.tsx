import Link from "next/link";
import { Download, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Logo } from "@/components/logo";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto flex max-w-5xl flex-col items-center px-4 pb-12 pt-16 text-center sm:px-6 sm:pt-24">
        <Logo size={56} className="mb-6" />
        <Badge variant="muted" className="mb-6 rounded-full px-3 py-1">
          Windows & macOS · Local-first · Bot-free
        </Badge>
        <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
          Capture your full meeting.
          <br />
          <span className="text-primary">Never let a bot join the call.</span>
        </h1>
        <p className="mt-6 max-w-2xl text-balance text-lg text-muted-foreground sm:text-xl">
          Nexus is a privacy-first meeting notepad for Windows and macOS. It
          listens to
          what your computer hears, transcribes live, and turns your rough
          notes into structured key points — without a bot ever joining the
          meeting and without storing a single second of audio.
        </p>
        <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row">
          <Button asChild size="xl">
            <Link href="/download">
              <Download className="mr-2 size-4" />
              Download
            </Link>
          </Button>
          <Button asChild size="xl" variant="outline">
            <Link href="/docs">
              <BookOpen className="mr-2 size-4" />
              Read the docs
            </Link>
          </Button>
        </div>
        <p className="mt-5 text-xs text-muted-foreground">
          Free. Works with Zoom, Teams, Meet, Slack huddles, and plain VoIP.
        </p>
      </div>
    </section>
  );
}
