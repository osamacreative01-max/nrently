"use client";

import { useState } from "react";
import { MessageCircle, Send } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { WHATSAPP_URL } from "@/lib/site";

const FIELD = "text-ink placeholder:text-slate-400";

export default function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });
  const [sent, setSent] = useState(false);

  const update = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

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
        onSubmit={(e) => {
          e.preventDefault();
          setSent(true);
        }}
      >
        {sent ? (
          <div className="flex flex-col items-center py-10 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-mint/15 text-mint">
              <MessageCircle className="h-7 w-7" />
            </div>
            <h3 className="mt-4 font-display text-xl font-bold text-white">
              Thank you — request received!
            </h3>
            <p className="mt-2 max-w-sm text-sm text-slate">
              Our team will contact you shortly. For a faster reply, message us
              on WhatsApp.
            </p>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-mint px-6 py-3 font-display text-sm font-semibold text-white"
            >
              <MessageCircle className="h-4 w-4" />
              Open WhatsApp
            </a>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate">
                Full Name
              </span>
              <input
                required
                value={form.name}
                onChange={update("name")}
                placeholder="Your name"
                className={`w-full rounded-xl border border-line bg-[#121212] px-4 py-3.5 text-sm ${FIELD}`}
              />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate">
                Phone / Mobile
              </span>
              <input
                required
                type="tel"
                value={form.phone}
                onChange={update("phone")}
                placeholder="03xx-xxxxxxx"
                className={`w-full rounded-xl border border-line bg-[#121212] px-4 py-3.5 text-sm ${FIELD}`}
              />
            </label>
            <label className="block sm:col-span-2">
              <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate">
                Email (optional)
              </span>
              <input
                type="email"
                value={form.email}
                onChange={update("email")}
                placeholder="you@example.com"
                className={`w-full rounded-xl border border-line bg-[#121212] px-4 py-3.5 text-sm ${FIELD}`}
              />
            </label>
            <label className="block sm:col-span-2">
              <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate">
                Message
              </span>
              <textarea
                required
                rows={4}
                value={form.message}
                onChange={update("message")}
                placeholder="e.g. Need a Corolla for 3 days in Karachi with driver"
                className={`w-full resize-none rounded-xl border border-line bg-[#121212] px-4 py-3.5 text-sm ${FIELD}`}
              />
            </label>
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand px-7 py-4 font-display text-sm font-semibold text-white shadow-lg shadow-brand/30 transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand/90 sm:col-span-2"
            >
              <Send className="h-4 w-4" />
              Send Message
            </button>
          </div>
        )}
      </form>
    </Reveal>
  );
}