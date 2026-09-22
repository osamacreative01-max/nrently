import { Star } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { STATS, WHATSAPP_URL } from "@/lib/site";

const rating = STATS.find((s) => "decimal" in s && s.decimal);
const customers = STATS.find((s) => s.label === "Happy Customers");

export default function ReviewsGrid() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8 lg:py-28">
      <SectionHeading
        eyebrow="Customer Reviews"
        title="Rated by drivers across Pakistan"
        subtitle="Real feedback from verified customers who booked with Nrently."
      />

      <Reveal className="mx-auto mt-8 max-w-3xl sm:mt-12">
        <div className="flex flex-col items-center gap-6 rounded-3xl border border-line bg-[#121212] px-6 py-8 text-center sm:flex-row sm:justify-center sm:gap-10 sm:px-10 sm:py-10">
          {rating && (
            <div>
              <p className="flex items-center justify-center gap-1.5">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star
                    key={i}
                    className={
                      i <= Math.round(rating.value)
                        ? "h-6 w-6 fill-accent text-accent"
                        : "h-6 w-6 text-line"
                    }
                  />
                ))}
              </p>
              <p className="mt-2 font-display text-2xl font-extrabold text-white">
                {rating.value}
                {rating.suffix}
              </p>
              <p className="text-xs font-medium uppercase tracking-wide text-slate">
                {rating.label}
              </p>
            </div>
          )}

          {customers && (
            <div className="h-px w-24 bg-line sm:h-16 sm:w-px" />
          )}

          {customers && (
            <div>
              <p className="font-display text-2xl font-extrabold text-accent">
                {customers.value}
                {customers.suffix}
              </p>
              <p className="text-xs font-medium uppercase tracking-wide text-slate">
                {customers.label}
              </p>
            </div>
          )}
        </div>

        <p className="mt-6 text-center text-xs leading-relaxed text-slate sm:text-sm">
          Rented with Nrently? Share your experience and help other drivers
          choose with confidence.
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-1 font-semibold text-accent underline-offset-4 hover:underline"
          >
            Send your review
          </a>
        </p>
      </Reveal>
    </section>
  );
}