"use client";

import { useState } from "react";
import {
  CalendarDays,
  Car,
  CheckCircle2,
  AlertCircle,
  MapPin,
  MessageCircle,
  User,
  ArrowRight,
  Loader2,
  Phone,
  Sparkles,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { BOOKING, WHATSAPP_URL } from "@/lib/site";

interface FormData {
  name: string;
  phone: string;
  carType: string;
  pickupLocation: string;
  pickupDate: string;
}

export default function BookingCard() {
  const [form, setForm] = useState<FormData>({
    name: "",
    phone: "",
    carType: BOOKING.carTypes[0],
    pickupLocation: BOOKING.locations[0],
    pickupDate: "",
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const update = (field: keyof FormData, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const validate = (): string | null => {
    if (!form.name.trim()) return "Please enter your name.";
    if (!form.phone.trim()) return "Please enter your phone number.";
    if (!form.pickupDate) return "Please select a pick-up date.";
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("idle");

    const error = validate();
    if (error) {
      setErrorMsg(error);
      setStatus("error");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/send-booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong.");

      setStatus("success");
      setForm({
        name: "",
        phone: "",
        carType: BOOKING.carTypes[0],
        pickupLocation: BOOKING.locations[0],
        pickupDate: "",
      });
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Failed to send.");
    } finally {
      setLoading(false);
    }
  };

  const fields = [
    {
      icon: Car,
      label: "Vehicle",
      type: "select" as const,
      value: form.carType,
      field: "carType" as const,
      options: BOOKING.carTypes,
    },
    {
      icon: User,
      label: "Your Name",
      type: "text" as const,
      value: form.name,
      field: "name" as const,
      placeholder: "Enter your name",
    },
    {
      icon: Phone,
      label: "Phone",
      type: "tel" as const,
      value: form.phone,
      field: "phone" as const,
      placeholder: "03XX-XXXXXXX",
    },
    {
      icon: MapPin,
      label: "Pickup City",
      type: "select" as const,
      value: form.pickupLocation,
      field: "pickupLocation" as const,
      options: BOOKING.locations,
    },
    {
      icon: CalendarDays,
      label: "Travel Date",
      type: "date" as const,
      value: form.pickupDate,
      field: "pickupDate" as const,
    },
  ];

  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="relative overflow-hidden rounded-[2rem] border border-white/[0.06] bg-[#111]">
        {/* Ambient glow */}
        <div className="pointer-events-none absolute -top-40 left-1/2 h-80 w-[600px] -translate-x-1/2 rounded-full bg-accent/[0.06] blur-[100px]" />

        <div className="relative px-6 py-12 sm:px-10 sm:py-16 lg:px-16 lg:py-20">
          {/* Header */}
          <div className="text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/20 bg-accent/10 px-4 py-1.5 text-xs font-semibold text-accent">
              <Sparkles className="h-3 w-3" />
              Quick Booking
            </span>
            <h2 className="mt-5 font-display text-3xl font-bold text-white sm:text-4xl">
              Book your ride in{" "}
              <span className="text-accent">30 seconds</span>
            </h2>
            <p className="mx-auto mt-3 max-w-md text-sm text-slate">
              Fill in the details below and we&apos;ll confirm availability on WhatsApp instantly.
            </p>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="mx-auto mt-10 grid max-w-3xl grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-3 lg:gap-4"
          >
            {fields.map((f) => (
              <div key={f.field} className="group relative">
                <label className="mb-1.5 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-slate">
                  <f.icon className="h-3 w-3 text-accent/70" />
                  {f.label}
                </label>
                {f.type === "select" ? (
                  <select
                    value={f.value}
                    onChange={(e) => update(f.field, e.target.value)}
                    className="w-full rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-3 text-sm text-white outline-none transition-all duration-200 focus:border-accent/40 focus:bg-white/[0.06] focus:ring-1 focus:ring-accent/20"
                  >
                    {f.options?.map((opt) => (
                      <option key={opt} className="bg-[#121212]">
                        {opt}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={f.type}
                    value={f.value}
                    onChange={(e) => update(f.field, e.target.value)}
                    placeholder={f.placeholder}
                    className="w-full rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-3 text-sm text-white outline-none transition-all duration-200 placeholder:text-slate-500 focus:border-accent/40 focus:bg-white/[0.06] focus:ring-1 focus:ring-accent/20"
                  />
                )}
              </div>
            ))}

            {/* Status */}
            <AnimatePresence mode="wait">
              {status === "success" && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-2 rounded-xl bg-emerald-500/10 px-4 py-3 text-sm text-emerald-400 sm:col-span-2"
                >
                  <CheckCircle2 className="h-4 w-4 shrink-0" />
                  Booking request sent! We&apos;ll confirm on WhatsApp shortly.
                </motion.div>
              )}
              {status === "error" && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-2 rounded-xl bg-accent/10 px-4 py-3 text-sm text-accent sm:col-span-2"
                >
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  {errorMsg}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Submit */}
            <div className="sm:col-span-2">
              <button
                type="submit"
                disabled={loading}
                className="group/btn relative w-full overflow-hidden rounded-xl bg-accent px-6 py-4 font-display text-sm font-bold text-white shadow-lg shadow-accent/20 transition-all duration-300 hover:shadow-xl hover:shadow-accent/30 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <MessageCircle className="h-4 w-4" />
                      Check Availability
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                    </>
                  )}
                </span>
              </button>
            </div>

            {/* Trust note */}
            <p className="text-center text-xs text-slate sm:col-span-2">
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
              <span className="font-semibold text-accent">Message us on WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
