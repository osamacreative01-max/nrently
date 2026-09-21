"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

interface ParallaxProps {
  children: ReactNode;
  speed?: number;
  className?: string;
}

export default function Parallax({
  children,
  speed = 0.2,
  className,
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (prefersReduced) return;
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { yPercent: speed * 40 },
        {
          yPercent: -speed * 40,
          ease: "none",
          scrollTrigger: {
            trigger: el.parentElement,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    });

    return () => ctx.revert();
  }, [speed, prefersReduced]);

  return (
    <div ref={ref} className={`will-change-transform ${className ?? ""}`}>
      {children}
    </div>
  );
}