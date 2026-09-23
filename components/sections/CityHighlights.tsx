"use client";

import Image from "next/image";
import SectionHeading from "@/components/ui/SectionHeading";
import { CITY_HIGHLIGHTS } from "@/lib/site";

interface CityHighlightsProps {
  cityName?: string;
}

export default function CityHighlights({ cityName = "Pakistan" }: CityHighlightsProps) {
  const items = CITY_HIGHLIGHTS;

  return (
    <section className="relative overflow-hidden bg-night py-14 sm:py-20 lg:py-28">
      <div className="pointer-events-none absolute -right-24 top-0 h-80 w-80 rounded-full bg-accent/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Explore the City"
          title={`Top places to visit in ${cityName}`}
          subtitle={`Book a ride and discover ${cityName}'s most iconic landmarks — from beaches to monuments.`}
        />
      </div>

      <div className="mt-10 group/marquee sm:mt-14">
        <div className="marquee-track group-hover/marquee:[animation-play-state:paused] flex w-max gap-4 px-4 sm:gap-5">
          {[0, 1].map((copy) => (
            <div
              key={copy}
              aria-hidden={copy === 1}
              inert={copy === 1}
              className="contents"
            >
              {items.map((item) => (
                <div
                  key={`${item.name}-${copy}`}
                  className="group relative w-[260px] shrink-0 overflow-hidden rounded-2xl border border-white/[0.06] sm:w-[340px] lg:w-[400px]"
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

                    <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-5">
                      <h3 className="font-display text-base font-bold text-white sm:text-xl">
                        {item.name}
                      </h3>
                      <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-white/70 sm:mt-2 sm:text-sm">
                        {item.text}
                      </p>
                      <div className="mt-2 h-0.5 w-10 bg-accent transition-all duration-300 group-hover:w-16 sm:mt-3" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
