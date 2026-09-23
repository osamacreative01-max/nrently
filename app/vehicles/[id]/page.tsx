import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, Fuel, Settings, Users } from "lucide-react";
import { BRAND_NAME, RENTAL_POLICY, SITE_URL, VEHICLES, categoryLabel } from "@/lib/site";
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

const toSeoDescription = (vehicle: (typeof VEHICLES)[number]) => {
  const tail = ` Rent ${vehicle.name} for PKR ${vehicle.pricePerDay.toLocaleString()}/day (with driver) — trustworthy ${BRAND_NAME} service, delivered clean and on time.`;
  const budget = 156 - tail.length;
  const head =
    budget <= 0
      ? vehicle.name
      : vehicle.description.length <= budget
        ? vehicle.description
        : vehicle.description.slice(0, budget).replace(/\s\S*$/, "").trim();
  return (head + tail).slice(0, 160);
};

export async function generateMetadata({
  params,
}: VehicleDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const vehicle = VEHICLES.find((v) => v.id === id);

  if (!vehicle) {
    return { title: "Vehicle Not Found" };
  }

  const price = `PKR ${vehicle.pricePerDay.toLocaleString()}/day`;
  const description = toSeoDescription(vehicle);
  const imageUrl = `${SITE_URL}${encodeURI(vehicle.image)}`;

  return {
    title: `${vehicle.name} on Rent`,
    description,
    alternates: { canonical: `/vehicles/${vehicle.id}` },
    openGraph: {
      title: `${vehicle.name} on Rent | ${BRAND_NAME}.pk`,
      description,
      type: "website",
      images: [{ url: imageUrl, width: 800, height: 800, alt: `${vehicle.name} rental — ${BRAND_NAME}` }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${vehicle.name} on Rent | ${BRAND_NAME}.pk`,
      description,
      images: [imageUrl],
    },
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

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "AutoRental",
    name: vehicle.name,
    image: `${SITE_URL}${encodeURI(vehicle.image)}`,
    description: vehicle.description,
    url: `${SITE_URL}/vehicles/${vehicle.id}`,
    priceRange: `PKR ${vehicle.pricePerDay.toLocaleString()}/day`,
    payer: "Renter",
    category: categoryLabel(vehicle.category),
    address: {
      "@type": "PostalAddress",
      addressLocality: "Karachi",
      addressCountry: "PK",
    },
    areaServed: "PK",
    slogan: "Trustworthy Pakistani car rental, delivered clean and on time.",
  };

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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
              {
                "@type": "ListItem",
                position: 2,
                name: "Vehicles",
                item: `${SITE_URL}/vehicles`,
              },
              {
                "@type": "ListItem",
                position: 3,
                name: vehicle.name,
                item: `${SITE_URL}/vehicles/${vehicle.id}`,
              },
            ],
          }),
        }}
      />
      <section className="mx-auto max-w-7xl px-4 pb-20 pt-24 sm:px-6 sm:pt-32 lg:px-8">
        <Link
          href={backHref}
          className="inline-flex items-center gap-2 text-sm text-slate transition-colors duration-200 hover:text-white"
        >
          <ArrowLeft className="h-4 w-4 text-accent" />
          {search ? "Back to search results" : "Back to vehicles"}
        </Link>

        <div className="mt-6 grid grid-cols-1 gap-8 sm:mt-8 sm:gap-10 lg:grid-cols-2 lg:gap-14">
          {/* Vehicle image + specs */}
          <div className="rounded-3xl border border-line bg-[#101010] p-4 sm:p-8">
            <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-gradient-to-b from-[#1a1a1a] to-[#101010]">
              <Image
                src={vehicle.image}
                alt={vehicle.name}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-contain p-3 sm:p-8"
              />
              {vehicle.tag && (
                <span className="absolute left-4 top-4 rounded-full bg-accent px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-white shadow-lg">
                  {vehicle.tag}
                </span>
              )}
            </div>

            <dl className="mt-6 grid grid-cols-2 gap-2.5 sm:mt-8 sm:gap-3">
              {specs.map((spec) => (
                <div
                  key={spec.label}
                  className="flex min-w-0 flex-wrap items-center gap-2 rounded-xl border border-white/[0.06] bg-white/[0.03] px-3 py-2.5 text-xs text-slate sm:px-4 sm:py-3 sm:text-sm"
                >
                  <spec.icon className="h-4 w-4 shrink-0 text-accent" />
                  {spec.label}
                </div>
              ))}
              <div className="col-span-2 flex min-w-0 flex-wrap items-center gap-2 rounded-xl border border-white/[0.06] bg-white/[0.03] px-3 py-2.5 text-xs text-slate sm:px-4 sm:py-3 sm:text-sm">
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

            <h1 className="mt-3 font-display text-2xl font-bold leading-tight text-white break-words sm:mt-4 sm:text-4xl">
              {vehicle.name}
            </h1>

            <p className="mt-3 text-sm leading-relaxed text-slate sm:mt-4">
              {vehicle.description}
            </p>

            <p className="mt-4 sm:mt-5">
              <span className="font-display text-2xl font-bold text-white">
                PKR {vehicle.pricePerDay.toLocaleString()}
              </span>
              <span className="ml-1 text-sm text-slate">/day</span>
            </p>

            <VehicleBooking vehicle={vehicle} search={search} />

            <div className="mt-8 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5">
              <h2 className="font-display text-sm font-bold uppercase tracking-wide text-white">
                Good to know
              </h2>
              <ul className="mt-3 space-y-2.5">
                {RENTAL_POLICY.map((item) => (
                  <li
                    key={item.label}
                    className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-0.5 text-xs leading-relaxed sm:text-sm"
                  >
                    <span className="font-semibold text-accent">
                      {item.label}:
                    </span>
                    <span className="text-slate">{item.value}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <ContactCta />
    </>
  );
}
