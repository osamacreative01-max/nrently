"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  AlertCircle,
  CalendarDays,
  Check,
  ChevronDown,
  Clock,
  MapPin,
  MessageCircle,
  Search,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { WHATSAPP_URL } from "@/lib/site";
import {
  LOCATION_SUGGESTIONS,
  PICKUP_TIME_OPTIONS,
  serializeRentalSearch,
  todayISO,
  validateRentalSearch,
  type RentalSearch,
} from "@/lib/search";

interface SearchForm {
  pickupLocation: string;
  sameDropoffLocation: boolean;
  dropoffLocation: string;
  pickupDate: string;
  pickupTime: string;
  dropoffDate: string;
}

const fieldClasses =
  "h-[52px] w-full rounded-2xl border border-neutral-200 bg-neutral-100/80 pl-11 pr-4 text-[15px] font-medium text-neutral-900 outline-none transition-all duration-200 placeholder:font-normal placeholder:text-neutral-400 focus:border-accent focus:bg-white focus:ring-4 focus:ring-accent/10 [color-scheme:light]";

const selectClasses = `${fieldClasses} cursor-pointer appearance-none pr-10`;

const labelClasses =
  "mb-2 block text-[11px] font-semibold uppercase tracking-[0.16em] text-neutral-500";

function FieldIcon({ icon: Icon }: { icon: typeof MapPin }) {
  return (
    <Icon className="pointer-events-none absolute left-4 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-neutral-400 transition-colors duration-200 group-focus-within:text-accent" />
  );
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-accent">
      <AlertCircle className="h-3.5 w-3.5 shrink-0" />
      {message}
    </p>
  );
}

const trustPoints = [
  "No advance payment",
  "Pay when you receive the car",
  "WhatsApp confirmation",
];

