import { Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import SectionHeading from "@/components/ui/SectionHeading";
import { Stagger, StaggerItem } from "@/components/ui/Stagger";
import { CITIES, customerCenters } from "@/lib/site";

export default function CustomerCenters() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <SectionHeading
        eyebrow="Customer Centres"
        title="Pickup points across the country"
        subtitle="Collect your car from any of our centres, or have it delivered to your home or hotel."
      />

      <Stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {customerCenters.map((center) => {
          const city = CITIES.find((c) => c.name === center.city);
          return (
            <StaggerItem key={center.city}>
              <div className="group h-full rounded-2xl border border-line bg-[#121212] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-xl hover:shadow-brand/10">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand font-display text-sm font-bold text-accent">
                    {center.city.charAt(0)}
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-bold text-white">
                      {center.city}
                    </h3>
                    <p className="text-xs text-slate">
                      PKR {city?.from.toLocaleString() ?? 5000}/day from
                    </p>
                  </div>
                </div>

                <ul className="mt-5 space-y-2.5 border-t border-line pt-5 text-sm text-ink">
                  <li className="flex items-center gap-2.5">
                    <MapPin className="h-4 w-4 shrink-0 text-accent" />
                    <span className="text-slate">{city?.address}</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Phone className="h-4 w-4 shrink-0 text-accent" />
                    <span style={{ fontVariantNumeric: "tabular-nums" }}>
                      {center.phones[0]}
                    </span>
                  </li>
                  {center.phones[1] && (
                    <li className="flex items-center gap-2.5">
                      <Phone className="h-4 w-4 shrink-0 text-accent" />
                      <span style={{ fontVariantNumeric: "tabular-nums" }}>
                        {center.phones[1]}
                      </span>
                    </li>
                  )}
                  <li className="flex items-center gap-2.5">
                    <Mail className="h-4 w-4 shrink-0 text-accent" />
                    {center.email}
                  </li>
                </ul>

                <Link
                  href={city?.href ?? "/location"}
                  className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/20 px-4 py-3 font-display text-sm font-semibold text-white transition-all duration-300 hover:border-accent hover:bg-accent"
                >
                  Visit {center.city}
                </Link>
              </div>
            </StaggerItem>
          );
        })}

        <StaggerItem className="sm:col-span-2 lg:col-span-3">
          <div className="flex flex-col items-center justify-between gap-4 rounded-2xl bg-gradient-to-r from-brand to-brand/90 px-8 py-8 sm:flex-row">
            <div>
              <h3 className="font-display text-xl font-bold text-white">
                Prefer doorstep delivery?
              </h3>
              <p className="mt-1 text-sm text-slate-300">
                Book on WhatsApp and we deliver the keys to your door.
              </p>
            </div>
            <Link
                href="/contact-us"
                className="inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 font-display text-sm font-semibold text-white shadow-lg shadow-accent/30 transition-all duration-300"
              >
                Arrange Delivery
              </Link>
          </div>
        </StaggerItem>
      </Stagger>
    </section>
  );
}