"use client";

import { useState } from "react";
import {
  AlertCircle,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  Clock,
  Loader2,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  User,
} from "lucide-react";
import { type Vehicle } from "@/lib/site";
import {
  LOCATION_SUGGESTIONS,
  PICKUP_TIME_OPTIONS,
  buildWhatsAppMessage,
  buildWhatsAppUrl,
  formatRentalDate,
  formatRentalTime,
  todayISO,
  validateRentalSearch,
  type RentalSearch,
  type RentalSearchFormValues,
} from "@/lib/search";

interface VehicleBookingProps {
  vehicle: Vehicle;
  search: RentalSearch | null;
}

const fieldClasses =
  "w-full min-w-0 rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-3 text-sm text-white outline-none transition-all duration-200 placeholder:text-slate-500 focus:border-accent/40 focus:bg-white/[0.06] focus:ring-1 focus:ring-accent/20 min-h-[44px] [color-scheme:dark]";

const selectClasses = `${fieldClasses} cursor-pointer appearance-none pr-10`;

const labelClasses =
  "mb-1.5 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-slate";

const INITIAL_DRAFT: RentalSearchFormValues = {
  pickupLocation: "",
  sameDropoffLocation: true,
  dropoffLocation: "",
  pickupDate: "",
  pickupTime: "12:00",
  dropoffDate: "",
  dropoffTime: "12:00",
};

function MiniError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-accent">
      <AlertCircle className="h-3.5 w-3.5 shrink-0" />
      {message}
    </p>
  );
}

