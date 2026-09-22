"use client";

import Link from "next/link";
import { CATEGORIES, WHATSAPP_URL } from "@/lib/site";

function BudgetIcon() {
  return (
    <svg viewBox="0 0 80 50" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-12 w-12 text-accent">
      <path d="M12 35 C12 35 14 25 20 23 L30 22 L38 15 L55 14 L63 18 L66 22 L68 28 L68 33" />
      <path d="M10 35 L70 35" />
      <circle cx="22" cy="35" r="5" />
      <circle cx="58" cy="35" r="5" />
      <path d="M38 15 L36 22" />
      <path d="M50 14 L52 22" />
    </svg>
  );
}

function StandardIcon() {
  return (
    <svg viewBox="0 0 80 50" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-12 w-12 text-accent">
      <path d="M8 35 C8 35 10 27 16 25 L26 24 L34 16 L52 15 L62 20 L68 25 L70 30 L70 33" />
      <path d="M6 35 L74 35" />
      <circle cx="20" cy="35" r="5" />
      <circle cx="60" cy="35" r="5" />
      <path d="M34 16 L32 24" />
      <path d="M48 15 L50 22" />
    </svg>
  );
}

function LuxuryIcon() {
  return (
    <svg viewBox="0 0 80 50" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-12 w-12 text-accent">
      <path d="M6 35 C6 35 9 28 14 26 L24 25 L32 17 L56 16 L66 21 L72 26 L74 30 L74 33" />
      <path d="M4 35 L76 35" />
      <circle cx="18" cy="35" r="5" />
      <circle cx="62" cy="35" r="5" />
      <path d="M32 17 L30 25" />
      <path d="M52 16 L54 23" />
    </svg>
  );
}

function SUVIcon() {
  return (
    <svg viewBox="0 0 80 50" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-12 w-12 text-accent">
      <path d="M8 35 C8 35 10 24 14 22 L22 21 L28 12 L58 11 L66 16 L70 22 L72 28 L72 33" />
      <path d="M6 35 L74 35" />
      <circle cx="20" cy="35" r="6" />
      <circle cx="60" cy="35" r="6" />
      <path d="M28 12 L26 21" />
      <path d="M54 11 L56 20" />
    </svg>
  );
}

function VanIcon() {
  return (
    <svg viewBox="0 0 80 50" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-12 w-12 text-accent">
      <path d="M4 35 C4 35 6 24 10 22 L16 21 L18 14 L62 13 L68 18 L72 22 L74 28 L74 33" />
      <path d="M2 35 L76 35" />
      <circle cx="16" cy="35" r="5" />
      <circle cx="64" cy="35" r="5" />
      <path d="M18 14 L17 21" />
      <path d="M42 13 L42 21" />
    </svg>
  );
}

const ICONS = [BudgetIcon, StandardIcon, LuxuryIcon, SUVIcon, VanIcon];

export default function VehicleCategories() {
  const items = CATEGORIES.map((cat, i) => ({ ...cat, Icon: ICONS[i] }));

  return (
    <section className="relative overflow-hidden bg-[#0a0a0a] py-14 sm:py-28">
      {/* Section Header */}
      <div className="relative mb-10 mx-auto max-w-7xl px-4 text-center sm:mb-14 sm:px-6 lg:px-8">
        <p className="font-display text-xs font-semibold uppercase tracking-[0.3em] text-accent">
          Our Fleet
        </p>

        {/* Glitch heading */}
        <div className="relative mt-3 max-w-full inline-block">
          {/* Cyan offset layer */}
          <h2
              className="pointer-events-none absolute inset-0 select-none font-display text-2xl font-bold text-cyan-500/30 sm:text-4xl"
            style={{ transform: "translate(-2px, -1px)" }}
            aria-hidden="true"
          >
            Explore Our Vehicle Categories
          </h2>
          {/* Red offset layer */}
          <h2
              className="pointer-events-none absolute inset-0 select-none font-display text-2xl font-bold text-accent/30 sm:text-4xl"
            style={{ transform: "translate(2px, 1px)" }}
            aria-hidden="true"
          >
            Explore Our Vehicle Categories
          </h2>
          {/* Main white text */}
          <h2 className="relative font-display text-2xl font-bold text-white sm:text-4xl">
            Explore Our Vehicle Categories
          </h2>
        </div>
      </div>

      {/* Marquee Carousel */}
      <div className="group/marquee relative">
        {/* Edge fade gradients */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-[#0a0a0a] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-[#0a0a0a] to-transparent" />

        <div className="marquee-track flex w-max gap-4 px-4 group-hover/marquee:[animation-play-state:paused] sm:gap-6 sm:px-6">
          {/* First set */}
          {items.map((cat) => (
            <Link
              key={`a-${cat.id}`}
              href={cat.href}
              className="group/card flex w-[180px] shrink-0 flex-col items-center gap-4 rounded-2xl border border-white/10 bg-transparent px-6 py-8 transition-all duration-300 hover:-translate-y-2 hover:border-accent/50 hover:bg-white/[0.03] hover:shadow-lg hover:shadow-accent/10"
            >
              <div className="rounded-full border border-accent/20 p-3 transition-colors duration-300 group-hover/card:border-accent/50 group-hover/card:bg-accent/10">
                <cat.Icon />
              </div>
              <span className="font-display text-sm font-bold text-white">
                {cat.label}
              </span>
              <span className="text-center text-xs leading-relaxed text-slate">
                {cat.example}
              </span>
            </Link>
          ))}
          {/* Duplicate set for seamless loop */}
          {items.map((cat) => (
            <Link
              key={`b-${cat.id}`}
              href={cat.href}
              className="group/card flex w-[180px] shrink-0 flex-col items-center gap-4 rounded-2xl border border-white/10 bg-transparent px-6 py-8 transition-all duration-300 hover:-translate-y-2 hover:border-accent/50 hover:bg-white/[0.03] hover:shadow-lg hover:shadow-accent/10"
            >
              <div className="rounded-full border border-accent/20 p-3 transition-colors duration-300 group-hover/card:border-accent/50 group-hover/card:bg-accent/10">
                <cat.Icon />
              </div>
              <span className="font-display text-sm font-bold text-white">
                {cat.label}
              </span>
              <span className="text-center text-xs leading-relaxed text-slate">
                {cat.example}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* CTA Button */}
      <div className="mt-10 text-center sm:mt-14">
        <Link
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3.5 font-display text-xs font-bold text-white shadow-lg shadow-accent/25 transition-all duration-300 hover:scale-105 hover:bg-accent/90 hover:shadow-xl hover:shadow-accent/40 sm:px-10 sm:py-4 sm:text-sm"
        >
          Find Your Perfect Ride
        </Link>
      </div>
    </section>
  );
}
