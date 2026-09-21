"use client";

import { MessageCircle } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { WHATSAPP_URL } from "@/lib/site";

export default function WhatsAppFloat() {
  const prefersReduced = useReducedMotion();

  return (
    <motion.a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Book on WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-mint text-white shadow-xl shadow-mint/40 transition-transform duration-300 hover:scale-110"
      {...(!prefersReduced
        ? {
            initial: { opacity: 0, scale: 0 },
            animate: { opacity: 1, scale: 1 },
            transition: { delay: 0.8, type: "spring", stiffness: 260, damping: 18 },
          }
        : {})}
    >
      <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-mint/50 [animation-duration:2s]" />
      <MessageCircle className="h-6 w-6" />
    </motion.a>
  );
}