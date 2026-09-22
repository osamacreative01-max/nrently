import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import CTA from "@/components/ui/CTA";
import { ABOUT, VEHICLES } from "@/lib/site";

const HIGHLIGHTS = [
  "10+ Years on the road",
  ABOUT.subheading1,
  ABOUT.subheading2,
];

export default function AboutPreview() {
  return (
    <section className="relative overflow-hidden bg-night py-14 sm:py-20 lg:py-28">
      <div className="pointer-events-none absolute -right-40 top-0 h-96 w-96 rounded-full bg-accent/10 blur-3xl" />
      <div className="pointer-events-none absolute -left-40 bottom-0 h-80 w-80 rounded-full bg-accent/[0.06] blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="mb-3 font-display text-xs font-semibold uppercase tracking-[0.18em] text-accent sm:text-sm sm:tracking-[0.25em]">
            About Nrently
          </p>
          <h2 className="text-2xl font-bold leading-tight text-white sm:text-4xl lg:text-[2.6rem]">
            {ABOUT.heading}
          </h2>
          <p className="mt-5 text-base leading-relaxed text-slate-300 sm:text-lg">
            {ABOUT.paragraph}
          </p>
        </Reveal>

        {/* Collage banner */}
        <Reveal delay={0.1}>
          <div className="group relative mt-10 aspect-[16/9] overflow-hidden rounded-[2rem] border border-white/10 shadow-[0_45px_90px_-35px_rgba(0,0,0,0.8)] sm:aspect-[21/9] sm:mt-14">
            <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
            <Image
              src="/images/Car Collage.png"
              alt="Nrently fleet — car collage"
              fill
              priority
              sizes="(min-width: 1280px) 1280px, 100vw"
                className="scale-105 object-contain transition-transform duration-[1200ms] ease-out group-hover:scale-100 sm:object-cover"
            />

            {/* Top-left glass badge */}
            <div className="absolute left-4 top-4 z-20 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.07] px-3.5 py-2.5 backdrop-blur-md sm:left-8 sm:top-8 sm:px-5 sm:py-3">
              <p className="font-display text-2xl font-extrabold text-white sm:text-3xl">
                10+
              </p>
              <p className="text-xs font-semibold uppercase tracking-wide text-white/85">
                Years on
                <br />
                the road
              </p>
            </div>

            {/* Bottom-right chip */}
            <div className="absolute bottom-4 right-4 z-20 sm:bottom-8 sm:right-8">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/35 px-3.5 py-2 text-xs font-semibold text-white backdrop-blur-md sm:gap-2.5 sm:px-5 sm:py-2.5 sm:text-sm">
                <span className="h-2 w-2 rounded-full bg-mint shadow-[0_0_12px_2px_rgba(255,255,255,0.35)]" />
                {VEHICLES.length} cars in our fleet
              </span>
            </div>
          </div>
        </Reveal>

        {/* Highlights + CTA */}
        <Reveal delay={0.2}>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-4 sm:mt-10 sm:gap-x-10 lg:mt-12">
            {HIGHLIGHTS.map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 text-sm text-slate-200 sm:text-base"
              >
                <CheckCircle2 className="h-5 w-5 shrink-0 text-mint" />
                {item}
              </div>
            ))}
            <div className="flex flex-wrap items-center gap-4">
              <CTA href="/about-us" variant="primary">
                More About Us
              </CTA>
              <Link
                href="/vehicles"
                className="draw-link font-display text-sm font-semibold text-white hover:text-accent"
              >
                Browse all vehicles
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}