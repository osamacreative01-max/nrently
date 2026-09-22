import Link from "next/link";
import { CalendarDays, Clock, MapPin, Pencil } from "lucide-react";
import {
  formatRentalDate,
  formatRentalTime,
  type RentalSearch,
} from "@/lib/search";

interface RentalSearchSummaryProps {
  search: RentalSearch | null;
}

export default function RentalSearchSummary({ search }: RentalSearchSummaryProps) {
  if (!search) return null;

  const items = [
    {
      icon: MapPin,
      label: "Pick-Up",
      value: search.pickupLocation,
    },
    {
      icon: MapPin,
      label: "Drop-Off",
      value: search.dropoffLocation || search.pickupLocation,
    },
    {
      icon: CalendarDays,
      label: "Pick-Up Date & Time",
      value: `${formatRentalDate(search.pickupDate)} · ${formatRentalTime(
        search.pickupTime
      )}`,
    },
    {
      icon: CalendarDays,
      label: "Drop-Off Date",
      value: formatRentalDate(search.dropoffDate),
    },
  ];

  return (
    <section className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 sm:pt-10 lg:px-8">
      <div className="rounded-2xl border border-line bg-[#121212] p-4 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="font-display text-sm font-bold uppercase tracking-wider text-white">
            Your rental search
          </h2>
          <Link
            href="/#booking"
            className="inline-flex items-center gap-1.5 rounded-full border border-white/10 px-4 py-2 text-xs font-semibold text-slate transition-colors duration-200 hover:border-accent/40 hover:text-white"
          >
            <Pencil className="h-3.5 w-3.5 text-accent" />
            Modify search
          </Link>
        </div>

        <dl className="mt-4 grid grid-cols-1 gap-3 sm:mt-5 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
          {items.map((item) => (
            <div
              key={item.label}
              className="rounded-xl border border-white/[0.06] bg-white/[0.03] px-3 py-2.5 sm:px-4 sm:py-3"
            >
              <dt className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-slate">
                <item.icon className="h-3 w-3 text-accent" />
                {item.label}
              </dt>
              <dd className="mt-1.5 break-words text-sm font-medium text-white">
                {item.value}
              </dd>
            </div>
          ))}
        </dl>

        <p className="mt-4 flex items-start gap-1.5 text-xs leading-relaxed text-slate">
          <Clock className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" />
          Select a vehicle below to continue to booking — we&apos;ll confirm
          availability and price on WhatsApp.
        </p>
      </div>
    </section>
  );
}
