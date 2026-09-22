import Image from "next/image";
import Link from "next/link";
import { MessageCircle, Users, Clock, Fuel, Settings, Search } from "lucide-react";
import { WHATSAPP_URL, type Vehicle } from "@/lib/site";
import {
  buildWhatsAppUrl,
  serializeRentalSearch,
  type RentalSearch,
} from "@/lib/search";

interface VehicleCardProps {
  vehicle: Vehicle;
  categoryLabel?: string;
  search?: RentalSearch | null;
}

export default function VehicleCard({
  vehicle,
  categoryLabel,
  search = null,
}: VehicleCardProps) {
  const detailHref = `/vehicles/${vehicle.id}${
    search ? serializeRentalSearch(search) : ""
  }`;
  const whatsappHref = search
    ? buildWhatsAppUrl({ vehicleName: vehicle.name, search })
    : WHATSAPP_URL;

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-[#101010] transition-all duration-500 hover:-translate-y-1.5 hover:border-accent/30 hover:shadow-2xl hover:shadow-accent/10">
      {/* Image stage */}
      <Link
        href={detailHref}
        className="relative block h-48 shrink-0 overflow-hidden bg-gradient-to-b from-[#1a1a1a] to-[#101010] sm:h-56"
        aria-label={`View ${vehicle.name}`}
      >
        <Image
          src={vehicle.image}
          alt={vehicle.name}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-contain p-5 transition-transform duration-500 group-hover:scale-105"
        />

        {vehicle.tag && (
          <span className="absolute left-4 top-4 z-10 rounded-full bg-accent px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-white shadow-lg">
            {vehicle.tag}
          </span>
        )}
        {categoryLabel && (
          <span className="absolute right-4 top-4 z-10 rounded-full border border-white/10 bg-black/50 px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-white backdrop-blur-md">
            {categoryLabel}
          </span>
        )}

        {/* Price badge */}
        <span className="absolute bottom-3 left-4 z-10 rounded-full border border-white/10 bg-black/55 px-3.5 py-1.5 text-[11px] font-bold text-white backdrop-blur-md">
          PKR {vehicle.pricePerDay.toLocaleString()}
          <span className="font-medium text-white/70">/day</span>
        </span>
      </Link>

      {/* Card content */}
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="truncate font-display text-lg font-bold leading-tight text-white">
              <Link
                href={detailHref}
                className="transition-colors duration-200 hover:text-accent"
              >
                {vehicle.name}
              </Link>
            </h3>
            <p className="mt-1 text-xs text-slate">
              {vehicle.fuel} · {vehicle.transmission}
            </p>
          </div>
        </div>

        {/* Specs */}
        <div className="mt-4 flex flex-wrap gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/[0.05] px-3 py-1.5 text-[11px] font-medium text-slate">
            <Users className="h-3.5 w-3.5 text-accent" />
            {vehicle.seats} Seats
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/[0.05] px-3 py-1.5 text-[11px] font-medium text-slate">
            <Settings className="h-3.5 w-3.5 text-accent" />
            {vehicle.transmission}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/[0.05] px-3 py-1.5 text-[11px] font-medium text-slate">
            <Clock className="h-3.5 w-3.5 text-accent" />
            {vehicle.driverHours} hrs
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/[0.05] px-3 py-1.5 text-[11px] font-medium text-slate">
            <Fuel className="h-3.5 w-3.5 text-accent" />
            PKR {vehicle.overtimeRate}/hr OT
          </span>
        </div>

        <p className="mt-3 line-clamp-2 flex-1 text-xs leading-relaxed text-slate">
          {vehicle.description}
        </p>

        {/* CTAs */}
        <div className="mt-5 flex flex-col gap-2">
          <Link
            href={detailHref}
            className="btn-gradient flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 font-display text-sm font-semibold shadow-lg shadow-accent/20 transition-all duration-300 hover:shadow-xl hover:shadow-accent/30"
          >
            <Search className="h-4 w-4" /> Check Availability
          </Link>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 font-display text-sm font-semibold text-white transition-all duration-300 hover:border-accent/50 hover:bg-accent/10"
          >
            <MessageCircle className="h-4 w-4" /> Book with Driver
          </a>
        </div>
      </div>
    </article>
  );
}
