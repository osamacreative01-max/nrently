"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

interface CountUpProps {
  value: number;
  suffix?: string;
  duration?: number;
  decimal?: boolean;
  className?: string;
}

export default function CountUp({
  value,
  suffix = "",
  duration = 1600,
  decimal = false,
  className,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const prefersReduced = useReducedMotion();
  const [display, setDisplay] = useState(
    decimal ? value.toFixed(1) : value.toLocaleString()
  );

  useEffect(() => {
    if (!inView || prefersReduced) {
      setDisplay(decimal ? value.toFixed(1) : String(value));
      return;
    }

    let start: number | null = null;
    let raf: number;

    const step = (ts: number) => {
      if (start === null) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = value * eased;
      setDisplay(
        decimal ? current.toFixed(1) : Math.round(current).toLocaleString()
      );
      if (progress < 1) raf = requestAnimationFrame(step);
    };

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, duration, decimal, prefersReduced]);

  return (
    <span ref={ref} className={className} style={{ fontVariantNumeric: "tabular-nums" }}>
      {display}
      {suffix}
    </span>
  );
}