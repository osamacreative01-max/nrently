"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, Home, RotateCcw } from "lucide-react";
import { WHATSAPP_URL } from "@/lib/site";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="flex min-h-[70vh] items-center justify-center bg-cream px-4 pt-24">
      <div className="text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent/10 text-accent">
          <AlertTriangle className="h-8 w-8" />
        </div>
        <h1 className="mt-6 font-display text-3xl font-bold text-white">
          Something went off-road
        </h1>
        <p className="mx-auto mt-3 max-w-md text-slate">
          We hit a problem loading this page. Your booking details are safe — try
          again, or book with us on WhatsApp.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center gap-2 rounded-full bg-brand px-7 py-3.5 font-display text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5"
          >
            <RotateCcw className="h-4 w-4" />
            Try again
          </button>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-white/25 px-7 py-3.5 font-display text-sm font-semibold text-white transition-all duration-300 hover:border-accent hover:text-accent"
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
            Book on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}