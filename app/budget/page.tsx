import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import VehicleListing from "@/components/sections/VehicleListing";
import ContactCta from "@/components/sections/ContactCta";
import { VEHICLES, categoryFrom, formatPKR } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

const fromPrice = formatPKR(categoryFrom("budget"));

export const metadata: Metadata = pageMetadata({
  title: "Budget Vehicles",
  description: `Affordable budget car rental in Karachi and Pakistan — Suzuki Cultus, Wagon R, Alto and Daihatsu Mira from ${fromPrice}/day.`,
  path: "/budget",
});

const vehicles = VEHICLES.filter((v) => v.category === "budget");

export default function BudgetPage() {
  return (
    <>
      <PageHero
        eyebrow="Budget Fleet"
        title="Budget Car Rental in Karachi"
        subtitle={`Fuel-efficient Suzuki Cultus, Wagon R, Alto and Daihatsu Mira that keep your budget on the road — from ${fromPrice}/day.`}
        image="/images/Mira-ES-1024x735-Photoroom.png"
        imageAlt="Daihatsu Mira budget rental car"
        imageClassName="scale-125"
      />
      <VehicleListing
        eyebrow="Budget"
        title="Economical, reliable city cars"
        subtitle="Perfect for daily commutes, quick errands and exploring the city without burning a hole in your pocket."
        vehicles={vehicles}
      />
      <ContactCta />
    </>
  );
}