"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

export default function RouteTransition() {
  const pathname = usePathname();
  const prefersReduced = useReducedMotion();
  const [active, setActive] = useState(false);
  const first = useRef(true);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    if (prefersReduced) return;
    setActive(true);
    const t = setTimeout(() => setActive(false), 520);
    return () => clearTimeout(t);
  }, [pathname, prefersReduced]);

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          key={pathname}
          aria-hidden
          className="pointer-events-none fixed inset-0 z-[200] bg-brand"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          exit={{ scaleY: 0 }}
          transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformOrigin: "top" }}
        >
          <div className="absolute inset-x-0 bottom-0 h-1 bg-accent" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}