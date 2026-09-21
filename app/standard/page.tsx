import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import VehicleListing from "@/components/sections/VehicleListing";
import ContactCta from "@/components/sections/ContactCta";
import { VEHICLES } from "@/lib/site";

export const metadata: Metadata = {
  title: "Standard Vehicles",
  description:
    "Comfortable standard car rental in Pakistan — Toyota Corolla, Honda Civic and GLi from PKR 6,500/day.",
};

const vehicles = VEHICLES.filter((v) => v.category === "standard");

export default function StandardPage() {
  return (
    <>
      <PageHero
        eyebrow="Standard Fleet"
        title="Comfort for every mile"
        subtitle="Family sedans and saloons built for long drives and busy days — from PKR 6,500/day."
        image="/images/TOYOTA Corolla Altis-Photoroom.png"
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