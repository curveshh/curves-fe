import type { Metadata } from "next";

const configuredSiteUrl =
  process.env.SITE_URL ??
  process.env.NEXT_PUBLIC_SITE_URL ??
  "https://curves.com.vn";

/**
 * The public origin used for canonical URLs,
 * robots.txt, sitemap.xml, and Open Graph.
 */
export const siteUrl = new URL(configuredSiteUrl);

export const siteName = "Curves Vietnam";

export type PageMetadataInput = {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  image?: string;
};

export function createPageMetadata({
  title,
  description,
  path,
  keywords = [],
  image = "/images/og-default.jpg",
}: PageMetadataInput): Metadata {
  const canonical = new URL(path, siteUrl).toString();
  const imageUrl = new URL(image, siteUrl).toString();

  return {
    metadataBase: siteUrl,

    title,
    description,
    keywords,

    alternates: {
      canonical,
    },

    openGraph: {
      type: "website",
      locale: "vi_VN",
      siteName,
      title,
      description,
      url: canonical,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },

    robots: {
      index: true,
      follow: true,
    },
  };
}
