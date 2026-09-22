import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/ui/Reveal";
import ValuesGrid from "@/components/sections/ValuesGrid";
import StatsBand from "@/components/sections/StatsBand";
import FaqSection from "@/components/sections/FaqSection";
import ContactCta from "@/components/sections/ContactCta";
import { ABOUT } from "@/lib/site";

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

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal className="relative">
            <div className="absolute -right-4 -top-4 h-24 w-24 rounded-2xl border-2 border-accent/40 sm:-right-6 sm:-top-6" />
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-gradient-to-br from-[#1a1a1a] to-[#0e0e0e] shadow-2xl">
              <Image
                src="/images/AUDI A5.png"
                alt="Nrently luxury rental car"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-contain p-6"
              />
            </div>
          </Reveal>

          <div>
            <Reveal>
              <p className="mb-3 font-display text-sm font-semibold uppercase tracking-[0.25em] text-accent">
                Who we are
              </p>
              <h2 className="text-3xl font-bold leading-tight text-white sm:text-4xl">
                {ABOUT.heading}
              </h2>
              <p className="mt-5 text-base leading-relaxed text-slate sm:text-lg">
                {ABOUT.paragraph}
              </p>
              <p className="mt-4 text-base leading-relaxed text-slate">
                {ABOUT.paragraph2}
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="mt-8 grid grid-cols-2 gap-4">
                {[
                  { title: "Our Vision", text: "Every journey in Pakistan — seamless, premium and effortless." },
                  { title: "Our Promise", text: "Zero hidden charges. On-time delivery. 24/7 human support." },
                ].map((card) => (
                  <div
                    key={card.title}
                    className="rounded-2xl border border-line bg-[#121212] p-5"
                  >
                    <h3 className="font-display text-base font-bold text-white">
                      {card.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-slate">
                      {card.text}
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