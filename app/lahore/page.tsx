import type { Metadata } from "next";
import CityLanding from "@/components/sections/CityLanding";
import { CITIES } from "@/lib/site";

export const metadata: Metadata = {
  title: "Car Rental in Lahore",
  description:
    "Rent a car in Lahore — budget to luxury, with driver or self-drive. Doorstep delivery in Gulberg, DHA, Model Town and Johar Town.",
};

const city = CITIES[1];

const routes = [
  "Allama Iqbal Int'l Airport ↔ City",
  "Gulberg ↔ DHA",
  "Model Town ↔ Johar Town",
  "Liberty ↔ Mini Market",
];

export default function LahorePage() {
  return (
    <CityLanding
      city={city}
      routes={routes}
      tagline="Chase the best food in the city, shop at Liberty or roll out to the M-2 — Lahore rides best with Nrently."
    />
  );
}