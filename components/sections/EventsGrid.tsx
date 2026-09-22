import { Briefcase, Plane, Users, type LucideIcon } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { Stagger, StaggerItem } from "@/components/ui/Stagger";
import CTA from "@/components/ui/CTA";
import { EVENTS, EVENTS_SECTION } from "@/lib/site";

const ICONS: Record<string, LucideIcon> = {
  Users,
  Plane,
  Briefcase,
};

export default function EventsGrid() {
  return (
    <section className="relative overflow-hidden bg-night py-14 sm:py-20 lg:py-28">
      <div className="pointer-events-none absolute -left-24 bottom-0 h-80 w-80 rounded-full bg-accent/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          dark
          eyebrow="Any Occasion"
          title={EVENTS_SECTION.heading}
          subtitle={EVENTS_SECTION.text}
        />

        <Stagger className="mt-8 grid gap-4 sm:mt-12 sm:grid-cols-2 sm:gap-5 md:grid-cols-3">
          {EVENTS.map((event) => {
            const Icon = ICONS[event.icon] ?? Plane;
            return (
              <StaggerItem key={event.title}>
                <div className="group h-full rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-accent/50 hover:bg-white/10 sm:p-7">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent text-white shadow-lg shadow-accent/30 transition-transform duration-300 group-hover:scale-110 sm:h-14 sm:w-14">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-4 font-display text-lg font-bold text-white sm:mt-5 sm:text-xl">
                    {event.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-slate-300 sm:mt-3 sm:text-sm">
                    {event.text}
                  </p>
                </div>
              </StaggerItem>
            );
          })}
        </Stagger>

        <div className="mt-12 text-center">
          <CTA href="/vehicles" variant="primary">
            Plan an Event Booking
          </CTA>
        </div>
      </div>
    </section>
  );
}