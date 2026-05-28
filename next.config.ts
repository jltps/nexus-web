import type { NextConfig } from "next";

/** Content Security Policy.
 *
 * Mirrors the desktop app's posture: only `self` for scripts and styles
 * (Tailwind requires inline styles, so we allow them), self + data: for
 * images (favicons / OG images), and api.github.com for the updates
 * fetch. No third-party hosts.
 *
 * Kept on a single line per directive for grep-ability. */
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self' data:",
  "connect-src 'self' https://api.github.com https://objects.githubusercontent.com",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value:
      "accelerometer=(), camera=(), geolocation=(), microphone=(), payment=(), usb=()",
  },
  { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains" },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Images: only self-hosted. Disable remote pattern allowlist entirely.
  images: {
    remotePatterns: [],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
  async redirects() {
    return [
      { source: "/releases", destination: "/download", permanent: true },
      { source: "/download/latest", destination: "/download", permanent: false },
    ];
  },
};

export default nextConfig;
