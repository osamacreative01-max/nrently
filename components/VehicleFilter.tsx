"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { CarFront, RotateCcw, Search, Users } from "lucide-react";
import VehicleCard from "@/components/VehicleCard";
import { CATEGORIES, VEHICLES, categoryLabel, type CategoryId } from "@/lib/site";
import type { RentalSearch } from "@/lib/search";

type CategoryFilter = "all" | CategoryId;
type TransmissionFilter = "all" | "Automatic" | "Manual";

const CATEGORY_FILTERS: { id: CategoryFilter; label: string }[] = [
  { id: "all", label: "All Vehicles" },
  ...CATEGORIES.map((c) => ({ id: c.id as CategoryFilter, label: c.label })),
];

const TRANSMISSION_FILTERS: { id: TransmissionFilter; label: string }[] = [
  { id: "all", label: "Any Gearbox" },
  { id: "Automatic", label: "Automatic" },
  { id: "Manual", label: "Manual" },
];

const SEAT_OPTIONS = Array.from(new Set(VEHICLES.map((v) => v.seats))).sort(
  (a, b) => a - b
);

interface VehicleFilterProps {
  search?: RentalSearch | null;
}

export default function VehicleFilter({ search = null }: VehicleFilterProps) {
  const [category, setCategory] = useState<CategoryFilter>("all");
  const [transmission, setTransmission] = useState<TransmissionFilter>("all");
  const [minSeats, setMinSeats] = useState<number | null>(null);
  const [query, setQuery] = useState("");
  const prefersReduced = useReducedMotion();

  const vehicles = useMemo(() => {
    const q = query.trim().toLowerCase();
    return VEHICLES.filter((v) => {
      if (category !== "all" && v.category !== category) return false;
      if (transmission !== "all" && v.transmission !== transmission)
        return false;
      if (minSeats !== null && v.seats < minSeats) return false;
      if (q && !`${v.name} ${v.fuel} ${v.transmission}`.toLowerCase().includes(q))
        return false;
      return true;
    });
  }, [category, transmission, minSeats, query]);

  const hasActiveFilters =
    category !== "all" || transmission !== "all" || minSeats !== null || query.trim() !== "";

  const clearFilters = () => {
    setCategory("all");
    setTransmission("all");
    setMinSeats(null);
    setQuery("");
  };

  const chipActive = "bg-accent text-white shadow-lg shadow-accent/30";
  const chipIdle =
    "border border-white/10 bg-[#121212] text-slate hover:border-accent/40 hover:text-white";

  return (
    <section className="mx-auto max-w-7xl px-4 pb-20 pt-8 sm:px-6 lg:px-8">
      {/* Search bar */}
      <form
        onSubmit={(e) => e.preventDefault()}
        className="mx-auto flex max-w-xl items-center gap-2 rounded-2xl border border-white/10 bg-[#121212] px-3 py-1 transition-colors focus-within:border-accent/40 sm:px-4"
      >
        <Search className="h-4 w-4 shrink-0 text-accent" />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by model, e.g. Corolla, Civic…"
          aria-label="Search vehicles by model"
          className="w-full min-w-0 bg-transparent py-2.5 text-xs text-white outline-none placeholder:text-slate-500 sm:py-3 sm:text-sm"
        />
      </form>

      {/* Category pills */}
      <div className="mt-6 flex flex-wrap justify-center gap-2">
        {CATEGORY_FILTERS.map((f) => (
          <button
            key={f.id}
            type="button"
            onClick={() => setCategory(f.id)}
            className={`rounded-full px-5 py-2.5 font-display text-sm font-semibold transition-all duration-300 ${
              category === f.id ? chipActive : chipIdle
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Transmission + seats */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2 sm:gap-x-4 sm:gap-y-2">
        <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
          {TRANSMISSION_FILTERS.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setTransmission(f.id)}
              className={`rounded-full px-3 py-2 text-[11px] font-semibold transition-all duration-300 sm:px-4 sm:text-xs ${
                transmission === f.id ? chipActive : chipIdle
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <label className="flex items-center gap-2 rounded-full border border-white/10 bg-[#121212] px-3 py-2 text-[11px] font-semibold text-slate sm:px-4 sm:text-xs">
          <Users className="h-3.5 w-3.5 text-accent" />
          Seats
          <select
            value={minSeats ?? ""}
            onChange={(e) =>
              setMinSeats(e.target.value ? Number(e.target.value) : null)
            }
            aria-label="Minimum seats"
            className="cursor-pointer bg-transparent text-white outline-none"
          >
            <option value="">Any</option>
            {SEAT_OPTIONS.map((seats) => (
              <option key={seats} value={seats}>
                {seats}+
              </option>
            ))}
          </select>
        </label>
      </div>

      {/* Result count + clear */}
      <div className="mt-5 flex flex-wrap items-center justify-center gap-3 sm:mt-6 sm:gap-4">
        <p className="text-xs font-medium uppercase tracking-widest text-slate">
          {vehicles.length} {vehicles.length === 1 ? "vehicle" : "vehicles"}
        </p>
        {hasActiveFilters && (
          <button
            type="button"
            onClick={clearFilters}
            className="inline-flex items-center gap-1.5 rounded-full border border-white/10 px-4 py-1.5 text-xs font-semibold text-slate transition-colors hover:border-accent/40 hover:text-white"
          >
            <RotateCcw className="h-3 w-3 text-accent" />
            Clear filters
          </button>
        )}
      </div>

      {/* Grid / empty state */}
      {vehicles.length === 0 ? (
        <div           className="mt-8 flex flex-col items-center rounded-2xl border border-line bg-[#121212] px-5 py-12 text-center sm:mt-10 sm:px-6 sm:py-16">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/5 text-slate">
            <CarFront className="h-8 w-8" />
          </div>
          <h2 className="mt-5 font-display text-xl font-bold text-white">
            No vehicles match your filters
          </h2>
          <p className="mt-2 max-w-sm text-sm text-slate">
            Try clearing your filters, or message us on WhatsApp — we may have
            the perfect car for you.
          </p>
          <button
            type="button"
            onClick={clearFilters}
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 font-display text-sm font-semibold text-white shadow-lg shadow-accent/25 transition-all duration-300 hover:bg-accent/90"
          >
            <RotateCcw className="h-4 w-4" />
            Clear filters
          </button>
        </div>
      ) : (
        <motion.div
          layout={!prefersReduced}
          className="mt-8 grid grid-cols-1 gap-5 sm:mt-10 sm:grid-cols-2 sm:gap-6"
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
      )}
    </section>
  );
}