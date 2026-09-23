import Link from "next/link";
import { ArrowRight, MapPin, MessageCircle, Navigation, Phone } from "lucide-react";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import VehicleListing from "@/components/sections/VehicleListing";
import ContactCta from "@/components/sections/ContactCta";
import {
  CONTACT,
  PHONE_DISPLAY,
  VEHICLES,
  WHATSAPP_URL,
  type CityInfo,
} from "@/lib/site";
import { buildRouteWhatsAppUrl } from "@/lib/search";

interface CityLandingProps {
  city: CityInfo;
  tagline: string;
  routes: string[];
}

function splitRoute(route: string): { from: string; to: string } {
  const parts = route.split(/↔|<->|->/);
  if (parts.length >= 2) {
    return { from: parts[0].trim(), to: parts.slice(1).join(" ").trim() };
  }
  return { from: route, to: "City" };
}

export default function CityLanding({ city, tagline, routes }: CityLandingProps) {
  const vehicles = [
    ...VEHICLES.filter((v) => v.category === "budget"),
    ...VEHICLES.filter((v) => v.category === "standard"),
    ...VEHICLES.filter((v) => v.category === "luxury"),
    ...VEHICLES.filter((v) => v.category === "suv"),
    ...VEHICLES.filter((v) => v.category === "vans"),
  ].slice(0, 6);
  const mapEmbed =
    CONTACT.mapEmbeds[city.id as keyof typeof CONTACT.mapEmbeds] ?? null;

  return (
    <>
      <PageHero
        eyebrow={`Car Rental in ${city.name}`}
        title={`Car Rental in ${city.name} — Budget to Luxury`}
        subtitle={tagline}
        image={city.image}
        imageAlt={`Car rental in ${city.name}`}
      />

      {/* Popular Routes */}
      <section className="relative overflow-hidden border-b border-line/60 bg-[#0a0a0a] py-12 sm:py-20">
        <div className="pointer-events-none absolute -right-32 top-1/3 h-72 w-72 rounded-full bg-accent/10 blur-3xl" />
        <div className="pointer-events-none absolute -left-20 bottom-0 h-56 w-56 rounded-full bg-white/5 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Popular Routes"
            title={`Where ${city.name} rides with us`}
            subtitle={`${city.blurb} Door-to-door service in and around the city with professional drivers on request.`}
          />

          {/* Route cards */}
          <div className="mt-12 grid gap-4 sm:grid-cols-2">
            {routes.map((route, i) => {
              const { from, to } = splitRoute(route);
              const waHref = buildRouteWhatsAppUrl(from, to, city.name);
              return (
                <Reveal key={route} delay={i * 0.08}>
                  <a
                    href={waHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Book route ${from} to ${to} in ${city.name} on WhatsApp`}
                    className="group relative flex items-center gap-3 overflow-hidden rounded-2xl border border-line bg-[#121212] p-4 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-xl hover:shadow-accent/10 sm:gap-4 sm:p-6"
                  >
                    <span className="absolute right-4 top-4 font-display text-4xl font-extrabold text-white/[0.04] transition-colors duration-300 group-hover:text-accent/10">
                      {String(i + 1).padStart(2, "0")}
                    </span>

                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent ring-1 ring-accent/20 transition-colors duration-300 group-hover:bg-accent group-hover:text-white group-hover:ring-accent">
                      <Navigation className="h-5 w-5" />
                    </div>

                    <div className="relative min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-3.5 w-3.5 shrink-0 text-accent" />
                        <p className="truncate text-sm font-semibold text-white">
                          {from}
                        </p>
                      </div>
                      <div className="my-1.5 ml-1.5 h-3 w-px border-l border-dashed border-white/20" />
                      <div className="flex items-center gap-2">
                        <MapPin className="h-3.5 w-3.5 shrink-0 text-slate" />
                        <p className="truncate text-sm font-medium text-slate transition-colors duration-300 group-hover:text-white">
                          {to}
                        </p>
                      </div>
                    </div>

                    <span className="hidden items-center gap-1.5 rounded-full border border-accent/30 bg-accent/10 px-3 py-1.5 text-[11px] font-semibold text-accent transition-all duration-300 group-hover:bg-accent group-hover:text-white sm:inline-flex">
                      <MessageCircle className="h-3.5 w-3.5" />
                      Book
                    </span>
                    <ArrowRight className="h-5 w-5 shrink-0 text-slate/40 transition-all duration-300 group-hover:translate-x-1 group-hover:text-accent" />
                  </a>
                </Reveal>
              );
            })}
          </div>

          {/* City info strip */}
          <div className="mt-8 grid gap-4 sm:mt-12 sm:grid-cols-3">
            <Reveal delay={0.1}>
              <div className="h-full rounded-2xl border border-line bg-gradient-to-br from-accent/15 to-[#121212] p-4 sm:p-6">
                <p className="text-xs font-semibold uppercase tracking-wide text-accent">
                  Rates from
                </p>
                <p
                  className="mt-2 font-display text-2xl font-extrabold text-white sm:text-3xl"
                  style={{ fontVariantNumeric: "tabular-nums" }}
                >
                  PKR {city.from.toLocaleString()}
                  <span className="text-sm font-medium text-slate"> /day</span>
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="h-full rounded-2xl border border-line bg-[#121212] p-4 sm:p-6">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate">
                  Customer centre
                </p>
                <p className="mt-2 text-sm font-medium leading-relaxed text-white">
                  {city.address}
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="h-full rounded-2xl border border-line bg-[#121212] p-4 sm:p-6">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate">
                  Areas served
                </p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {city.areas.slice(0, 6).map((area) => (
                    <span
                      key={area}
                      className="rounded-full bg-white/[0.05] px-2.5 py-1 text-[11px] text-slate"
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <VehicleListing
        eyebrow={`${city.name} Fleet`}
        title={`Available now in ${city.name}`}
        subtitle={`A selection of vehicles ready for pickup or delivery across ${city.name}.`}
        vehicles={vehicles}
      />

      {mapEmbed && (
        <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[1fr_1.4fr] lg:items-center">
            <Reveal>
              <p className="mb-3 font-display text-xs font-semibold uppercase tracking-[0.18em] text-accent sm:text-sm sm:tracking-[0.25em]">
                Find Us
              </p>
              <h2 className="text-2xl font-bold text-white sm:text-4xl">
                Customer centre in {city.name}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-slate">
                {city.address}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-slate">
                Can&apos;t come to us? Book on WhatsApp and we bring the keys to
                your home or hotel anywhere in the city.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="overflow-hidden rounded-2xl border border-line shadow-lg">
                <iframe
                  title={`Nrently location map — ${city.name}`}
                  src={mapEmbed}
                    className="h-72 w-full grayscale-[20%] sm:h-80"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
            </Reveal>
          </div>
        </section>
      )}

      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 rounded-3xl bg-gradient-to-r from-brand to-brand/90 px-5 py-8 text-center sm:flex-row sm:px-8 sm:py-10 sm:text-left">
          <div>
            <h2 className="font-display text-xl font-bold text-white sm:text-3xl">
              Ready to drive in {city.name}?
            </h2>
            <div className="mt-3 flex flex-col gap-2 text-sm sm:flex-row sm:gap-6">
              <a
                href={`tel:${PHONE_DISPLAY.replace(/-/g, "")}`}
                className="text-sm text-slate-300 hover:text-accent"
                style={{ fontVariantNumeric: "tabular-nums" }}
              >
                <Phone className="mr-1.5 inline h-4 w-4 text-accent" />
                {PHONE_DISPLAY}
              </a>
              <span className="hidden text-slate-500 sm:inline">|</span>
              <span className="text-xs text-slate-400 sm:text-sm">Budget to luxury fleet in stock</span>
            </div>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3 font-display text-xs font-semibold text-white shadow-lg shadow-accent/30 transition-all duration-300 hover:-translate-y-0.5 sm:px-7 sm:py-3.5 sm:text-sm"
            >
              <MessageCircle className="h-4 w-4" />
              Book in {city.name}
            </a>
            <Link
              href="/vehicles"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 px-5 py-3 font-display text-xs font-semibold text-white transition-all duration-300 hover:border-white hover:bg-[#121212]/10 sm:px-7 sm:py-3.5 sm:text-sm"
            >
              Browse Fleet
            </Link>
          </div>
        </div>
      </section>

      <ContactCta />
    </>
  );
}