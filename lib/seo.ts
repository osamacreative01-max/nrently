import type { Metadata } from "next";
import { BRAND_NAME, SITE_URL } from "@/lib/site";

export const DEFAULT_OG_IMAGE = {
  url: `${SITE_URL}/images/MERCEDES%20S%20Class%20-%20S400.png`,
  width: 800,
  height: 800,
  alt: "Nrently — premium rental car fleet",
};

interface PageMetadataOptions {
  title: string;
  description: string;
  path: string;
  image?: { url: string; width?: number; height?: number; alt?: string };
}

export function pageMetadata({
  title,
  description,
  path,
  image = DEFAULT_OG_IMAGE,
}: PageMetadataOptions): Metadata {
  const fullTitle = `${title} | ${BRAND_NAME}.pk`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: fullTitle,
      description,
      url: path === "/" ? SITE_URL : `${SITE_URL}${path}`,
      siteName: `${BRAND_NAME}.pk`,
      type: "website",
      locale: "en_PK",
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image.url],
    },
  };
}