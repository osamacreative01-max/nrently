import { HelpCircle, MessageCircle } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import FaqAccordion from "./FaqAccordion";
import { WHATSAPP_URL } from "@/lib/site";

export default function FaqSection() {
  return (
    <section className="bg-[#0a0a0a] py-14 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="FAQ"
          title="Questions? Answered."
          subtitle="Everything you need to know before your first ride."
        />
        <FaqAccordion />


        {/* CTA Banner */}
        <div className="mx-auto mt-10 flex max-w-3xl flex-col items-center gap-6 rounded-3xl border border-white/[0.06] bg-gradient-to-r from-[#141414] to-[#111] px-5 py-8 text-center sm:mt-14 sm:flex-row sm:justify-between sm:px-8 sm:py-10 sm:text-left">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-accent/10 text-accent sm:h-12 sm:w-12">
              <HelpCircle className="h-6 w-6" />
            </div>
            <div>
              <p className="font-display text-sm font-bold text-white sm:text-base">
                Still have a question?
              </p>
              <p className="mt-0.5 text-xs text-slate sm:text-sm">
                Our team replies on WhatsApp within minutes.
              </p>
            </div>
          </div>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-accent px-4 py-3 font-display text-xs font-bold text-white shadow-lg shadow-accent/25 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-accent/40 sm:px-6 sm:py-3 sm:text-sm"
          >
            <MessageCircle className="h-4 w-4" />
            Ask us anything
          </a>
        </div>
      </div>
    </section>
  );
}
