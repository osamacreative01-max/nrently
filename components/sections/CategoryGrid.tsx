import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { Stagger, StaggerItem } from "@/components/ui/Stagger";
import { CATEGORIES, WHATSAPP_URL } from "@/lib/site";

export default function CategoryGrid() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
      <SectionHeading
        eyebrow="Our Fleet"
        title="Choose your ride, your way"
        subtitle="From budget city runabouts to full 28-seat coasters — every vehicle is serviced, insured and delivered clean."
      />

      {/* 2-column grid */}
      <Stagger className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2">
        {CATEGORIES.map((cat) => (
          <StaggerItem key={cat.id}>
            <Link
              href={cat.href}
              className="group relative flex min-h-[380px] flex-col overflow-hidden rounded-3xl border border-white/[0.06] bg-[#0e0e0e] transition-all duration-300 hover:-translate-y-1 hover:border-accent/30 hover:shadow-2xl hover:shadow-accent/10"
            >
              {/* Image — large */}
              <div className="relative h-64 overflow-hidden bg-gradient-to-b from-[#1a1a1a] to-[#0e0e0e]">
                <Image
                  src={cat.image}
                  alt={cat.label}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-contain p-6 transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e0e] via-[#0e0e0e]/20 to-transparent" />

                {/* Price badge */}
                <span className="absolute left-4 top-4 rounded-full bg-black/50 px-3.5 py-1.5 text-[11px] font-bold text-white backdrop-blur-md border border-white/10">
                  From PKR {cat.from.toLocaleString()}/day
                </span>
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col p-6 pt-4">
                <h3 className="font-display text-2xl font-bold text-white">
                  {cat.label}
                </h3>
                <p className="mt-1 text-sm font-medium text-accent">
                  {cat.example}
                </p>
                <p className="mt-3 line-clamp-2 flex-1 text-sm leading-relaxed text-slate">
                  {cat.blurb}
                </p>

                {/* Features */}
                <div className="mt-4 flex flex-wrap gap-2">
                  {cat.features.map((f) => (
                    <span
                      key={f}
                      className="rounded-full bg-white/[0.05] px-3 py-1 text-[11px] font-medium text-slate"
                    >
                      {f}
                    </span>
                  ))}
                </div>

                <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-white/70 transition-colors duration-300 group-hover:text-accent">
                  View & Book
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          </StaggerItem>
        ))}
      </Stagger>

      {/* CTA */}
      <div className="mt-14 text-center">
        <Link
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-3 rounded-full bg-accent px-10 py-4 font-display text-sm font-bold text-white shadow-lg shadow-accent/25 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-accent/40"
        >
          <span className="animate-pulse">
            <MessageCircle className="h-4 w-4" />
          </span>
          Chat to find the right car
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>
    </section>
  );
}
