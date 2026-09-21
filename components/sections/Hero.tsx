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

      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-12 px-4 pb-40 pt-32 sm:px-6 lg:grid-cols-[1.15fr_1fr] lg:px-8">
        <div>
          <motion.p
            initial={prefersReduced ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mb-4 flex items-center gap-2 font-display text-sm font-semibold uppercase tracking-[0.3em] text-accent"
          >
            <span className="h-px w-8 bg-accent" />
            Car Rental Services in Karachi
          </motion.p>

          <h1 className="font-display text-4xl font-extrabold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl">
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
            className="mt-6 max-w-xl text-base leading-relaxed text-slate-200 sm:text-lg"
          >
            {HERO.paragraph}
          </motion.p>

          <motion.div
            initial={prefersReduced ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full btn-gradient px-8 py-4 font-display text-sm font-semibold text-white shadow-2xl shadow-accent/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-accent/60"
            >
              <MessageCircle className="h-4 w-4" />
              {HERO.cta}
            </a>
            <a
              href={`tel:${PHONE_DISPLAY.replace(/-/g, "")}`}
              className="inline-flex items-center gap-2 rounded-full border border-white/30 px-8 py-4 font-display text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-white hover:bg-white/10"
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
          className="relative hidden lg:block"
        >
          <div className="pointer-events-none absolute inset-0 -z-0 rounded-full bg-accent/20 blur-[100px]" />
          <div className="relative aspect-[4/3]">
            {/* Preload all images */}
            {CAROUSEL_IMAGES.map((img) => (
              <link key={img.src} rel="preload" as="image" href={img.src} />
            ))}

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
          <div className="mt-6 flex items-center justify-center gap-2">
            {CAROUSEL_IMAGES.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setCurrent(i)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === current
                    ? "w-6 bg-accent"
                    : "w-2 bg-white/30 hover:bg-white/50"
                }`}
                aria-label={`Go to image ${i + 1}`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
