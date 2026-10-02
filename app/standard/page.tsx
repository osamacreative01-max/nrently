import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import VehicleListing from "@/components/sections/VehicleListing";
import ContactCta from "@/components/sections/ContactCta";
import { VEHICLES, categoryFrom, formatPKR } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

const fromPrice = formatPKR(categoryFrom("standard"));

export const metadata: Metadata = pageMetadata({
  title: "Sedan Rental in Karachi",
  description: `Rent a sedan in Karachi — Toyota Corolla, Honda Civic and GLi from ${fromPrice}/day. Comfortable cars for family trips and business travel.`,
  path: "/standard",
});

const vehicles = VEHICLES.filter((v) => v.category === "standard");

export default function StandardPage() {
  return (
    <>
      <PageHero
        eyebrow="Standard Fleet"
        title="Standard Cars for Rent in Pakistan"
        subtitle={`Family sedans and saloons built for long drives and busy days — from ${fromPrice}/day.`}
        image="/images/Altis 2.png"
        imageAlt="Toyota Corolla standard rental car"
      />
      <VehicleListing
        eyebrow="Standard"
        title="The everyday workhorses"
        subtitle="Spacious cabins, smooth rides and dependable engines — ideal for family trips and business travel."
        vehicles={vehicles}
      />
      <ContactCta />
    </>
  );
}