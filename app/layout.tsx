import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import RouteTransition from "@/components/RouteTransition";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import { BRAND_NAME, BRAND_TAGLINE, SITE_URL } from "@/lib/site";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

const ogImage = {
  url: `${SITE_URL}/images/MERCEDES%20S%20Class%20-%20S400.png`,
  width: 800,
  height: 800,
  alt: `${BRAND_NAME} — luxurious rental fleet`,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${BRAND_NAME}.pk — ${BRAND_TAGLINE}`,
    template: `%s | ${BRAND_NAME}.pk`,
  },
  description:
    "Best car rental services in Karachi — budget to luxury, with or without chauffeur. Book your ride on WhatsApp in minutes.",
  keywords: [
    "car rental Karachi",
    "rent a car in Karachi",
    "car rental services in Karachi",
    "luxury car rental",
    "wedding car hire",
    "Nrently",
  ],
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    siteName: `${BRAND_NAME}.pk`,
    title: `${BRAND_NAME}.pk — ${BRAND_TAGLINE}`,
    description: `${BRAND_TAGLINE}. Book premium rental cars across Pakistan on WhatsApp.`,
    url: SITE_URL,
    type: "website",
    locale: "en_PK",
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title: `${BRAND_NAME}.pk — ${BRAND_TAGLINE}`,
    description: `${BRAND_TAGLINE}. Book premium rental cars across Pakistan on WhatsApp.`,
    images: [ogImage.url],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning
        className={`${inter.variable} ${poppins.variable} bg-cream text-ink antialiased`}
      >
        <SmoothScroll />
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <WhatsAppFloat />
        <RouteTransition />
      </body>
    </html>
  );
}