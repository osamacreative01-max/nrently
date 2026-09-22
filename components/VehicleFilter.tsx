"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import VehicleCard from "@/components/VehicleCard";
import { CATEGORIES, VEHICLES, categoryLabel, type CategoryId } from "@/lib/site";
import type { RentalSearch } from "@/lib/search";

type Filter = "all" | CategoryId;

const FILTERS: { id: Filter; label: string }[] = [
  { id: "all", label: "All Vehicles" },
  ...CATEGORIES.map((c) => ({ id: c.id as Filter, label: c.label })),
];

interface VehicleFilterProps {
  search?: RentalSearch | null;
}

export default function VehicleFilter({ search = null }: VehicleFilterProps) {
  const [filter, setFilter] = useState<Filter>("all");
  const prefersReduced = useReducedMotion();

  const vehicles = useMemo(
    () =>
      filter === "all" ? VEHICLES : VEHICLES.filter((v) => v.category === filter),
    [filter]
  );

  return (
    <section className="mx-auto max-w-7xl px-4 pb-20 pt-14 sm:px-6 lg:px-8">
      <div className="flex flex-wrap justify-center gap-2">
        {FILTERS.map((f) => (
          <button
            key={f.id}
            type="button"
            onClick={() => setFilter(f.id)}
            className={`rounded-full px-5 py-2.5 font-display text-sm font-semibold transition-all duration-300 ${
              filter === f.id
                ? "bg-accent text-white shadow-lg shadow-accent/30"
                : "border border-white/10 bg-[#121212] text-slate hover:border-accent/40 hover:text-white"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <motion.div
        layout={!prefersReduced}
        className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2"
      >
        <AnimatePresence mode="popLayout">
          {vehicles.map((vehicle) => (
            <motion.div
              key={vehicle.id}
              layout={!prefersReduced}
              initial={prefersReduced ? false : { opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={prefersReduced ? undefined : { opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              <VehicleCard
                vehicle={vehicle}
                categoryLabel={categoryLabel(vehicle.category)}
                search={search}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}