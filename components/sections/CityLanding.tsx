import Image from "next/image";
import Link from "next/link";
import { MapPin, MessageCircle, Phone } from "lucide-react";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/ui/Reveal";
import Parallax from "@/components/ui/Parallax";
import VehicleListing from "@/components/sections/VehicleListing";
import ContactCta from "@/components/sections/ContactCta";
import {
  CONTACT,
  PHONE_DISPLAY,
  VEHICLES,
  WHATSAPP_URL,
  type CityInfo,
} from "@/lib/site";

interface CityLandingProps {
  city: CityInfo;
  tagline: string;
  routes: string[];
}

export default function CityLanding({ city, tagline, routes }: CityLandingProps) {
  const vehicles = VEHICLES.filter((_, i) => i % 2 === 0).slice(0, 6);
  const mapEmbed =
    CONTACT.mapEmbeds[city.id as keyof typeof CONTACT.mapEmbeds] ?? null;

  return (
    <>
      <PageHero
        eyebrow={`Car Rental in ${city.name}`}
        title={`Explore ${city.name} with Nrently`}
        subtitle={tagline}
        image={city.image}
        imageAlt={`Car rental in ${city.name}`}
      />

      <section className="mx-auto max-w-7xl px-4 pb-20 pt-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <p className="mb-3 font-display text-sm font-semibold uppercase tracking-[0.25em] text-accent">
              Popular Routes
            </p>
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              Where {city.name} rides with us
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate">
              {city.blurb} Enjoy flexible, door-to-door service in and around
              the city with professional drivers on request.
            </p>
            <div className="mt-6 flex flex-wrap gap-2.5">
              {routes.map((route) => (
                <span
                  key={route}
                  className="flex items-center gap-1.5 rounded-full bg-[#121212] px-4 py-2 text-sm text-ink ring-1 ring-line"
                >
                  <MapPin className="h-4 w-4 text-accent" />
                  {route}
                </span>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="relative grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-gradient-to-b from-[#1a1a1a] to-[#121212]">
                <Parallax className="absolute -inset-y-[12%] inset-x-0" speed={0.1}>
                  <Image
                    src={city.image}
                    alt={city.name}
                    fill
                    sizes="(min-width: 640px) 50vw, 100vw"
                    className="object-contain p-6"
                  />
                </Parallax>
              </div>
              <div className="flex flex-col justify-center gap-3">
                <div className="rounded-2xl bg-brand p-5 text-white">
                  <p className="text-xs font-semibold uppercase tracking-wide text-accent">
                    Rates from
                  </p>
                  <p
                    className="mt-1 font-display text-3xl font-extrabold"
                    style={{ fontVariantNumeric: "tabular-nums" }}
                  >
                    PKR {city.from.toLocaleString()}
                    <span className="text-sm font-medium text-slate-300"> /day</span>
                  </p>
                </div>
                <div className="rounded-2xl border border-line bg-[#121212] p-5">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate">
                    Customer centre
                  </p>
                  <p className="mt-1 text-sm font-medium text-white">{city.address}</p>
                </div>
                <div className="rounded-2xl border border-line bg-[#121212] p-5">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate">
                    Areas served
                  </p>
                  <p className="mt-1 text-sm font-medium text-white">
                    {city.areas.slice(0, 4).join(" · ")}
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
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
              <p className="mb-3 font-display text-sm font-semibold uppercase tracking-[0.25em] text-accent">
                Find Us
              </p>
              <h2 className="text-3xl font-bold text-white sm:text-4xl">
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
                  className="h-80 w-full grayscale-[20%]"
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
        <div className="flex flex-col items-center justify-between gap-6 rounded-3xl bg-gradient-to-r from-brand to-brand/90 px-8 py-10 text-center sm:flex-row sm:text-left">
          <div>
            <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">
              Ready to drive in {city.name}?
            </h2>
            <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:gap-6">
              <a
                href={`tel:${PHONE_DISPLAY.replace(/-/g, "")}`}
                className="text-sm text-slate-300 hover:text-accent"
                style={{ fontVariantNumeric: "tabular-nums" }}
              >
                <Phone className="mr-1.5 inline h-4 w-4 text-accent" />
                {PHONE_DISPLAY}
              </a>
              <span className="hidden text-slate-500 sm:inline">|</span>
              <span className="text-sm text-slate-400">Budget to luxury fleet in stock</span>
            </div>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 font-display text-sm font-semibold text-white shadow-lg shadow-accent/30 transition-all duration-300 hover:-translate-y-0.5"
            >
              <MessageCircle className="h-4 w-4" />
              Book in {city.name}
            </a>
            <Link
              href="/vehicles"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 px-7 py-3.5 font-display text-sm font-semibold text-white transition-all duration-300 hover:border-white hover:bg-[#121212]/10"
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