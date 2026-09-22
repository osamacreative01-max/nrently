import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import VehicleFilter from "@/components/VehicleFilter";
import RentalSearchSummary from "@/components/RentalSearchSummary";
import ContactCta from "@/components/sections/ContactCta";
import { parseRentalSearch } from "@/lib/search";

type PageSearchParams = Record<string, string | string[] | undefined>;

export const metadata: Metadata = {
  title: "Vehicles",
  description:
    "Browse the complete Nrently fleet — budget, standard, luxury, SUV and vans & coasters with transparent daily rates.",
  alternates: {
    canonical: "/vehicles",
  },
};

export default async function VehiclesPage({
  searchParams,
}: {
  searchParams: Promise<PageSearchParams>;
}) {
  const search = parseRentalSearch(await searchParams);

  return (
    <>
      <PageHero
        eyebrow="Our Fleet"
        title="Every ride, one rental company"
        subtitle="Filter the full Nrently fleet by category. Serviced, insured and delivered clean to your door."
        image="/images/TOYOTA Fortuner-Photoroom.png"
        imageAlt="Nrently vehicle fleet"
      />
      <RentalSearchSummary search={search} />
      <VehicleFilter search={search} />
      <ContactCta />
    </>
  );
}
