import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import CTA from "@/components/ui/CTA";
import { ABOUT } from "@/lib/site";

const FLOATING_CARS = [
  { src: "/images/MERCEDES S Class - S400.png", alt: "Mercedes S400", className: "left-0 top-0 h-40 w-40 sm:h-52 sm:w-52 lg:h-64 lg:w-64", anim: "animate-float-1" },
  { src: "/images/TOYOTA LC 300-Photoroom.png", alt: "Toyota Land Cruiser", className: "right-4 top-16 h-32 w-32 sm:h-44 sm:w-44 lg:h-52 lg:w-52", anim: "animate-float-2" },
  { src: "/images/AUDI A5.png", alt: "Audi A5", className: "left-8 bottom-0 h-36 w-36 sm:h-44 sm:w-44 lg:h-56 lg:w-56", anim: "animate-float-3" },
];

export default function AboutPreview() {
  return (
    <section className="relative overflow-hidden bg-night py-20 lg:py-28">
      <div className="pointer-events-none absolute -right-24 top-0 h-80 w-80 rounded-full bg-accent/10 blur-3xl" />
      <div className="pointer-events-none absolute -left-24 bottom-0 h-60 w-60 rounded-full bg-accent/[0.06] blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
        {/* Left — Floating car images */}
        <Reveal className="relative">
          <div className="relative aspect-[4/3] sm:aspect-[3/2] lg:aspect-[4/3]">
            {/* Ambient glow */}
            <div className="pointer-events-none absolute inset-0 rounded-3xl bg-accent/[0.04] blur-[60px]" />

            {FLOATING_CARS.map((car, i) => (
              <div
                key={car.src}
                className={`absolute ${car.className} ${car.anim}`}
                style={{ zIndex: 10 + i }}
              >
                <Image
                  src={car.src}
                  alt={car.alt}
                  fill
                  sizes="(min-width: 1024px) 25vw, 33vw"
                  className="object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.5)]"
                />
              </div>
            ))}

            {/* Decorative ring */}
            <div className="absolute inset-8 rounded-full border border-white/[0.04]" />
            <div className="absolute inset-16 rounded-full border border-white/[0.03]" />
          </div>

          {/* Stats badge */}
          <div className="absolute -bottom-6 -right-4 rounded-2xl bg-accent px-6 py-4 shadow-2xl shadow-accent/30 sm:-right-6">
            <p className="font-display text-3xl font-extrabold text-white">10+</p>
            <p className="text-xs font-semibold uppercase tracking-wide text-white/80">
              Years on the road
            </p>
          </div>
        </Reveal>

        {/* Right — Content */}
        <div>
          <Reveal>
            <p className="mb-3 font-display text-sm font-semibold uppercase tracking-[0.25em] text-accent">
              About Nrently
            </p>
            <h2 className="text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-[2.6rem]">
              {ABOUT.heading}
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-300 sm:text-lg">
              {ABOUT.paragraph}
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <ul className="mt-7 space-y-3">
              {[ABOUT.subheading1, ABOUT.subheading2, ABOUT.subheading3].map(
                (item) => (
                  <li
                    key={item}
                    className="flex items-center gap-3 text-sm text-slate-200 sm:text-base"
                  >
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-mint" />
                    {item}
                  </li>
                )
              )}
            </ul>
            <div className="mt-9 flex flex-wrap items-center gap-4">
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
          </Reveal>
        </div>
      </div>
    </section>
  );
}
