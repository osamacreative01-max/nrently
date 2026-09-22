import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import VehicleListing from "@/components/sections/VehicleListing";
import ContactCta from "@/components/sections/ContactCta";
import { VEHICLES, categoryFrom, formatPKR } from "@/lib/site";

const fromPrice = formatPKR(categoryFrom("suv"));

export const metadata: Metadata = {
  title: "SUV Vehicles",
  description: `SUV and 4x4 hire in Pakistan — Toyota Land Cruiser, Prado and Fortuner from ${fromPrice}/day.`,
  alternates: {
    canonical: "/suv",
  },
};

const vehicles = VEHICLES.filter((v) => v.category === "suv");

export default function SuvPage() {
  return (
    <>
      <PageHero
        eyebrow="SUV Fleet"
        title="Go where the road goes"
        subtitle={`Commanding 4x4s and seven-seat SUVs built for motorways and northern hills — from ${fromPrice}/day.`}
        image="/images/TOYOTA LC 300-Photoroom.png"
        imageAlt="Toyota Land Cruiser SUV rental"
      />
      <VehicleListing
        eyebrow="SUV"
        title="Power, space and presence"
        subtitle="Ideal for family road trips, corporate escorts and rough terrain. Diesel 4x4s available on request."
        vehicles={vehicles}
      />
      <ContactCta />
    </>
  );
}