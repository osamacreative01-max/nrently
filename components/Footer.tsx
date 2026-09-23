import Link from "next/link";
import {
  Clock,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
} from "lucide-react";
import Logo from "./Logo";
import { SOCIAL_LINKS } from "./SocialIcons";
import {
  CATEGORIES,
  CITIES,
  EMAIL,
  FOOTER,
  PHONE_DISPLAY,
  SECOND_PHONE_DISPLAY,
  WHATSAPP_URL,
} from "@/lib/site";

const QUICK_LINKS = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about-us" },
  { label: "Vehicles", href: "/vehicles" },
  { label: "Location", href: "/location" },
  { label: "Blogs", href: "/blogs" },
  { label: "Contact Us", href: "/contact-us" },
];

const VEHICLE_LINKS = CATEGORIES.map((c) => ({
  label: c.label,
  href: c.href,
}));

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-night text-slate-300">
      <div className="pointer-events-none absolute -left-32 top-0 h-72 w-72 rounded-full bg-accent/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-brand/60 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 pb-10 pt-12 sm:px-6 sm:pt-16 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <div className="h-10 w-28 sm:h-14 sm:w-36">
              <Logo />
            </div>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-slate-400">
              {FOOTER.tagline}
            </p>
            <div className="mt-6 flex gap-3">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-300 transition-all duration-300 hover:-translate-y-1 hover:border-accent hover:text-accent"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-4 w-4"
                    fill="currentColor"
                    aria-hidden
                  >
                    <path d={social.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2">
            <h3 className="font-display text-sm font-semibold uppercase tracking-widest text-white">
              Quick Links
            </h3>
            <ul className="mt-5 space-y-3 text-sm">
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="draw-link hover:text-accent">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h3 className="font-display text-sm font-semibold uppercase tracking-widest text-white">
              Our Fleet
            </h3>
            <ul className="mt-5 space-y-3 text-sm">
              {VEHICLE_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="draw-link hover:text-accent">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-4">
            <h3 className="font-display text-sm font-semibold uppercase tracking-widest text-white">
              Areas Served
            </h3>
            <div className="mt-5 flex flex-wrap gap-2">
              {FOOTER.areasServed.map((name) => {
                const city = CITIES.find((c) => c.name === name);
                return city ? (
                  <Link
                    key={city.id}
                    href={city.href}
                    className="inline-flex min-h-[44px] items-center rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-slate-300 transition-colors hover:border-accent hover:text-accent"
                  >
                    {city.name}
                  </Link>
                ) : (
                  <span
                    key={name}
                    className="inline-flex min-h-[44px] items-center rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-slate-300"
                  >
                    {name}
                  </span>
                );
              })}
              <span className="inline-flex min-h-[44px] items-center rounded-full border border-white/10 px-4 py-1.5 text-sm text-slate-500">
                All Pakistan
              </span>
            </div>

            <ul className="mt-6 space-y-3 text-sm">
              <li>
                <a
                  href={`tel:${PHONE_DISPLAY.replace(/-/g, "")}`}
                  className="flex items-center gap-3 hover:text-accent"
                >
                  <Phone className="h-4 w-4 shrink-0 text-accent" />
                  <span style={{ fontVariantNumeric: "tabular-nums" }}>
                    {PHONE_DISPLAY}
                  </span>
                </a>
              </li>
              <li>
                <a
                  href={`tel:${SECOND_PHONE_DISPLAY.replace(/[^0-9]/g, "")}`}
                  className="flex items-center gap-3 hover:text-accent"
                >
                  <Phone className="h-4 w-4 shrink-0 text-accent" />
                  <span style={{ fontVariantNumeric: "tabular-nums" }}>
                    {SECOND_PHONE_DISPLAY}
                  </span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${EMAIL}`}
                  className="flex items-center gap-3 hover:text-accent"
                >
                  <Mail className="h-4 w-4 shrink-0 text-accent" />
                  {EMAIL}
                </a>
              </li>
              <li>
                <a
                  href={FOOTER.getInTouch.mapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 hover:text-accent"
                >
                  <MapPin className="h-4 w-4 shrink-0 text-accent" />
                  <span className="underline-offset-4 hover:underline">
                    {FOOTER.getInTouch.address}
                  </span>
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="h-4 w-4 shrink-0 text-accent" />
                Open 24/7, all year round
              </li>
            </ul>

            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-full btn-gradient px-6 py-2.5 font-display text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-accent/30"
            >
              <MessageCircle className="h-4 w-4" />
              Chat with us
            </a>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs text-slate-500 sm:flex-row">
          <p>
            © {new Date().getFullYear()} Nrently.pk — All rights reserved.
          </p>
          <p className="flex items-center gap-1">
            Crafted with <span className="text-accent">♦</span> for smooth rides
          </p>
        </div>
      </div>
    </footer>
  );
}