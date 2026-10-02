import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import VehicleListing from "@/components/sections/VehicleListing";
import ContactCta from "@/components/sections/ContactCta";
import { VEHICLES, categoryFrom, formatPKR } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

const fromPrice = formatPKR(categoryFrom("luxury"));

export const metadata: Metadata = pageMetadata({
  title: "Luxury Car Rental in Karachi",
  description: `Book a luxury car in Karachi — Mercedes-Benz, Audi A4 and A5 for weddings, airport transfers and VIP travel. From ${fromPrice}/day.`,
  path: "/luxury",
});

const vehicles = VEHICLES.filter((v) => v.category === "luxury");

export default function LuxuryPage() {
  return (
    <>
      <PageHero
        eyebrow="Luxury Fleet"
        title="Luxury Cars for Rent in Pakistan"
        subtitle={`Mercedes-Benz and Audi executive sedans with chauffeur options — the first impression you can drive to — from ${fromPrice}/day.`}
        image="/images/MERCEDES S Class - S400.png"
        imageAlt="Mercedes S400 luxury rental car"
      />
      <VehicleListing
        eyebrow="Luxury"
        title="Executive class, delivered"
        subtitle="Perfect for weddings, valima nights, corporate VIPs and airport receptions. Chauffeur can be arranged on request."
        vehicles={vehicles}
      />
      <ContactCta />
    </>
  );
}