import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import VehicleListing from "@/components/sections/VehicleListing";
import ContactCta from "@/components/sections/ContactCta";
import { VEHICLES, categoryFrom, formatPKR } from "@/lib/site";

const fromPrice = formatPKR(categoryFrom("vans"));

export const metadata: Metadata = {
  title: "Vans & Coasters",
  description: `Vans and coasters for group travel in Pakistan — Toyota Hiace 15-seater and Saloon 4C 28-seater hire from ${fromPrice}/day.`,
  alternates: {
    canonical: "/vans-and-coasters",
  },
};

const vehicles = VEHICLES.filter((v) => v.category === "vans");

export default function VansPage() {
  return (
    <>
      <PageHero
        eyebrow="Vans & Coasters"
        title="Moving bigger groups, beautifully"
        subtitle={`Spacious passenger vans and full-size coasters for weddings, outings and corporate travel — from ${fromPrice}/day.`}
        image="/images/changan karvaan-Photoroom.png"
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