import type { Metadata } from "next";
import CityLanding from "@/components/sections/CityLanding";
import CityHighlights from "@/components/sections/CityHighlights";
import { CITIES } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Car Rental in Karachi",
  description:
    "Rent a car in Karachi — budget to luxury, with driver or self-drive. Doorstep delivery in Clifton, DHA, Gulshan and at Jinnah Airport.",
  path: "/karachi",
});

const city = CITIES[0];

const routes = [
  "Jinnah Int'l Airport ↔ City",
  "Clifton ↔ DHA",
  "Saddar ↔ Gulshan",
  "Station ↔ Shahrah-e-Faisal",
];

export default function KarachiPage() {
  return (
    <>
      <CityLanding
        city={city}
        routes={routes}
        tagline="From seaside drives at Clifton Beach to on-time airport transfers, Karachi runs smoother with Nrently at the wheel."
      />
      <CityHighlights cityName="Karachi" />
    </>
  );
}