import Image from "next/image";
import { MessageCircle, Users, Clock, Fuel, Settings } from "lucide-react";
import { WHATSAPP_URL, type Vehicle } from "@/lib/site";

interface VehicleCardProps {
  vehicle: Vehicle;
  categoryLabel?: string;
}

export default function VehicleCard({ vehicle, categoryLabel }: VehicleCardProps) {
  return (
    <article className="group relative flex flex-col rounded-2xl border border-line bg-[#121212] pt-12 transition-all duration-500 hover:-translate-y-1.5 hover:border-white/20 hover:shadow-2xl hover:shadow-brand/10">
      {/* Car image — overflowing top edge */}
      <div className="relative -mt-16 mx-4 aspect-[16/10] overflow-visible">
        <Image
          src={vehicle.image}
          alt={vehicle.name}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-contain drop-shadow-[0_16px_32px_rgba(0,0,0,0.6)] transition-transform duration-700 group-hover:scale-105"
        />
        {vehicle.tag && (
          <span className="absolute left-2 top-2 rounded-full bg-accent px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-white shadow-lg z-10">
            {vehicle.tag}
          </span>
        )}
        {categoryLabel && (
          <span className="absolute right-2 top-2 rounded-full bg-night/70 px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-white backdrop-blur-sm z-10">
            {categoryLabel}
          </span>
        )}
      </div>

      {/* Card content */}
      <div className="flex flex-1 flex-col px-5 pt-4 pb-5">
        {/* Two-column layout: info + price */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
          {/* Left column — vehicle info */}
          <div className="flex flex-col gap-2.5">
            <h3 className="font-display text-lg font-bold leading-tight text-white">
              {vehicle.name}
            </h3>

            {/* Specs row */}
            <div className="flex items-center gap-3 text-xs text-slate">
              <span className="flex items-center gap-1">
                <Users className="h-3.5 w-3.5 text-accent" />
                {vehicle.seats} Seats
              </span>
              <span className="flex items-center gap-1">
                <Settings className="h-3.5 w-3.5 text-accent" />
                {vehicle.transmission}
              </span>
            </div>

            {/* Driver row */}
            <div className="flex items-center gap-3 text-xs text-slate">
              <span className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5 text-accent" />
                With Driver ({vehicle.driverHours} hrs)
              </span>
              <span className="flex items-center gap-1">
                <Fuel className="h-3.5 w-3.5 text-accent" />
                Overtime PKR {vehicle.overtimeRate}/hr
              </span>
            </div>
          </div>

          {/* Right column — price + CTA */}
          <div className="flex flex-col items-start gap-2 sm:items-end">
            <span className="text-[10px] font-medium uppercase tracking-wide text-accent">
              Best Price Rate Selected
            </span>
            <p className="sm:text-right">
              <span className="font-display text-xl font-bold text-white">
                PKR {vehicle.pricePerDay.toLocaleString()}
              </span>
              <span className="ml-0.5 text-xs text-slate">/day</span>
            </p>
          </div>
        </div>

        {/* CTA Button */}
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-accent px-4 py-3 font-display text-sm font-semibold text-white transition-all duration-300 hover:bg-accent/90 hover:shadow-lg hover:shadow-accent/30"
        >
          <MessageCircle className="h-4 w-4" /> With Driver
        </a>

        {/* Divider */}
        <div className="my-3 h-px w-full bg-line" />

        {/* Fuel note */}
        <p className="text-center text-[11px] text-slate">
          Refill fuel at the end of the day.
        </p>
      </div>
    </article>
  );
}
