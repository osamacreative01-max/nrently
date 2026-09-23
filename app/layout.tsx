import type { Metadata, Viewport } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import RouteTransition from "@/components/RouteTransition";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import { BRAND_NAME, BRAND_TAGLINE, CITIES, EMAIL, PHONE_INTL, SITE_URL } from "@/lib/site";

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

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#0a0a0a",
  colorScheme: "dark",
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
    <html lang="en-PK">
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

        {/* Sitewide structured data — real business data only (no invented facts) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "CarRental",
              name: `${BRAND_NAME}.pk`,
              url: SITE_URL,
              slogan: BRAND_TAGLINE,
              description:
                "Car rental services across Pakistan — budget to luxury, with driver, delivered clean and on time.",
              email: EMAIL,
              telephone: PHONE_INTL,
              priceRange: "PKR 4,200 – PKR 22,000 /day",
              image: `${SITE_URL}/images/MERCEDES%20S%20Class%20-%20S400.png`,
              logo: `${SITE_URL}/logo.png`,
              address: {
                "@type": "PostalAddress",
                streetAddress:
                  "Shahrah e Faisal Near Airport Road, Faisal Cantonment",
                addressLocality: "Karachi",
                addressCountry: "PK",
              },
              areaServed: CITIES.map((c) => c.name),
              contactPoint: {
                "@type": "ContactPoint",
                contactType: "customer service",
                telephone: PHONE_INTL,
                email: EMAIL,
                areaServed: "PK",
                availableLanguage: "English",
              },
              sameAs: ["https://www.facebook.com/share/1L5rE5ZQyJ/"],
            }),
          }}
        />
      </body>
    </html>
  );
}