import type { Metadata } from "next";
import localFont from "next/font/local";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

/* Self-hosted Geist (OFL) — bundled, same-origin, no third-party request. Sans
   drives UI/body; Mono drives numerics + code. next/font/local handles preload
   and font-display: swap, so first paint uses the system fallback (no CLS, no
   blocking). See docs/adr/0002-adopt-self-hosted-geist.md. */
const geistSans = localFont({
  src: "./fonts/Geist-Variable.woff2",
  variable: "--font-geist-sans",
  display: "swap",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMono-Variable.woff2",
  variable: "--font-geist-mono",
  display: "swap",
  weight: "100 900",
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://nexus-web.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Nexus — bot-free meeting notepad for Windows & macOS",
    template: "%s · Nexus",
  },
  description:
    "Capture your full meeting transcript without any bot joining the call. Nexus is a privacy-first, device-audio meeting notepad for Windows and macOS.",
  applicationName: "Nexus",
  authors: [{ name: "Nexus" }],
  keywords: [
    "meeting notes",
    "meeting transcription",
    "Windows",
    "macOS",
    "Mac meeting notes",
    "Zoom transcription",
    "Teams transcription",
    "no bot transcription",
    "AI meeting notes",
    "device audio",
    "Deepgram",
    "Whisper",
    "Claude",
  ],
  openGraph: {
    type: "website",
    siteName: "Nexus",
    title: "Nexus — bot-free meeting notepad for Windows & macOS",
    description:
      "Capture your full meeting transcript without any bot joining the call.",
    url: siteUrl,
  },
  twitter: {
    card: "summary_large_image",
    title: "Nexus — bot-free meeting notepad for Windows & macOS",
    description:
      "Capture your full meeting transcript without any bot joining the call.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body className="min-h-screen flex flex-col bg-background text-foreground">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
