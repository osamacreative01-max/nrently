"use client";

import Image from "next/image";
import SectionHeading from "@/components/ui/SectionHeading";
import { CITY_HIGHLIGHTS } from "@/lib/site";

interface CityHighlightsProps {
  cityName?: string;
}

export default function CityHighlights({ cityName = "Pakistan" }: CityHighlightsProps) {
  const items = [...CITY_HIGHLIGHTS, ...CITY_HIGHLIGHTS];

  return (
    <section className="relative overflow-hidden bg-night py-20 lg:py-28">
      <div className="pointer-events-none absolute -right-24 top-0 h-80 w-80 rounded-full bg-accent/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Explore the City"
          title={`Top places to visit in ${cityName}`}
          subtitle={`Book a ride and discover ${cityName}'s most iconic landmarks — from beaches to monuments.`}
        />
      </div>

      <div className="mt-14 group/marquee">
        <div className="marquee-track group-hover/marquee:[animation-play-state:paused] flex w-max gap-5 px-4">
          {items.map((item, i) => (
            <div
              key={`${item.name}-${i}`}
              className="group relative w-[280px] shrink-0 overflow-hidden rounded-2xl border border-white/[0.06] sm:w-[340px] lg:w-[400px]"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="400px"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                <div className="absolute inset-0 flex flex-col justify-end p-5">
                  <h3 className="font-display text-lg font-bold text-white sm:text-xl">
                    {item.name}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-white/70">
                    {item.text}
                  </p>
                  <div className="mt-3 h-0.5 w-10 bg-accent transition-all duration-300 group-hover:w-16" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
