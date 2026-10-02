import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import VehicleListing from "@/components/sections/VehicleListing";
import ContactCta from "@/components/sections/ContactCta";
import { VEHICLES, categoryFrom, formatPKR } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

const fromPrice = formatPKR(categoryFrom("vans"));

export const metadata: Metadata = pageMetadata({
  title: "Van & Coaster Rental in Karachi",
  description: `Book a Toyota Hiace or Saloon 4C in Karachi for group travel, weddings and events. 15- and 28-seat vans from ${fromPrice}/day.`,
  path: "/vans-and-coasters",
});

const vehicles = VEHICLES.filter((v) => v.category === "vans");

export default function VansPage() {
  return (
    <>
      <PageHero
        eyebrow="Vans & Coasters"
        title="Vans & Coasters for Rent in Pakistan"
        subtitle={`Spacious passenger vans and full-size coasters for weddings, outings and corporate travel — from ${fromPrice}/day.`}
        image="/images/changan-karvaan.webp"
        imageAlt="Changan Karvaan van rental"
      />
      <VehicleListing
        eyebrow="Vans & Coasters"
        title="Group travel made simple"
        subtitle="Comfortable seating from 15 to 28 guests with generous luggage space — with or without a driver."
        vehicles={vehicles}
      />
      <ContactCta />
    </>
  );
}