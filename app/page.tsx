import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import BookingCard from "@/components/sections/BookingCard";
import ValuesGrid from "@/components/sections/ValuesGrid";
import CategoryGrid from "@/components/sections/CategoryGrid";
import AboutPreview from "@/components/sections/AboutPreview";
import VehicleListing from "@/components/sections/VehicleListing";
import HowItWorks from "@/components/sections/HowItWorks";
import EventsGrid from "@/components/sections/EventsGrid";
import ReviewsGrid from "@/components/sections/ReviewsGrid";
import DestinationsGrid from "@/components/sections/DestinationsGrid";
import FaqSection from "@/components/sections/FaqSection";
import ContactCta from "@/components/sections/ContactCta";
import { VEHICLES } from "@/lib/site";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
};

const POPULAR_VEHICLES = [
  VEHICLES.find((v) => v.category === "budget"),
  VEHICLES.find((v) => v.category === "standard"),
  VEHICLES.find((v) => v.category === "luxury"),
  VEHICLES.find((v) => v.category === "suv"),
  VEHICLES.find((v) => v.category === "vans"),
  VEHICLES[0],
].filter((v): v is NonNullable<typeof v> => v !== undefined);

export default function Home() {
  return (
    <>
      <Hero />
      <BookingCard />
      <ValuesGrid />
      <CategoryGrid />
      <VehicleListing
        eyebrow="Popular Cars"
        title="The rides drivers love most"
        subtitle="A hand-picked line-up across every class — each one serviced, insured and delivered clean."
        vehicles={POPULAR_VEHICLES}
        vehiclesClassName="md:grid-cols-2 lg:grid-cols-3"
      />
      <HowItWorks />
      <EventsGrid />
      <AboutPreview />
      <ReviewsGrid />
      <DestinationsGrid />
      <FaqSection />
      <ContactCta />
    </>
  );
}