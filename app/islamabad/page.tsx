import type { Metadata } from "next";
import CityLanding from "@/components/sections/CityLanding";
import { CITIES } from "@/lib/site";

export const metadata: Metadata = {
  title: "Car Rental in Islamabad",
  description:
    "Rent a car in Islamabad — budget to luxury, with driver or self-drive. Delivery across F-6, F-7, Blue Area and DHA Phase 2.",
};

const city = CITIES[2];

const routes = [
  "Islamabad Int'l Airport ↔ City",
  "Blue Area ↔ F-7",
  "G-9 ↔ E-11",
  "Sector D-12 ↔ Bani Gala",
];

export default function IslamabadPage() {
  return (
    <CityLanding
      city={city}
      routes={routes}
      tagline="Effortless travel through the capital — clean cars, courteous drivers and on-time pickups across every sector."
    />
  );
}