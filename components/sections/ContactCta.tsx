import { MessageCircle, Phone } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { PHONE_DISPLAY, WHATSAPP_URL } from "@/lib/site";

export default function ContactCta() {
  return (
    <section className="relative overflow-hidden bg-brand py-14 sm:py-20 lg:py-24">
      <div className="pointer-events-none absolute left-1/2 top-0 h-64 w-[36rem] -translate-x-1/2 rounded-full bg-accent/15 blur-3xl" />
      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <Reveal>
          <p className="font-display text-xs font-semibold uppercase tracking-[0.18em] text-accent sm:text-sm sm:tracking-[0.3em]">
            Get on the road today
          </p>
          <h2 className="mt-3 text-2xl font-bold leading-tight text-white sm:text-4xl lg:text-[2.6rem]">
            Your ride is one message away
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-slate-300 sm:text-base">
            Call or WhatsApp us now — we answer 24/7 and confirm bookings in
            minutes.
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-7 flex flex-col items-center justify-center gap-4 sm:mt-8 sm:flex-row">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full btn-gradient px-6 py-3.5 font-display text-sm font-semibold text-white shadow-lg shadow-accent/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-accent/60 sm:px-8 sm:py-4"
            >
              <MessageCircle className="h-4 w-4" />
              Book on WhatsApp
            </a>
            <a
              href={`tel:${PHONE_DISPLAY.replace(/-/g, "")}`}
              className="inline-flex items-center justify-center gap-3 rounded-full border border-white/30 px-6 py-3.5 font-display text-base font-bold text-white transition-all duration-300 hover:border-accent hover:text-accent sm:px-8 sm:py-4 sm:text-lg"
              style={{ fontVariantNumeric: "tabular-nums" }}
            >
              <Phone className="h-5 w-5" />
              {PHONE_DISPLAY}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}