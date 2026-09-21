import type { Metadata } from "next";
import DestinationsGrid from "@/components/sections/DestinationsGrid";
import CityHighlights from "@/components/sections/CityHighlights";
import HowItWorks from "@/components/sections/HowItWorks";
import ContactCta from "@/components/sections/ContactCta";
import PageHero from "@/components/PageHero";
import { Stagger, StaggerItem } from "@/components/ui/Stagger";
import { CITIES } from "@/lib/site";

export const metadata: Metadata = {
  title: "Location & Coverage",
  description:
    "Nrently car rental coverage across Pakistan — customer centres in Karachi, Lahore and Islamabad, plus Multan and Sukkur.",
};

export default function LocationPage() {
  return (
    <>
      <PageHero
        eyebrow="Coverage"
        title="Wherever the road takes you"
        subtitle="Customer centres in the three major cities, with fleet delivery available for outstation hires across Pakistan."
        image="/images/TOYOTA Fortuner-Photoroom.png"
        imageAlt="Toyota Fortuner rental car"
      />
      <DestinationsGrid />
      <CityHighlights cityName="Pakistan" />

      <section className="bg-[#121212] py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center font-display text-2xl font-bold text-white sm:text-3xl">
            Areas served in detail
          </h2>
          <Stagger className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {CITIES.map((city) => (
              <StaggerItem key={city.id}>
                <div className="h-full rounded-2xl border border-line bg-[#121212] p-5">
                  <h3 className="font-display text-lg font-bold text-white">
                    {city.name}
                  </h3>
                  <ul className="mt-3 space-y-1.5 text-sm text-slate">
                    {city.areas.map((area) => (
                      <li key={area} className="leading-relaxed">
                        • {area}
                      </li>
                    ))}
                  </ul>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <HowItWorks />
      <ContactCta />
    </>
  );
}