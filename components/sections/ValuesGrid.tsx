import { Clock, Headset, ShieldCheck, Sparkles, type LucideIcon } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { Stagger, StaggerItem } from "@/components/ui/Stagger";
import { VALUES } from "@/lib/site";

const ICONS: Record<string, LucideIcon> = {
  ShieldCheck,
  Clock,
  Sparkles,
  Headset,
};

export default function ValuesGrid() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Why Nrently"
        title="The Nrently difference"
        subtitle="More than cars — a promise kept on every booking."
      />
      <Stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {VALUES.map((value) => {
          const Icon = ICONS[value.icon] ?? Sparkles;
          return (
            <StaggerItem key={value.title}>
              <div className="group h-full rounded-2xl border border-line bg-[#121212] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-xl hover:shadow-brand/10">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand text-accent transition-transform duration-300 group-hover:scale-110">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-display text-lg font-bold text-white">
                  {value.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate">
                  {value.text}
                </p>
              </div>
            </StaggerItem>
          );
        })}
      </Stagger>
    </section>
  );
}