export default function VehicleBooking({ vehicle, search }: VehicleBookingProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    phone?: string;
  }>({});
  const [emailStatus, setEmailStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const [emailError, setEmailError] = useState("");

  const [draft, setDraft] = useState<RentalSearchFormValues>(INITIAL_DRAFT);
  const [inlineSearch, setInlineSearch] = useState<RentalSearch | null>(null);
  const [inlineErrors, setInlineErrors] = useState<Record<string, string>>({});

  const activeSearch = search ?? inlineSearch;

  const waHref = buildWhatsAppUrl({
    vehicleName: vehicle.name,
    search: activeSearch,
    name,
    phone,
  });
  const clientMessage = buildWhatsAppMessage({
    vehicleName: vehicle.name,
    search: activeSearch,
    name,
    phone,
  });

  const updateDraft = <K extends keyof RentalSearchFormValues>(
    field: K,
    value: RentalSearchFormValues[K]
  ) => {
    setDraft((prev) => {
      const next = { ...prev, [field]: value } as RentalSearchFormValues;
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
    setInlineErrors((prev) => {
      const copy = { ...prev };
      const key = field as string;
      if (copy[key]) delete copy[key];
      if (
        field === "sameDropoffLocation" &&
        value === true &&
        copy.dropoffLocation
      ) {
        delete copy.dropoffLocation;
      }
      if (field === "pickupDate" && copy.dropoffDate) {
        delete copy.dropoffDate;
      }
      return copy;
    });
  };

  const applyInlineSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const found = validateRentalSearch(draft);
    setInlineErrors(found);
    if (Object.keys(found).length > 0) return;

    const pickupLocation = draft.pickupLocation.trim();
    const next: RentalSearch = {
      pickupLocation,
      dropoffLocation: draft.sameDropoffLocation
        ? pickupLocation
        : draft.dropoffLocation.trim(),
      sameDropoffLocation: draft.sameDropoffLocation,
      pickupDate: draft.pickupDate,
      pickupTime: draft.pickupTime,
      dropoffDate: draft.dropoffDate,
      dropoffTime: draft.dropoffTime,
    };
    setInlineSearch(next);
  };

  const buildPayload = () => ({
    name: name.trim(),
    email: email.trim(),
    phone: phone.trim(),
    carType: vehicle.name,
    pickupLocation: activeSearch?.pickupLocation ?? "",
    dropoffLocation: activeSearch?.dropoffLocation ?? "",
    pickupDate: activeSearch?.pickupDate ?? "",
    pickupTime: activeSearch?.pickupTime ?? "",
    dropoffDate: activeSearch?.dropoffDate ?? "",
    dropoffTime: activeSearch?.dropoffTime ?? "",
    clientMessage,
  });

  const validate = (): boolean => {
    const next: { name?: string; email?: string; phone?: string } = {};
    if (!name.trim()) next.name = "Please enter your name.";
    if (!email.trim()) {
      next.email = "Please enter your email address.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      next.email = "Please enter a valid email address.";
    }
    if (!phone.trim()) {
      next.phone = "Please enter your phone number.";
    } else if (
      !/^(\+?92|0)3\d{2}[- ]?\d{7}$/.test(phone.trim())
    ) {
      next.phone = "Please enter a valid Pakistani phone number.";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!validate()) {
      e.preventDefault();
      return;
    }

    // Only fire the booking-email flow when a full rental search is present;
    // otherwise the WhatsApp message alone carries the booking request.
    if (!activeSearch?.pickupLocation || !activeSearch?.pickupDate) return;

    // Preserve the existing booking-email flow alongside WhatsApp, so the same
    // message also reaches the customer and owner email without extra clicks.
    void fetch("/api/send-booking", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(buildPayload()),
    }).catch(() => {});
  };

  const handleEmailBooking = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!validate()) return;

    setEmailStatus("sending");
    setEmailError("");
    try {
      const res = await fetch("/api/send-booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(buildPayload()),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong.");
      setEmailStatus("success");
    } catch (err) {
      setEmailStatus("error");
      setEmailError(err instanceof Error ? err.message : "Failed to send.");
    }
  };

  const rentalRows = activeSearch
    ? [
        {
          icon: MapPin,
          label: "Pickup Location",
          value: activeSearch.pickupLocation,
        },
        {
          icon: MapPin,
          label: "Drop-off Location",
          value: activeSearch.dropoffLocation || activeSearch.pickupLocation,
        },
        {
          icon: CalendarDays,
          label: "Pickup Date",
          value: formatRentalDate(activeSearch.pickupDate),
        },
        {
          icon: Clock,
          label: "Pickup Time",
          value: formatRentalTime(activeSearch.pickupTime),
        },
        {
          icon: CalendarDays,
          label: "Drop-off Date",
          value: formatRentalDate(activeSearch.dropoffDate),
        },
        ...(activeSearch.dropoffTime
          ? [
              {
                icon: Clock,
                label: "Drop-off Time",
                value: formatRentalTime(activeSearch.dropoffTime),
              },
            ]
          : []),
      ]
    : [];

  const minDate = todayISO();

  return (
    <div className="mt-6 rounded-2xl border border-line bg-[#121212] p-4 sm:mt-8 sm:p-6">
      <h2 className="font-display text-sm font-bold text-white sm:text-base">
        Booking details
      </h2>

      {activeSearch ? (
        <dl className="mt-3 grid grid-cols-1 gap-2.5 sm:mt-4 sm:grid-cols-2 sm:gap-3">
          {rentalRows.map((row) => (
            <div
              key={row.label}
              className="rounded-xl border border-white/[0.06] bg-white/[0.03] px-3 py-2.5 sm:px-4 sm:py-3"
            >
              <dt className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-slate">
                <row.icon className="h-3 w-3 text-accent" />
                {row.label}
              </dt>
              <dd className="mt-1 break-words text-sm font-medium text-white">{row.value}</dd>
            </div>
          ))}
        </dl>
      ) : (
        <form
          onSubmit={applyInlineSearch}
          className="mt-4 grid grid-cols-1 gap-3 rounded-xl border border-white/10 bg-white/[0.04] p-3 sm:mt-5 sm:grid-cols-2 sm:gap-4 sm:p-5"
        >
          <p className="text-xs leading-relaxed text-slate sm:col-span-2 sm:text-sm">
            Enter when and where you want{" "}
            <span className="font-semibold text-white">{vehicle.name}</span> so
            we can confirm availability — no need to leave this page or start
            over.
          </p>

          <datalist id="booking-location-suggestions">
            {LOCATION_SUGGESTIONS.map((location) => (
              <option key={location} value={location} />
            ))}
          </datalist>

          <div className="min-w-0 sm:col-span-2">
            <label htmlFor="book-pickup-location" className={labelClasses}>
              <MapPin className="h-3 w-3 text-accent/70" />
              Pickup Location
            </label>
            <div className="group relative">
              <input
                id="book-pickup-location"
                list="booking-location-suggestions"
                type="text"
                value={draft.pickupLocation}
                onChange={(e) => updateDraft("pickupLocation", e.target.value)}
                placeholder="Enter City, Airport or Address"
                autoComplete="off"
                className={`${fieldClasses} ${
                  inlineErrors.pickupLocation ? "border-accent/60" : ""
                }`}
              />
            </div>
            <MiniError message={inlineErrors.pickupLocation} />
          </div>

          <div>
            <label htmlFor="book-pickup-date" className={labelClasses}>
              <CalendarDays className="h-3 w-3 text-accent/70" />
              Pickup Date
            </label>
            <div className="group relative">
              <input
                id="book-pickup-date"
                type="date"
                value={draft.pickupDate}
                min={minDate}
                onChange={(e) => updateDraft("pickupDate", e.target.value)}
                className={`${fieldClasses} ${
                  inlineErrors.pickupDate ? "border-accent/60" : ""
                }`}
              />
            </div>
            <MiniError message={inlineErrors.pickupDate} />
          </div>

          <div>
            <label htmlFor="book-pickup-time" className={labelClasses}>
              <Clock className="h-3 w-3 text-accent/70" />
              Pickup Time
            </label>
            <div className="group relative">
              <select
                id="book-pickup-time"
                value={draft.pickupTime}
                onChange={(e) => updateDraft("pickupTime", e.target.value)}
                className={`${selectClasses} ${
                  inlineErrors.pickupTime ? "border-accent/60" : ""
                }`}
              >
                {PICKUP_TIME_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
            </div>
            <MiniError message={inlineErrors.pickupTime} />
          </div>

          <div>
            <label htmlFor="book-dropoff-date" className={labelClasses}>
              <CalendarDays className="h-3 w-3 text-accent/70" />
              Drop-off Date
            </label>
            <div className="group relative">
              <input
                id="book-dropoff-date"
                type="date"
                value={draft.dropoffDate}
                min={draft.pickupDate || minDate}
                onChange={(e) => updateDraft("dropoffDate", e.target.value)}
                className={`${fieldClasses} ${
                  inlineErrors.dropoffDate ? "border-accent/60" : ""
                }`}
              />
            </div>
            <MiniError message={inlineErrors.dropoffDate} />
          </div>

          <div>
            <label htmlFor="book-dropoff-time" className={labelClasses}>
              <Clock className="h-3 w-3 text-accent/70" />
              Drop-off Time
            </label>
            <div className="group relative">
              <select
                id="book-dropoff-time"
                value={draft.dropoffTime}
                onChange={(e) => updateDraft("dropoffTime", e.target.value)}
                className={`${selectClasses} ${
                  inlineErrors.dropoffTime ? "border-accent/60" : ""
                }`}
              >
                {PICKUP_TIME_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
            </div>
            <MiniError message={inlineErrors.dropoffTime} />
          </div>

          {!draft.sameDropoffLocation && (
            <div className="min-w-0 sm:col-span-2">
              <label htmlFor="book-dropoff-location" className={labelClasses}>
                <MapPin className="h-3 w-3 text-accent/70" />
                Drop-off Location
              </label>
              <div className="group relative">
                <input
                  id="book-dropoff-location"
                  list="booking-location-suggestions"
                  type="text"
                  value={draft.dropoffLocation}
                  onChange={(e) => updateDraft("dropoffLocation", e.target.value)}
                  placeholder="Enter City, Airport or Address"
                  autoComplete="off"
                  className={`${fieldClasses} ${
                    inlineErrors.dropoffLocation ? "border-accent/60" : ""
                  }`}
                />
              </div>
              <MiniError message={inlineErrors.dropoffLocation} />
            </div>
          )}

          <div className="sm:col-span-2">
            <button
              type="button"
              role="switch"
              aria-checked={draft.sameDropoffLocation}
              onClick={() =>
                updateDraft(
                  "sameDropoffLocation",
                  !draft.sameDropoffLocation
                )
              }
              className="group inline-flex w-fit items-center gap-3 rounded-xl px-1 py-1"
            >
              <span
                className={`relative h-6 w-[42px] shrink-0 rounded-full transition-colors duration-200 ${
                  draft.sameDropoffLocation ? "bg-accent" : "bg-white/15"
                }`}
              >
                <span
                  className={`absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow-md transition-transform duration-200 ${
                    draft.sameDropoffLocation ? "translate-x-4" : ""
                  }`}
                />
              </span>
              <span
                className={`text-sm font-medium transition-colors duration-200 ${
                  draft.sameDropoffLocation
                    ? "text-white"
                    : "text-slate-400 group-hover:text-slate-200"
                }`}
              >
                Drop-off at same location
              </span>
            </button>
          </div>

          <button
            type="submit"
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-accent/10 px-6 py-3.5 font-display text-sm font-bold text-accent transition-all duration-300 hover:bg-accent hover:text-white sm:col-span-2"
          >
            <CalendarDays className="h-4 w-4" />
            Add rental details &amp; continue
          </button>
        </form>
      )}

      {/* Customer details */}
      <div className="mt-4 grid grid-cols-1 gap-3 sm:mt-5 sm:grid-cols-2 sm:gap-4">
        <div>
          <label htmlFor="customer-name" className={labelClasses}>
            <User className="h-3 w-3 text-accent/70" />
            Customer Name
          </label>
          <input
            id="customer-name"
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
            }}
            placeholder="Enter your name"
            autoComplete="name"
            className={`${fieldClasses} ${errors.name ? "border-accent/60" : ""}`}
          />
          {errors.name && (
            <p className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-accent">
              <AlertCircle className="h-3.5 w-3.5 shrink-0" />
              {errors.name}
            </p>
          )}
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="customer-email" className={labelClasses}>
            <Mail className="h-3 w-3 text-accent/70" />
            Email Address
          </label>
          <input
            id="customer-email"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (errors.email)
                setErrors((prev) => ({ ...prev, email: undefined }));
            }}
            placeholder="you@example.com"
            autoComplete="email"
            className={`${fieldClasses} ${
              errors.email ? "border-accent/60" : ""
            }`}
          />
          {errors.email && (
            <p className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-accent">
              <AlertCircle className="h-3.5 w-3.5 shrink-0" />
              {errors.email}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="customer-phone" className={labelClasses}>
            <Phone className="h-3 w-3 text-accent/70" />
            Phone Number
          </label>
          <input
            id="customer-phone"
            type="tel"
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
              if (errors.phone)
                setErrors((prev) => ({ ...prev, phone: undefined }));
            }}
            placeholder="03XX-XXXXXXX"
            autoComplete="tel"
            className={`${fieldClasses} ${errors.phone ? "border-accent/60" : ""}`}
          />
          {errors.phone && (
            <p className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-accent">
              <AlertCircle className="h-3.5 w-3.5 shrink-0" />
              {errors.phone}
            </p>
          )}
        </div>
      </div>

      {/* WhatsApp confirmation */}
      <a
        href={waHref}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-mint px-6 py-4 font-display text-sm font-bold text-white shadow-lg shadow-mint/20 transition-all duration-300 hover:shadow-xl hover:shadow-mint/30 sm:mt-5"
      >
        <MessageCircle className="h-4 w-4" />
        Book on WhatsApp
      </a>

      <div className="mt-2.5 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-wider text-slate sm:mt-3">
        <span className="h-px flex-1 bg-white/10" />
        or
        <span className="h-px flex-1 bg-white/10" />
      </div>

      {/* Email confirmation */}
      <button
        type="button"
        onClick={handleEmailBooking}
        disabled={emailStatus === "sending"}
        className="mt-2.5 flex w-full items-center justify-center gap-2 rounded-xl border border-accent/40 bg-accent/10 px-6 py-4 font-display text-sm font-bold text-accent transition-all duration-300 hover:bg-accent hover:text-white disabled:cursor-not-allowed disabled:opacity-60 sm:mt-3"
      >
        {emailStatus === "sending" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Sending...
          </>
        ) : (
          <>
            <Mail className="h-4 w-4" />
            Book via Email
          </>
        )}
      </button>

      {emailStatus === "success" && (
        <p className="mt-3 flex items-center justify-center gap-2 rounded-xl bg-mint/10 px-3 py-3 text-xs font-medium text-mint sm:px-4 sm:text-sm">
          <CheckCircle2 className="h-4 w-4 shrink-0" />
          Booking request sent! A confirmation copy has been emailed to you.
        </p>
      )}
      {emailStatus === "error" && (
        <p className="mt-3 flex items-center justify-center gap-2 rounded-xl bg-accent/10 px-3 py-3 text-xs font-medium text-accent sm:px-4 sm:text-sm">
          <AlertCircle className="h-4 w-4 shrink-0" />
          {emailError}
        </p>
      )}

      <p className="mt-3 text-center text-xs text-slate sm:mt-4">
        No advance payment required. Pay when you receive the car.
      </p>
    </div>
  );
}