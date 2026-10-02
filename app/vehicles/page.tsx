import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import VehicleFilter from "@/components/VehicleFilter";
import RentalSearchSummary from "@/components/RentalSearchSummary";
import ContactCta from "@/components/sections/ContactCta";
import { parseRentalSearch } from "@/lib/search";
import { pageMetadata } from "@/lib/seo";

type PageSearchParams = Record<string, string | string[] | undefined>;

export const metadata: Metadata = pageMetadata({
  title: "Car Rental Fleet in Pakistan",
  description:
    "Browse car rentals in Karachi and Pakistan: budget cars, sedans, luxury vehicles, SUVs, vans and coasters with daily rates.",
  path: "/vehicles",
});

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
        title="Car Rental Fleet in Pakistan"
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
