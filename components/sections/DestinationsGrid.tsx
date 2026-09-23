import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, MapPin } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { Stagger, StaggerItem } from "@/components/ui/Stagger";
import { CITIES } from "@/lib/site";

export default function DestinationsGrid() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8 lg:py-28">
      <SectionHeading
        eyebrow="Destinations"
        title="We cover all of Pakistan"
        subtitle="Customer centres in Karachi, Lahore and Islamabad — with full fleet delivery across Multan and Sukkur."
      />

      <Stagger className="mt-8 grid gap-4 sm:mt-12 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
        {CITIES.slice(0, 5).map((city) => (
          <StaggerItem key={city.id}>
            <article className="group relative block overflow-hidden rounded-2xl bg-[#0e0e0e] shadow-sm transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-brand/20">
              <Link
                href={city.href}
                className="relative block overflow-hidden"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-b from-[#1a1a1a] to-night">
                  <Image
                    src={city.image}
                    alt={city.name}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-contain p-3 transition-transform duration-700 group-hover:scale-110 sm:p-4"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand/95 via-brand/25 to-transparent" />
                  <ArrowUpRight className="absolute right-5 top-5 h-6 w-6 translate-y-1 text-white opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100" />
                </div>

                <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6">
                  <p className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.15em] text-accent sm:text-xs sm:tracking-[0.2em]">
                    <MapPin className="h-3.5 w-3.5 shrink-0" />
                    Rent a car in {city.name}
                  </p>
                  <h3 className="mt-1.5 font-display text-xl font-bold text-white sm:text-2xl">
                    {city.name}
                  </h3>
                </div>
              </Link>

              <div className="border-t border-white/5 p-4 sm:p-5">
                <p className="line-clamp-2 text-xs leading-relaxed text-slate-200 sm:text-sm">
                  {city.blurb}
                </p>
              </div>
            </article>
          </StaggerItem>
        ))}

        <StaggerItem className="sm:col-span-2 lg:col-span-3">
          <Link
            href="/location"
            className="group flex items-center justify-between gap-4 rounded-2xl border border-dashed border-white/20 bg-[#121212] p-5 transition-all duration-300 hover:border-accent/50 hover:bg-[#121212] sm:p-8"
          >
            <div>
              <h3 className="font-display text-lg font-bold text-white sm:text-xl">
                Need wheels somewhere else?
              </h3>
              <p className="mt-1 text-xs leading-relaxed text-slate sm:text-sm">
                We arrange inter-city and long-distance rentals across Pakistan.
              </p>
            </div>
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand text-white transition-all duration-300 group-hover:rotate-45 group-hover:bg-accent sm:h-12 sm:w-12">
              <ArrowUpRight className="h-5 w-5" />
            </span>
          </Link>
        </StaggerItem>
      </Stagger>
    </section>
  );
}