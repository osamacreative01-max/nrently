import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import RouteTransition from "@/components/RouteTransition";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import { BRAND_NAME, BRAND_TAGLINE } from "@/lib/site";

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

export const metadata: Metadata = {
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
  openGraph: {
    title: `${BRAND_NAME}.pk — ${BRAND_TAGLINE}`,
    description: `${BRAND_TAGLINE}. Book premium rental cars across Pakistan on WhatsApp.`,
    type: "website",
    locale: "en_PK",
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