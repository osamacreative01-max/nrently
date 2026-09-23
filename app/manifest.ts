import type { MetadataRoute } from "next";
import { BRAND_NAME, BRAND_TAGLINE } from "@/lib/site";

const accent = "#E31E24";
const night = "#0a0a0a";

// PWA manifest — everything here is REAL brand data (no invented facts).
// Icons reuse the existing uploaded logo asset so nothing is fabricated.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${BRAND_NAME}.pk — ${BRAND_TAGLINE}`,
    short_name: BRAND_NAME,
    description: `${BRAND_TAGLINE}. Book premium rental cars across Pakistan on WhatsApp.`,
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: night,
    theme_color: accent,
    orientation: "portrait-primary",
    categories: ["travel", "automotive", "business"],
    icons: [
      {
        src: "/logo.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/logo.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
