import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import VehicleFilter from "@/components/VehicleFilter";
import ContactCta from "@/components/sections/ContactCta";

export const metadata: Metadata = {
  title: "Vehicles",
  description:
    "Browse the complete Nrently fleet — budget, standard, luxury, SUV and vans & coasters with transparent daily rates.",
};

export default function VehiclesPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Fleet"
        title="Every ride, one rental company"
        subtitle="Filter the full Nrently fleet by category. Serviced, insured and delivered clean to your door."
        image="/images/TOYOTA Fortuner-Photoroom.png"
        imageAlt="Nrently vehicle fleet"
      />
      <VehicleFilter />
      <ContactCta />
    </>
  );
}