export default function BookingCard() {
  const router = useRouter();
  const [form, setForm] = useState<SearchForm>({
    pickupLocation: "",
    sameDropoffLocation: true,
    dropoffLocation: "",
    pickupDate: "",
    pickupTime: "12:00",
    dropoffDate: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const update = <K extends keyof SearchForm>(field: K, value: SearchForm[K]) => {
    setForm((prev) => {
      const next = { ...prev, [field]: value } as SearchForm;
      if (
        field === "pickupDate" &&
        typeof value === "string" &&
        value &&
        next.dropoffDate &&
        next.dropoffDate < value
      ) {
        next.dropoffDate = "";
      }
      return next;
    });
    setErrors((prev) => {
      const copy = { ...prev };
      const key = field as string;
      if (copy[key]) delete copy[key];
      if (field === "sameDropoffLocation" && value === true && copy.dropoffLocation) {
        delete copy.dropoffLocation;
      }
      if (field === "pickupDate" && copy.dropoffDate) {
        delete copy.dropoffDate;
      }
      return copy;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const found = validateRentalSearch(form);
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    const pickupLocation = form.pickupLocation.trim();
    const search: RentalSearch = {
      pickupLocation,
      dropoffLocation: form.sameDropoffLocation
        ? pickupLocation
        : form.dropoffLocation.trim(),
      sameDropoffLocation: form.sameDropoffLocation,
      pickupDate: form.pickupDate,
      pickupTime: form.pickupTime,
      dropoffDate: form.dropoffDate,
    };

    router.push(`/vehicles${serializeRentalSearch(search)}`);
  };

  const minDate = todayISO();

  return (
    <section
      id="booking"
      className="mx-auto max-w-6xl scroll-mt-28 px-4 py-24 sm:px-6 sm:py-28"
    >
      <div className="relative rounded-[2rem] border border-white/10 bg-white p-5 shadow-[0_45px_90px_-35px_rgba(0,0,0,0.75)] sm:p-9 lg:p-12">
        {/* Header */}
        <div className="text-center">
          <p className="flex items-center justify-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-accent">
            <span className="h-px w-10 bg-accent/40" aria-hidden="true" />
            Rental Search
            <span className="h-px w-10 bg-accent/40" aria-hidden="true" />
          </p>
          <h2 className="mt-4 font-display text-[2rem] font-bold leading-tight text-neutral-900 sm:text-4xl">
            Find your perfect <span className="text-accent">ride</span>
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-neutral-500 sm:text-base">
            Tell us where and when — we&apos;ll match you with the right car and
            confirm availability on WhatsApp.
          </p>
        </div>

        {/* Search form */}
        <form onSubmit={handleSubmit} className="mx-auto mt-9 max-w-5xl">
          <datalist id="rental-location-suggestions">
            {LOCATION_SUGGESTIONS.map((location) => (
              <option key={location} value={location} />
            ))}
          </datalist>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1.7fr_1fr_1fr_1fr_auto] lg:items-end lg:gap-4">
            {/* Pickup location */}
            <div className="lg:order-1">
              <label htmlFor="pickup-location" className={labelClasses}>
                Where To Pick Up
              </label>
              <div className="group relative">
                <FieldIcon icon={MapPin} />
                <input
                  id="pickup-location"
                  list="rental-location-suggestions"
                  type="text"
                  value={form.pickupLocation}
                  onChange={(e) => update("pickupLocation", e.target.value)}
                  placeholder="Enter your City, Airport Or Address *"
                  autoComplete="off"
                  className={`${fieldClasses} ${
                    errors.pickupLocation ? "border-accent/60" : ""
                  }`}
                />
              </div>
              <FieldError message={errors.pickupLocation} />
            </div>

            {/* Pick-Up Date */}
            <div className="lg:order-2">
              <label htmlFor="pickup-date" className={labelClasses}>
                Pick-Up Date
              </label>
              <div className="group relative">
                <FieldIcon icon={CalendarDays} />
                <input
                  id="pickup-date"
                  type="date"
                  value={form.pickupDate}
                  min={minDate}
                  onChange={(e) => update("pickupDate", e.target.value)}
                  className={`${fieldClasses} ${
                    errors.pickupDate ? "border-accent/60" : ""
                  }`}
                />
              </div>
              <FieldError message={errors.pickupDate} />
            </div>

            {/* Pick-Up Time */}
            <div className="lg:order-3">
              <label htmlFor="pickup-time" className={labelClasses}>
                Pick-Up Time
              </label>
              <div className="group relative">
                <FieldIcon icon={Clock} />
                <select
                  id="pickup-time"
                  value={form.pickupTime}
                  onChange={(e) => update("pickupTime", e.target.value)}
                  className={`${selectClasses} ${
                    errors.pickupTime ? "border-accent/60" : ""
                  }`}
                >
                  {PICKUP_TIME_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400 transition-colors duration-200 group-focus-within:text-accent" />
              </div>
              <FieldError message={errors.pickupTime} />
            </div>

            {/* Drop-off Date */}
            <div className="lg:order-4">
              <label htmlFor="dropoff-date" className={labelClasses}>
                Drop-off Date
              </label>
              <div className="group relative">
                <FieldIcon icon={CalendarDays} />
                <input
                  id="dropoff-date"
                  type="date"
                  value={form.dropoffDate}
                  min={form.pickupDate || minDate}
                  onChange={(e) => update("dropoffDate", e.target.value)}
                  className={`${fieldClasses} ${
                    errors.dropoffDate ? "border-accent/60" : ""
                  }`}
                />
              </div>
              <FieldError message={errors.dropoffDate} />
            </div>

            {/* Search button */}
            <div className="lg:order-5">
              <button
                type="submit"
                className="flex h-[52px] w-full items-center justify-center gap-2.5 rounded-2xl bg-accent px-7 font-display text-sm font-bold text-white shadow-lg shadow-accent/25 transition-all duration-300 hover:bg-[#c2262b] hover:shadow-xl hover:shadow-accent/30 active:scale-[0.99]"
              >
                <Search className="h-[18px] w-[18px]" />
                Search Cars
              </button>
            </div>

            {/* Same drop-off location */}
            <div className="flex items-center justify-center lg:order-6 lg:col-span-full lg:justify-start">
              <button
                type="button"
                role="switch"
                aria-checked={form.sameDropoffLocation}
                onClick={() =>
                  update("sameDropoffLocation", !form.sameDropoffLocation)
                }
                className="group inline-flex cursor-pointer items-center gap-3"
              >
                <span
                  className={`relative h-6 w-[42px] shrink-0 rounded-full transition-colors duration-200 ${
                    form.sameDropoffLocation ? "bg-accent" : "bg-neutral-300"
                  }`}
                >
                  <span
                    className={`absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow-md transition-transform duration-200 ${
                      form.sameDropoffLocation ? "translate-x-4" : ""
                    }`}
                  />
                </span>
                <span
                  className={`text-sm font-medium transition-colors duration-200 ${
                    form.sameDropoffLocation
                      ? "text-neutral-900"
                      : "text-neutral-500 group-hover:text-neutral-800"
                  }`}
                >
                  Drop-off at same location
                </span>
              </button>
            </div>

            {/* Drop-off location (animated, only when unchecked) */}
            <AnimatePresence initial={false}>
              {!form.sameDropoffLocation && (
                <motion.div
                  key="dropoff-location"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.22, ease: "easeOut" }}
                  className="overflow-hidden lg:order-7 lg:col-span-full"
                >
                  <div className="pb-1">
                    <label htmlFor="dropoff-location" className={labelClasses}>
                      Drop-off Location
                    </label>
                    <div className="group relative">
                      <FieldIcon icon={MapPin} />
                      <input
                        id="dropoff-location"
                        list="rental-location-suggestions"
                        type="text"
                        value={form.dropoffLocation}
                        onChange={(e) => update("dropoffLocation", e.target.value)}
                        placeholder="Enter your City, Airport Or Address"
                        autoComplete="off"
                        className={`${fieldClasses} ${
                          errors.dropoffLocation ? "border-accent/60" : ""
                        }`}
                      />
                    </div>
                    <FieldError message={errors.dropoffLocation} />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Trust indicators */}
          <div className="mt-7 flex flex-wrap items-center justify-center gap-x-7 gap-y-3 lg:justify-start">
            {trustPoints.map((point) => (
              <span
                key={point}
                className="flex items-center gap-2 text-[13px] font-medium text-neutral-500"
              >
                <span className="flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full bg-mint/15">
                  <Check className="h-3 w-3 text-mint" strokeWidth={3} />
                </span>
                {point}
              </span>
            ))}
          </div>
        </form>

        {/* Direct WhatsApp fallback */}
        <div className="mt-8 text-center">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-neutral-500 transition-colors duration-200 hover:text-neutral-900"
          >
            <MessageCircle className="h-4 w-4" />
            Prefer to chat directly?{" "}
            <span className="font-semibold text-accent">
              Message us on WhatsApp
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}