"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { FAQS } from "@/lib/site";

export default function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const prefersReduced = useReducedMotion();

  return (
    <div className="mx-auto mt-14 max-w-3xl space-y-3">
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
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : i)}
              className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
              aria-expanded={isOpen}
            >
              <span className={`font-display text-base font-semibold sm:text-lg transition-colors duration-300 ${isOpen ? "text-white" : "text-white/80"}`}>
                {faq.q}
              </span>
              <motion.span
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
                  isOpen ? "bg-accent text-white" : "bg-white/[0.06] text-slate"
                }`}
              >
                <ChevronDown className="h-4 w-4" />
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="content"
                  initial={
                    prefersReduced ? false : { height: 0, opacity: 0 }
                  }
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="border-t border-white/[0.06]">
                    <p className="px-6 py-5 text-sm leading-relaxed text-slate">
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
