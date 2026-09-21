import {
  Car,
  ClipboardCheck,
  MapPin,
  MessageCircle,
} from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { Stagger, StaggerItem } from "@/components/ui/Stagger";
import { WHATSAPP_URL } from "@/lib/site";

const STEPS = [
  {
    icon: Car,
    title: "Pick your vehicle",
    text: "Browse our fleet and choose the car that fits your trip and budget.",
  },
  {
    icon: MessageCircle,
    title: "Share your details",
    text: "Message us the date, time and pickup location on WhatsApp.",
  },
  {
    icon: ClipboardCheck,
    title: "Confirm instantly",
    text: "We confirm availability, rates and documents within minutes.",
  },
  {
    icon: MapPin,
    title: "Get delivered",
    text: "Your clean, fuelled car arrives at your door — or collect from a centre.",
  },
];

export default function HowItWorks() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="How It Works"
        title="Renting your car in four easy steps"
        subtitle="No paperwork maze, no waiting rooms — just book and drive."
      />
      <Stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {STEPS.map((step, i) => {
          const Icon = step.icon;
          return (
            <StaggerItem key={step.title}>
              <div className="relative h-full rounded-2xl border border-line bg-[#121212] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-xl">
                <span className="absolute right-5 top-4 font-display text-4xl font-extrabold text-line">
                  0{i + 1}
                </span>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand text-accent">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-display text-lg font-bold text-white">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate">
                  {step.text}
                </p>
              </div>
            </StaggerItem>
          );
        })}
      </Stagger>
      <div className="mt-8 text-center">
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full btn-gradient px-8 py-4 font-display text-sm font-semibold text-white shadow-lg shadow-accent/30 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
        >
          <MessageCircle className="h-4 w-4" />
          Start your booking on WhatsApp
        </a>
      </div>
    </section>
  );
}