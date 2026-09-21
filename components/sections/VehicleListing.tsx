import { MessageCircle } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { Stagger, StaggerItem } from "@/components/ui/Stagger";
import VehicleCard from "@/components/VehicleCard";
import { WHATSAPP_URL, type Vehicle } from "@/lib/site";

interface VehicleListingProps {
  eyebrow: string;
  title: string;
  subtitle: string;
  vehicles: Vehicle[];
  vehiclesClassName?: string;
}

export default function VehicleListing({
  eyebrow,
  title,
  subtitle,
  vehicles,
  vehiclesClassName,
}: VehicleListingProps) {
  if (vehicles.length === 0) {
    return (
      <section className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 lg:px-8">
        <p className="text-slate">More vehicles arriving soon.</p>
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 font-display text-sm font-semibold text-white"
        >
          <MessageCircle className="h-4 w-4" />
          Ask about availability
        </a>
      </section>
    );
  }

  return (
    <section>
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <SectionHeading eyebrow={eyebrow} title={title} subtitle={subtitle} />
        <Stagger
          className={`mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 ${
            vehiclesClassName ?? ""
          }`}
        >
          {vehicles.map((vehicle) => (
            <StaggerItem key={vehicle.id}>
              <VehicleCard
                vehicle={vehicle}
                categoryLabel={
                  vehicle.category === "vans" ? "Vans & Coasters" : vehicle.category
                }
              />
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}