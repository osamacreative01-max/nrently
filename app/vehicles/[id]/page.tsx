import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, Fuel, Settings, Users } from "lucide-react";
import { VEHICLES, categoryLabel } from "@/lib/site";
import { parseRentalSearch, serializeRentalSearch } from "@/lib/search";
import VehicleBooking from "@/components/VehicleBooking";
import ContactCta from "@/components/sections/ContactCta";

interface VehicleDetailPageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export function generateStaticParams() {
  return VEHICLES.map((vehicle) => ({ id: vehicle.id }));
}

export async function generateMetadata({
  params,
}: VehicleDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const vehicle = VEHICLES.find((v) => v.id === id);

  if (!vehicle) {
    return { title: "Vehicle Not Found" };
  }

  return {
    title: `${vehicle.name} on Rent`,
    description: vehicle.description,
  };
}

export default async function VehicleDetailPage({
  params,
  searchParams,
}: VehicleDetailPageProps) {
  const { id } = await params;
  const vehicle = VEHICLES.find((v) => v.id === id);

  if (!vehicle) notFound();

  const search = parseRentalSearch(await searchParams);
  const backHref = `/vehicles${search ? serializeRentalSearch(search) : ""}`;

  const specs = [
    { icon: Users, label: `${vehicle.seats} Seats` },
    { icon: Settings, label: vehicle.transmission },
    { icon: Fuel, label: vehicle.fuel },
    {
      icon: Clock,
      label: `With Driver (${vehicle.driverHours} hrs)`,
    },
  ];

  return (
    <>
      <section className="mx-auto max-w-7xl px-4 pb-20 pt-10 sm:px-6 lg:px-8">
        <Link
          href={backHref}
          className="inline-flex items-center gap-2 text-sm text-slate transition-colors duration-200 hover:text-white"
        >
          <ArrowLeft className="h-4 w-4 text-accent" />
          {search ? "Back to search results" : "Back to vehicles"}
        </Link>

        <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-14">
          {/* Vehicle image + specs */}
          <div className="rounded-2xl border border-line bg-[#121212] p-6 sm:p-8">
            <div className="relative aspect-[16/10]">
              <Image
                src={vehicle.image}
                alt={vehicle.name}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-contain drop-shadow-[0_16px_32px_rgba(0,0,0,0.6)]"
              />
              {vehicle.tag && (
                <span className="absolute left-0 top-0 rounded-full bg-accent px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-white shadow-lg">
                  {vehicle.tag}
                </span>
              )}
            </div>

            <dl className="mt-8 grid grid-cols-2 gap-3">
              {specs.map((spec) => (
                <div
                  key={spec.label}
                  className="flex items-center gap-2 rounded-xl border border-white/[0.06] bg-white/[0.03] px-4 py-3 text-sm text-slate"
                >
                  <spec.icon className="h-4 w-4 shrink-0 text-accent" />
                  {spec.label}
                </div>
              ))}
              <div className="flex items-center gap-2 rounded-xl border border-white/[0.06] bg-white/[0.03] px-4 py-3 text-sm text-slate col-span-2">
                <Clock className="h-4 w-4 shrink-0 text-accent" />
                Overtime PKR {vehicle.overtimeRate}/hr after{" "}
                {vehicle.driverHours} hrs
              </div>
            </dl>
          </div>

          {/* Vehicle info + booking */}
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full border border-accent/20 bg-accent/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-accent">
                {categoryLabel(vehicle.category)}
              </span>
            </div>

            <h1 className="mt-4 font-display text-3xl font-bold text-white sm:text-4xl">
              {vehicle.name}
            </h1>

            <p className="mt-4 text-sm leading-relaxed text-slate">
              {vehicle.description}
            </p>

            <p className="mt-5">
              <span className="font-display text-2xl font-bold text-white">
                PKR {vehicle.pricePerDay.toLocaleString()}
              </span>
              <span className="ml-1 text-sm text-slate">/day</span>
            </p>

            <VehicleBooking vehicle={vehicle} search={search} />
          </div>
        </div>
      </section>

      <ContactCta />
    </>
  );
}
