import Link from "next/link";
import { Home, MessageCircle } from "lucide-react";
import { WHATSAPP_URL } from "@/lib/site";

export default function NotFound() {
  return (
    <section className="flex min-h-screen items-center justify-center bg-cream px-4 pt-24">
      <div className="text-center">
        <p className="font-display text-7xl font-extrabold text-accent">404</p>
        <h1 className="mt-4 text-3xl font-bold text-white">
          This road leads nowhere
        </h1>
        <p className="mx-auto mt-3 max-w-md text-slate">
          The page you&apos;re looking for doesn&apos;t exist — but your next ride
          does. Let&apos;s get you back on track.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full bg-brand px-7 py-3.5 font-display text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5"
          >
            <Home className="h-4 w-4" />
            Back to Home
          </Link>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 font-display text-sm font-semibold text-white"
          >
            <MessageCircle className="h-4 w-4" />
            Book a Car
          </a>
        </div>
      </div>
    </section>
  );
}