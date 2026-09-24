"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

interface PageHeroProps {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  image?: string;
  imageAlt?: string;
  imageClassName?: string;
}

export default function PageHero({ title, subtitle, eyebrow, image, imageAlt, imageClassName }: PageHeroProps) {
  const prefersReduced = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-brand pb-8 pt-20 sm:pb-14 sm:pt-32">
      <div className="pointer-events-none absolute -right-28 -top-24 h-96 w-96 rounded-full bg-accent/15 blur-3xl" />
      <div className="pointer-events-none absolute -left-20 bottom-0 h-64 w-64 rounded-full bg-white/5 blur-3xl" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className={`grid items-center gap-6 sm:gap-8 ${image ? "lg:grid-cols-[1fr_1fr]" : ""}`}>
          <motion.div
            initial={prefersReduced ? false : { y: 20 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-2xl"
          >
            {eyebrow && (
              <p className="mb-3 flex items-center gap-2 font-display text-xs font-semibold uppercase tracking-[0.18em] text-accent sm:text-sm sm:tracking-[0.3em]">
                <span className="h-px w-8 bg-accent" />
                {eyebrow}
              </p>
            )}
            <h1 className="text-3xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-4xl lg:text-5xl xl:text-6xl">
              {title}
            </h1>
            {subtitle && (
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-slate-300 sm:mt-5 sm:text-lg">
                {subtitle}
              </p>
            )}
          </motion.div>

          {image && (
            <motion.div
              initial={prefersReduced ? false : { x: 30 }}
              animate={{ x: 0 }}
              transition={{ duration: 0.7, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
              className="relative mt-3 lg:mt-0"
            >
              <div className="pointer-events-none absolute inset-0 -z-0 rounded-full bg-accent/10 blur-[80px]" />
              <div
                className={`relative aspect-[16/10] ${
                  imageClassName ? `origin-center ${imageClassName}` : ""
                }`}
              >
                <Image
                  src={image}
                  alt={imageAlt || "Nrently car rental fleet"}
                  fill
                  priority
                  sizes="(min-width: 1024px) 48vw, 100vw"
                  className="object-contain p-2 drop-shadow-[0_25px_50px_rgba(0,0,0,0.55)] sm:p-4"
                />
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
