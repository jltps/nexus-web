import type { MetadataRoute } from "next";
import { docsAllHrefs } from "@/components/docs/docs-nav";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://nexus-web.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const marketing = [
    "/",
    "/download",
    "/privacy",
    "/terms",
    "/changelog",
    "/roadmap",
    "/about",
  ];
  const docs = docsAllHrefs;
  const all = Array.from(new Set([...marketing, ...docs]));
  return all.map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: now,
    changeFrequency: path === "/changelog" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : path === "/download" ? 0.9 : 0.6,
  }));
}
