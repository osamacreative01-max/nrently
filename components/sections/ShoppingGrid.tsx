import { Store } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { Stagger, StaggerItem } from "@/components/ui/Stagger";
import { SHOPPING_GROUPS, SHOPPING_SECTION } from "@/lib/site";

export default function ShoppingGrid() {
  return (
    <section className="bg-[#121212] py-14 sm:py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Shopping Made Easy"
          title={SHOPPING_SECTION.heading}
          subtitle={SHOPPING_SECTION.intro}
        />

        <Stagger className="mt-8 grid gap-4 sm:mt-12 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {SHOPPING_GROUPS.map((group) => (
            <StaggerItem key={group.label}>
              <div className="h-full rounded-2xl border border-line bg-[#121212] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-lg sm:p-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand text-accent sm:h-11 sm:w-11">
                  <Store className="h-5 w-5" />
                </div>
                <h3 className="mt-3 font-display text-base font-bold text-white sm:mt-4 sm:text-lg">
                  {group.label}
                </h3>
                <div className="mt-2.5 flex flex-wrap gap-1.5 sm:mt-3 sm:gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-full bg-[#121212] px-3 py-1.5 text-xs font-medium text-ink ring-1 ring-line"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}