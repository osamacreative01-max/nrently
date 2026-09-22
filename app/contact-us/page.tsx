import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import ContactForm from "@/components/sections/ContactForm";
import CustomerCenters from "@/components/sections/CustomerCenters";
import SectionHeading from "@/components/ui/SectionHeading";
import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { Stagger, StaggerItem } from "@/components/ui/Stagger";
import {
  CONTACT,
  EMAIL,
  PHONE_DISPLAY,
  SECOND_PHONE_DISPLAY,
  WHATSAPP_URL,
} from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Contact Nrently — call or WhatsApp 24/7 for car rentals in Karachi. Visit our customer centres in Karachi, Lahore and Islamabad.",
};

const INFO_CARDS = [
  {
    icon: Phone,
    title: "Call us",
    lines: [PHONE_DISPLAY, SECOND_PHONE_DISPLAY],
    href: `tel:${PHONE_DISPLAY.replace(/-/g, "")}`,
  },
  {
    icon: MessageCircle,
    title: "WhatsApp",
    lines: ["Instant booking & quotes", "We reply in minutes"],
    href: WHATSAPP_URL,
  },
  {
    icon: Mail,
    title: "Email",
    lines: [EMAIL, "We reply within 24h"],
    href: `mailto:${EMAIL}`,
  },
  {
    icon: MapPin,
    title: "Head Office",
    lines: [CONTACT.location, "Karachi, Pakistan"],
    href: "/location",
  },
  {
    icon: Clock,
    title: "Hours",
    lines: ["Open 24 hours", "365 days a year"],
    href: undefined,
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact Us"
        title={CONTACT.heading}
        subtitle={CONTACT.text}
        image="/images/HONDA Civic-Photoroom.png"
        imageAlt="Contact Nrently car rental"
      />

      <section className="mx-auto max-w-7xl px-4 pb-14 pt-10 sm:px-6 sm:pb-20 sm:pt-14 lg:px-8">
        <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {INFO_CARDS.map((card) => {
            const Icon = card.icon;
            const content = (
              <>
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand text-accent">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-display text-base font-bold text-white">
                  {card.title}
                </h3>
                <ul className="mt-2 space-y-1 text-sm text-slate">
                  {card.lines.map((line) => (
                    <li key={line} className="break-words">
                      {line}
                    </li>
                  ))}
                </ul>
              </>
            );
            return (
              <StaggerItem key={card.title}>
                {card.href ? (
                  <a
                    href={card.href}
                    target={card.href.startsWith("http") ? "_blank" : undefined}
                    rel={
                      card.href.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                    className="block h-full rounded-2xl border border-line bg-[#121212] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-xl sm:p-6"
                  >
                    {content}
                  </a>
                ) : (
                  <div className="h-full rounded-2xl border border-line bg-[#121212] p-5 sm:p-6">
                    {content}
                  </div>
                )}
              </StaggerItem>
            );
          })}
        </Stagger>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-14 sm:px-6 sm:pb-20 lg:px-8">
        <div className="grid gap-8 sm:gap-10 lg:grid-cols-2">
          <ContactForm />
          <div>
            <SectionHeading
              align="left"
              eyebrow="Find Us"
              title="Our main customer centre"
              subtitle={`${CONTACT.location} — or let us bring the car to you anywhere in the city.`}
            />
            <div className="mt-6 overflow-hidden rounded-2xl border border-line shadow-lg">
              <iframe
                title="Nrently location map — Shahrah-e-Faisal, Karachi"
                src={CONTACT.mapEmbeds.karachi}
                className="h-64 w-full grayscale-[20%] sm:h-[26rem]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </section>

      <CustomerCenters />
    </>
  );
}