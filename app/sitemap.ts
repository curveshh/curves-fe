import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/seo";

const publicPages: Array<{
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
}> = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/about", changeFrequency: "monthly", priority: 0.8 },
  { path: "/program", changeFrequency: "monthly", priority: 0.9 },
  { path: "/club", changeFrequency: "weekly", priority: 0.9 },
  { path: "/price", changeFrequency: "monthly", priority: 0.8 },
  { path: "/news", changeFrequency: "weekly", priority: 0.9 },
  { path: "/contact", changeFrequency: "monthly", priority: 0.7 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return publicPages.map(({ path, changeFrequency, priority }) => ({
    url: new URL(path, siteUrl).toString(),
    changeFrequency,
    priority,
  }));
}
