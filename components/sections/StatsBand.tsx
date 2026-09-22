import CountUp from "@/components/ui/CountUp";
import Reveal from "@/components/ui/Reveal";
import { STATS } from "@/lib/site";

export default function StatsBand() {
  return (
    <section className="relative overflow-hidden bg-night py-12 sm:py-16 lg:py-20">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/10 blur-3xl" />
      <div className="relative mx-auto grid max-w-7xl grid-cols-2 gap-5 px-4 sm:gap-8 sm:px-6 lg:grid-cols-4 lg:px-8">
        {STATS.map((stat, i) => (
          <Reveal key={stat.label} delay={i * 0.08} className="text-center">
            <p className="font-display text-3xl font-extrabold text-accent sm:text-4xl lg:text-5xl">
              <CountUp
                value={stat.value}
                suffix={stat.suffix}
                decimal={"decimal" in stat && stat.decimal}
              />
            </p>
            <p className="mt-2 text-xs font-medium uppercase tracking-wide text-slate-300 sm:text-sm">
              {stat.label}
            </p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}