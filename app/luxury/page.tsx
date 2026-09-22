import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import VehicleListing from "@/components/sections/VehicleListing";
import ContactCta from "@/components/sections/ContactCta";
import { VEHICLES, categoryFrom, formatPKR } from "@/lib/site";

const fromPrice = formatPKR(categoryFrom("luxury"));

export const metadata: Metadata = {
  title: "Luxury Vehicles",
  description: `Luxury car rental in Pakistan — Mercedes-Benz CLA200 and S400, Audi A4 and A5 for weddings and VIP travel. Prices from ${fromPrice}/day.`,
  alternates: {
    canonical: "/luxury",
  },
};

const vehicles = VEHICLES.filter((v) => v.category === "luxury");

export default function LuxuryPage() {
  return (
    <>
      <PageHero
        eyebrow="Luxury Fleet"
        title="Arrive like it matters"
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