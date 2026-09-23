"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { MessageCircle, Phone } from "lucide-react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { HERO, PHONE_DISPLAY, WHATSAPP_URL } from "@/lib/site";

const CAROUSEL_IMAGES = [
  { src: "/images/MERCEDES S Class - S400.png", alt: "Mercedes S400 luxury rental" },
  { src: "/images/TOYOTA LC 300-Photoroom.png", alt: "Toyota Land Cruiser rental" },
  { src: "/images/AUDI A5.png", alt: "Audi A5 luxury rental" },
  { src: "/images/TOYOTA Fortuner-Photoroom.png", alt: "Toyota Fortuner SUV rental" },
  { src: "/images/HONDA Civic-Photoroom.png", alt: "Honda Civic sedan rental" },
  { src: "/images/SUZUKI Cultus-Photoroom.png", alt: "Suzuki Cultus budget rental" },
];

const INTERVAL = 3500;

export default function Hero() {
  const prefersReduced = useReducedMotion();
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % CAROUSEL_IMAGES.length);
  }, []);

  useEffect(() => {
    if (prefersReduced) return;
    const timer = setInterval(next, INTERVAL);
    return () => clearInterval(timer);
  }, [next, prefersReduced]);

  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden bg-brand">
      <div
        className="absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)",
          backgroundSize: "34px 34px",
        }}
      />
      <div className="pointer-events-none absolute -left-32 top-1/4 h-96 w-96 rounded-full bg-accent/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-1/4 h-96 w-96 rounded-full bg-accent/10 blur-3xl" />
      <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-cream to-transparent" />

      <div className="relative mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-6 px-4 pb-10 pt-20 sm:gap-12 sm:pb-28 sm:pt-32 lg:grid-cols-[1.15fr_1fr] lg:px-8">
        <div>
          <motion.p
            initial={prefersReduced ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mb-4 flex items-center gap-2 font-display text-xs font-semibold uppercase tracking-[0.18em] text-accent sm:text-sm sm:tracking-[0.3em]"
          >
            <span className="h-px w-8 bg-accent" />
            Nrently — Car Rental Services in Karachi
          </motion.p>

          <h1 className="font-display text-3xl font-extrabold leading-[1.08] tracking-tight text-white sm:text-4xl lg:text-5xl xl:text-6xl">
            {HERO.heading.split(" ").map((word, i) => (
              <span key={word + i} className="inline-block whitespace-nowrap pr-3 last:pr-0">
                <span className="inline-block overflow-hidden pb-1 align-bottom">
                  <motion.span
                    className="inline-block"
                    initial={prefersReduced ? false : { y: "110%", opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                      duration: 0.8,
                      delay: 0.2 + i * 0.08,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    {word}
                  </motion.span>
                </span>
              </span>
            ))}
          </h1>

          <motion.p
            initial={prefersReduced ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mt-5 max-w-xl text-base leading-relaxed text-slate-200 sm:mt-6 sm:text-lg"
          >
            {HERO.paragraph}
          </motion.p>

          <motion.div
            initial={prefersReduced ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 flex flex-col gap-3 sm:mt-9 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4"
          >
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full btn-gradient px-6 py-3.5 font-display text-sm font-semibold text-white shadow-2xl shadow-accent/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-accent/60 sm:px-8 sm:py-4"
            >
              <MessageCircle className="h-4 w-4" />
              {HERO.cta}
            </a>
            <a
              href={`tel:${PHONE_DISPLAY.replace(/-/g, "")}`}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 px-6 py-3.5 font-display text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-white hover:bg-white/10 sm:px-8 sm:py-4"
              style={{ fontVariantNumeric: "tabular-nums" }}
            >
              <Phone className="h-4 w-4" />
              {PHONE_DISPLAY}
            </a>
          </motion.div>
        </div>

        {/* Carousel */}
        <motion.div
          initial={prefersReduced ? false : { opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="relative pr-14 sm:pr-0 lg:mt-0"
        >
          <div className="pointer-events-none absolute inset-0 -z-0 rounded-full bg-accent/20 blur-[60px] sm:blur-[100px]" />
          <div className="relative mt-4 aspect-[16/10] sm:mt-8 sm:aspect-[3/2] lg:aspect-[4/3]">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="absolute inset-0"
              >
                <Image
                  src={CAROUSEL_IMAGES[current].src}
                  alt={CAROUSEL_IMAGES[current].alt}
                  fill
                  priority={current === 0}
                  sizes="(min-width: 1024px) 44vw, 100vw"
                  className="object-contain drop-shadow-[0_35px_60px_rgba(0,0,0,0.45)]"
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dot indicators */}
          <div className="mt-4 flex items-center justify-center gap-1 sm:mt-6 sm:gap-2">
            {CAROUSEL_IMAGES.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setCurrent(i)}
                aria-label={`Go to image ${i + 1}`}
                className="grid h-11 w-11 place-items-center rounded-full"
              >
                <span
                  className={`block h-2 rounded-full transition-all duration-300 ${
                    i === current
                      ? "w-6 bg-accent"
                      : "w-2 bg-white/30 hover:bg-white/50"
                  }`}
                />
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
