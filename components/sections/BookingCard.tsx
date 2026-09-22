"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  AlertCircle,
  CalendarDays,
  Clock,
  MapPin,
  MessageCircle,
  Search,
  Sparkles,
} from "lucide-react";
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
  "w-full rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-3 text-sm text-white outline-none transition-all duration-200 placeholder:text-slate-500 focus:border-accent/40 focus:bg-white/[0.06] focus:ring-1 focus:ring-accent/20 [color-scheme:dark]";

const labelClasses =
  "mb-1.5 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-slate";

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-accent">
      <AlertCircle className="h-3.5 w-3.5 shrink-0" />
      {message}
    </p>
  );
}

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
      className="mx-auto max-w-7xl scroll-mt-28 px-4 py-20 sm:px-6 lg:px-8"
    >
      <div className="relative overflow-hidden rounded-[2rem] border border-white/[0.06] bg-[#111]">
        {/* Ambient glow */}
        <div className="pointer-events-none absolute -top-40 left-1/2 h-80 w-[600px] -translate-x-1/2 rounded-full bg-accent/[0.06] blur-[100px]" />

        <div className="relative px-6 py-12 sm:px-10 sm:py-16 lg:px-16 lg:py-20">
          {/* Header */}
          <div className="text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/20 bg-accent/10 px-4 py-1.5 text-xs font-semibold text-accent">
              <Sparkles className="h-3 w-3" />
              Rental Search
            </span>
            <h2 className="mt-5 font-display text-3xl font-bold text-white sm:text-4xl">
              Find your perfect <span className="text-accent">ride</span>
            </h2>
            <p className="mx-auto mt-3 max-w-md text-sm text-slate">
              Tell us where and when — we&apos;ll match you with the right car
              and confirm availability on WhatsApp.
            </p>
          </div>

          {/* Search form */}
          <form onSubmit={handleSubmit} className="mx-auto mt-10 max-w-3xl">
            <datalist id="rental-location-suggestions">
              {LOCATION_SUGGESTIONS.map((location) => (
                <option key={location} value={location} />
              ))}
            </datalist>

            <div className="flex flex-col gap-4">
              {/* 1. Pickup location */}
              <div>
                <label htmlFor="pickup-location" className={labelClasses}>
                  <MapPin className="h-3 w-3 text-accent/70" />
                  Where To Pick Up
                </label>
                <div className="relative">
                  <MapPin className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate" />
                  <input
                    id="pickup-location"
                    list="rental-location-suggestions"
                    type="text"
                    value={form.pickupLocation}
                    onChange={(e) => update("pickupLocation", e.target.value)}
                    placeholder="Enter your City, Airport Or Address *"
                    autoComplete="off"
                    className={`${fieldClasses} pl-10 ${
                      errors.pickupLocation ? "border-accent/60" : ""
                    }`}
                  />
                </div>
                <FieldError message={errors.pickupLocation} />
              </div>

              {/* 2. Same drop-off location */}
              <label
                htmlFor="same-dropoff"
                className="flex w-fit cursor-pointer items-center gap-2.5 text-sm font-medium text-slate transition-colors duration-200 hover:text-white"
              >
                <input
                  id="same-dropoff"
                  type="checkbox"
                  checked={form.sameDropoffLocation}
                  onChange={(e) => update("sameDropoffLocation", e.target.checked)}
                  className="h-4 w-4 rounded border-white/20 bg-white/[0.04] accent-[#E31E24]"
                />
                Drop-off at same location
              </label>

              {/* Drop-off location (only when unchecked) */}
              {!form.sameDropoffLocation && (
                <div>
                  <label htmlFor="dropoff-location" className={labelClasses}>
                    <MapPin className="h-3 w-3 text-accent/70" />
                    Drop-off Location
                  </label>
                  <div className="relative">
                    <MapPin className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate" />
                    <input
                      id="dropoff-location"
                      list="rental-location-suggestions"
                      type="text"
                      value={form.dropoffLocation}
                      onChange={(e) => update("dropoffLocation", e.target.value)}
                      placeholder="Enter your City, Airport Or Address"
                      autoComplete="off"
                      className={`${fieldClasses} pl-10 ${
                        errors.dropoffLocation ? "border-accent/60" : ""
                      }`}
                    />
                  </div>
                  <FieldError message={errors.dropoffLocation} />
                </div>
              )}

              {/* 3–5. Dates + time */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div>
                  <label htmlFor="pickup-date" className={labelClasses}>
                    <CalendarDays className="h-3 w-3 text-accent/70" />
                    Pick-Up Date
                  </label>
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
                  <FieldError message={errors.pickupDate} />
                </div>

                <div>
                  <label htmlFor="pickup-time" className={labelClasses}>
                    <Clock className="h-3 w-3 text-accent/70" />
                    Pick-Up Time
                  </label>
                  <select
                    id="pickup-time"
                    value={form.pickupTime}
                    onChange={(e) => update("pickupTime", e.target.value)}
                    className={`${fieldClasses} ${
                      errors.pickupTime ? "border-accent/60" : ""
                    }`}
                  >
                    {PICKUP_TIME_OPTIONS.map((option) => (
                      <option
                        key={option.value}
                        value={option.value}
                        className="bg-[#121212]"
                      >
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <FieldError message={errors.pickupTime} />
                </div>

                <div>
                  <label htmlFor="dropoff-date" className={labelClasses}>
                    <CalendarDays className="h-3 w-3 text-accent/70" />
                    Drop-off Date
                  </label>
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
                  <FieldError message={errors.dropoffDate} />
                </div>
              </div>
            </div>

            {/* 6. Search button */}
            <div className="mt-6">
              <button
                type="submit"
                className="group/btn relative w-full overflow-hidden rounded-xl bg-accent px-6 py-4 font-display text-sm font-bold text-white shadow-lg shadow-accent/20 transition-all duration-300 hover:shadow-xl hover:shadow-accent/30"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <Search className="h-4 w-4" />
                  Search
                </span>
              </button>
            </div>

            {/* Trust note */}
            <p className="mt-4 text-center text-xs text-slate">
              No advance payment required. Pay when you receive the car.
            </p>
          </form>

          {/* Direct WhatsApp fallback */}
          <div className="mt-8 text-center">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-slate transition-colors duration-200 hover:text-white"
            >
              <MessageCircle className="h-4 w-4" />
              Prefer to chat directly?{" "}
              <span className="font-semibold text-accent">
                Message us on WhatsApp
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
