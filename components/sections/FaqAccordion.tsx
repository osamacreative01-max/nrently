"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { FAQS } from "@/lib/site";

export default function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const prefersReduced = useReducedMotion();

  return (
    <div className="mx-auto mt-10 max-w-3xl space-y-3 sm:mt-14">
      {FAQS.map((faq, i) => {
        const isOpen = openIndex === i;
        return (
          <div
            key={faq.q}
            className={`overflow-hidden rounded-2xl border transition-all duration-300 ${
              isOpen
                ? "border-accent/30 bg-white/[0.03] shadow-lg shadow-accent/5"
                : "border-white/[0.06] bg-transparent hover:border-white/10"
            }`}
          >
            <h3>
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-3 px-4 py-4 text-left sm:gap-4 sm:px-6 sm:py-5"
                aria-expanded={isOpen}
                aria-controls={`faq-panel-${i}`}
                id={`faq-trigger-${i}`}
              >
                <span className={`min-w-0 font-display text-base font-semibold break-words sm:text-lg transition-colors duration-300 ${isOpen ? "text-white" : "text-white/80"}`}>
                  {faq.q}
                </span>
                <motion.span
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-all duration-300 sm:h-8 sm:w-8 ${
                    isOpen ? "bg-accent text-white" : "bg-white/[0.06] text-slate"
                  }`}
                >
                  <ChevronDown className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                </motion.span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="content"
                  role="region"
                  aria-labelledby={`faq-trigger-${i}`}
                  id={`faq-panel-${i}`}
                  initial={
                    prefersReduced ? false : { height: 0, opacity: 0 }
                  }
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="border-t border-white/[0.06]">
                    <p className="px-4 py-4 text-sm leading-relaxed text-slate sm:px-6 sm:py-5">
                      {faq.a}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
