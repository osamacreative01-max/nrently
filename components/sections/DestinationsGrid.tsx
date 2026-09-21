import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, MapPin } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { Stagger, StaggerItem } from "@/components/ui/Stagger";
import { CITIES } from "@/lib/site";

export default function DestinationsGrid() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <SectionHeading
        eyebrow="Destinations"
        title="We cover all of Pakistan"
        subtitle="Customer centres in Karachi, Lahore and Islamabad — with full fleet delivery across Multan and Sukkur."
      />

      <Stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {CITIES.slice(0, 5).map((city) => (
          <StaggerItem key={city.id}>
            <Link
              href={city.href}
              className="group relative block overflow-hidden rounded-2xl shadow-sm transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-brand/20"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-night">
                <Image
                  src={city.image}
                  alt={city.name}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand/95 via-brand/25 to-transparent" />
                <ArrowUpRight className="absolute right-5 top-5 h-6 w-6 translate-y-1 text-white opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100" />
              </div>

              <div className="absolute inset-x-0 bottom-0 p-6">
                <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                  <MapPin className="h-3.5 w-3.5" />
                  From PKR {city.from.toLocaleString()}/day
                </p>
                <h3 className="mt-1.5 font-display text-2xl font-bold text-white">
                  {city.name}
                </h3>
                <p className="mt-1 line-clamp-2 text-sm text-slate-200">
                  {city.blurb}
                </p>
              </div>
            </Link>
          </StaggerItem>
        ))}

        <StaggerItem className="sm:col-span-2 lg:col-span-3">
          <Link
            href="/location"
            className="group flex items-center justify-between gap-4 rounded-2xl border border-dashed border-white/20 bg-[#121212] p-8 transition-all duration-300 hover:border-accent/50 hover:bg-[#121212]"
          >
            <div>
              <h3 className="font-display text-xl font-bold text-white">
                Need wheels somewhere else?
              </h3>
              <p className="mt-1 text-sm text-slate">
                We arrange inter-city and long-distance rentals across Pakistan.
              </p>
            </div>
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand text-white transition-all duration-300 group-hover:rotate-45 group-hover:bg-accent">
              <ArrowUpRight className="h-5 w-5" />
            </span>
          </Link>
        </StaggerItem>
      </Stagger>
    </section>
  );
}