import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/ui/Reveal";
import { Stagger, StaggerItem } from "@/components/ui/Stagger";
import ValuesGrid from "@/components/sections/ValuesGrid";
import StatsBand from "@/components/sections/StatsBand";
import FaqSection from "@/components/sections/FaqSection";
import ContactCta from "@/components/sections/ContactCta";
import { ABOUT, STATS } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Nrently — Pakistan's car rental service delivering budget to luxury vehicles with premium, transparent service.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Us"
        title={ABOUT.subheading1}
        subtitle={ABOUT.subtext1}
        image="/images/MERCEDES CLA200.png"
        imageAlt="Nrently luxury car rental"
      />

      <section className="relative overflow-hidden py-12 sm:py-16 lg:py-24">
        <div className="pointer-events-none absolute -right-40 top-20 h-96 w-96 rounded-full bg-accent/10 blur-3xl" />
        <div className="pointer-events-none absolute -left-40 bottom-20 h-80 w-80 rounded-full bg-accent/[0.06] blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-8 sm:gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <Reveal>
                <p className="mb-3 flex items-center gap-3 font-display text-xs font-semibold uppercase tracking-[0.18em] text-accent sm:text-sm sm:tracking-[0.25em]">
                  <span className="h-px w-10 bg-accent" />
                  Who we are
                </p>
                <h2 className="text-2xl font-bold leading-tight text-white sm:text-4xl lg:text-[2.6rem]">
                  {ABOUT.heading}
                </h2>
              </Reveal>

              <Reveal delay={0.08}>
                <p className="mt-5 text-base leading-relaxed text-slate sm:text-lg">
                  {ABOUT.paragraph}
                </p>
              </Reveal>

              <Stagger className="mt-6 grid gap-3 sm:mt-8 sm:grid-cols-2 sm:gap-4">
                {[
                  { title: "Our Vision", text: "Seamless, premium journeys across Pakistan." },
                  { title: "Our Promise", text: "No hidden charges. 24/7 support." },
                ].map((card) => (
                  <StaggerItem key={card.title}>
                    <div className="group h-full rounded-2xl border border-line bg-[#121212] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-xl hover:shadow-brand/10">
                      <h3 className="font-display text-base font-bold text-white">
                        {card.title}
                      </h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-slate">
                        {card.text}
                      </p>
                    </div>
                  </StaggerItem>
                ))}
              </Stagger>
            </div>

            <Reveal delay={0.1} className="relative">
              <div className="pointer-events-none absolute -left-4 -top-4 h-24 w-24 rounded-2xl border-2 border-accent/40 sm:-left-6 sm:-top-6" />
              <div className="pointer-events-none absolute -bottom-4 -right-4 h-24 w-24 rounded-2xl border-2 border-accent/40 sm:-bottom-6 sm:-right-6" />

              <div className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-[#161616] to-[#0a0a0a] shadow-[0_45px_90px_-35px_rgba(0,0,0,0.85)]">
                <div className="pointer-events-none absolute left-1/2 top-1/2 h-56 w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/10 blur-3xl" />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-24 bg-gradient-to-t from-black/60 to-transparent" />

                <div className="relative aspect-[16/10] sm:aspect-[21/10]">
                  <Image
                    src="/images/Car Collage.png"
                    alt="Nrently fleet — luxury and budget cars collage"
                    fill
                    priority
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-contain p-4 transition-transform duration-700 ease-out group-hover:scale-[1.04] sm:p-8"
                  />
                </div>

                <div className="absolute left-3 top-3 z-20 flex items-center gap-2.5 rounded-2xl border border-white/10 bg-white/[0.07] px-3 py-2 backdrop-blur-md sm:left-6 sm:top-6 sm:gap-3 sm:px-4 sm:py-3">
                  <p className="font-display text-2xl font-extrabold text-white sm:text-3xl">
                    10+
                  </p>
                  <p className="text-xs font-semibold uppercase leading-tight tracking-wide text-white/85">
                    Years on
                    <br />
                    the road
                  </p>
                </div>

                <div className="absolute bottom-3 right-3 z-20 sm:bottom-6 sm:right-6">
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/40 px-3 py-2 text-[11px] font-semibold text-white backdrop-blur-md sm:gap-2.5 sm:px-4 sm:py-2.5 sm:text-sm">
                    <span className="h-2 w-2 rounded-full bg-mint shadow-[0_0_12px_2px_rgba(255,255,255,0.35)]" />
                    Budget → Luxury
                  </span>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-3 gap-2 sm:mt-5 sm:gap-3">
                {STATS.slice(0, 3).map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-2xl border border-line bg-[#121212] px-2.5 py-3 text-center sm:px-3 sm:py-4"
                  >
                    <p className="font-display text-lg font-extrabold text-accent sm:text-2xl">
                      {stat.value}
                      {stat.suffix}
                    </p>
                    <p className="mt-1 text-[11px] font-medium uppercase tracking-wide text-slate-300 sm:text-xs">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <StatsBand />
      <ValuesGrid />
      <FaqSection />
      <ContactCta />
    </>
  );
}