"use client";

import { useState } from "react";
import {
  AlertCircle,
  CheckCircle2,
  Loader2,
  MessageCircle,
  Send,
} from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { WHATSAPP_URL } from "@/lib/site";

const FIELD =
  "w-full rounded-xl border border-line bg-[#121212] px-4 py-3.5 text-sm text-ink placeholder:text-slate-400 outline-none transition-all duration-200 focus:border-accent/40 focus:ring-2 focus:ring-accent/20";
const LABEL =
  "mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate";

type Status = "idle" | "sending" | "success" | "error";

interface ContactFormState {
  name: string;
  phone: string;
  email: string;
  message: string;
}

export default function ContactForm() {
  const [form, setForm] = useState<ContactFormState>({
    name: "",
    phone: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<Partial<ContactFormState>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const update = (key: keyof ContactFormState) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((f) => ({ ...f, [key]: e.target.value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const validate = (): boolean => {
    const next: Partial<ContactFormState> = {};
    const { name, phone, email, message } = form;
    if (!name.trim()) next.name = "Please enter your name.";
    if (!phone.trim()) {
      next.phone = "Please enter your phone number.";
    } else if (!/^[+0-9][0-9 ()\-]{6,19}$/.test(phone.trim())) {
      next.phone = "Please enter a valid phone number (e.g. 0306-6556934).";
    }
    if (email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      next.email = "Please enter a valid email address.";
    }
    if (!message.trim()) next.message = "Please enter a message.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus("sending");
    setErrorMessage("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          phone: form.phone.trim(),
          email: form.email.trim(),
          message: form.message.trim(),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong.");
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again."
      );
    }
  };

  return (
    <Reveal>
      <SectionHeading
        align="left"
        eyebrow="Send a Message"
        title="Tell us what you need"
        subtitle="Fill the form and we'll follow up — or skip straight to WhatsApp for instant answers."
      />

      <form
        className="mt-8 rounded-3xl border border-line bg-[#121212] p-6 shadow-xl shadow-brand/5 sm:p-8"
        onSubmit={handleSubmit}
      >
        {status === "success" ? (
          <div className="flex flex-col items-center py-10 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-mint/15 text-mint">
              <CheckCircle2 className="h-7 w-7" />
            </div>
            <h3 className="mt-4 font-display text-xl font-bold text-white">
              Thank you — message sent!
            </h3>
            <p className="mt-2 max-w-sm text-sm text-slate">
              Our team will contact you shortly. For a faster reply, message us
              on WhatsApp.
            </p>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-mint px-6 py-3 font-display text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5"
            >
              <MessageCircle className="h-4 w-4" />
              Open WhatsApp
            </a>
          </div>
        ) : (
          <>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="contact-name" className={LABEL}>
                  Full Name
                </label>
                <input
                  id="contact-name"
                  value={form.name}
                  onChange={update("name")}
                  placeholder="Your name"
                  autoComplete="name"
                  className={`${FIELD} ${
                    errors.name ? "border-accent/60" : ""
                  }`}
                />
                {errors.name && (
                  <p className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-accent">
                    <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                    {errors.name}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="contact-phone" className={LABEL}>
                  Phone / Mobile
                </label>
                <input
                  id="contact-phone"
                  type="tel"
                  value={form.phone}
                  onChange={update("phone")}
                  placeholder="03xx-xxxxxxx"
                  autoComplete="tel"
                  className={`${FIELD} ${
                    errors.phone ? "border-accent/60" : ""
                  }`}
                />
                {errors.phone && (
                  <p className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-accent">
                    <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                    {errors.phone}
                  </p>
                )}
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="contact-email" className={LABEL}>
                  Email (optional)
                </label>
                <input
                  id="contact-email"
                  type="email"
                  value={form.email}
                  onChange={update("email")}
                  placeholder="you@example.com"
                  autoComplete="email"
                  className={`${FIELD} ${
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

              <div className="sm:col-span-2">
                <label htmlFor="contact-message" className={LABEL}>
                  Message
                </label>
                <textarea
                  id="contact-message"
                  rows={4}
                  value={form.message}
                  onChange={update("message")}
                  placeholder="e.g. Need a Corolla for 3 days in Karachi with driver"
                  className={`${FIELD} resize-none ${
                    errors.message ? "border-accent/60" : ""
                  }`}
                />
                {errors.message && (
                  <p className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-accent">
                    <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                    {errors.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={status === "sending"}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand px-7 py-4 font-display text-sm font-semibold text-white shadow-lg shadow-brand/30 transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand/90 disabled:cursor-not-allowed disabled:opacity-60 sm:col-span-2"
              >
                {status === "sending" ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    Send Message
                  </>
                )}
              </button>
            </div>

            {status === "error" && (
              <p className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-accent/10 px-4 py-3 text-sm font-medium text-accent">
                <AlertCircle className="h-4 w-4 shrink-0" />
                {errorMessage}
              </p>
            )}
          </>
        )}
      </form>
    </Reveal>
  );
}