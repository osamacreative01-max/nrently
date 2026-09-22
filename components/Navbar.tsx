"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";
import {
  ChevronDown,
  Menu,
  MessageCircle,
  Phone,
  X,
} from "lucide-react";
import { CATEGORIES, CITIES, PHONE_DISPLAY, WHATSAPP_URL } from "@/lib/site";
import Logo from "./Logo";

interface MenuItem {
  label: string;
  href?: string;
  children?: { label: string; href: string }[];
}

const MENU: MenuItem[] = [
  { label: "Home", href: "/" },
  { label: "About us", href: "/about-us" },
  {
    label: "Vehicles",
    href: "/vehicles",
    children: [
      { label: "All Vehicles", href: "/vehicles" },
      ...CATEGORIES.map((c) => ({ label: c.label, href: c.href })),
    ],
  },
  {
    label: "Location",
    href: "/location",
    children: CITIES.slice(0, 3).map((c) => ({ label: c.name, href: c.href })),
  },
  { label: "Contact us", href: "/contact-us" },
  { label: "Blogs", href: "/blogs" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileGroup, setMobileGroup] = useState<string | null>(null);
  const pathname = usePathname();
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpenGroup(null);
    setMobileOpen(false);
    setMobileGroup(null);
  }, [pathname]);

  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    if (mobileOpen) {
      html.classList.add("lenis-stopped");
      body.style.overflow = "hidden";
    } else {
      html.classList.remove("lenis-stopped");
      body.style.overflow = "";
    }
    return () => {
      html.classList.remove("lenis-stopped");
      body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [mobileOpen]);

  const solid = scrolled || mobileOpen;
  const textClass = "text-white";
  const subText = solid ? "text-slate" : "text-slate-100";

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={`fixed inset-x-0 top-0 transition-all duration-500 ${
        mobileOpen ? "z-[70]" : "z-50"
      } ${
        solid
          ? "bg-[#121212]/90 shadow-lg shadow-black/30 backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <nav
        className={`mx-auto flex max-w-7xl items-center justify-between px-4 transition-all duration-500 sm:px-6 lg:px-8 ${
          solid ? "py-3" : "py-5"
        }`}
      >
        <Link href="/" aria-label="Nrently home" className="shrink-0">
          <Logo />
        </Link>

        <div className="hidden items-center gap-8 lg:flex">
          {MENU.map((item) =>
            item.children ? (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => setOpenGroup(item.label)}
                onMouseLeave={() => setOpenGroup(null)}
              >
                <button
                  type="button"
                  onClick={() =>
                    setOpenGroup(openGroup === item.label ? null : item.label)
                  }
                  className={`flex items-center gap-1.5 text-sm font-medium tracking-wide ${
                    isActive(item.href ?? "/") ? "text-accent" : textClass
                  }`}
                  aria-expanded={openGroup === item.label}
                  aria-haspopup="menu"
                >
                  {item.label}
                  <ChevronDown
                    className={`h-4 w-4 transition-transform duration-300 ${
                      openGroup === item.label ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {openGroup === item.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 12, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.98 }}
                      transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute left-1/2 top-full w-56 -translate-x-1/2 pt-4"
                    >
                      <div className="overflow-hidden rounded-2xl border border-line bg-[#121212] p-2 shadow-2xl shadow-black/40">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="block rounded-xl px-4 py-2.5 text-sm text-white transition-colors hover:bg-white/10 hover:text-accent"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href ?? "/"}
                className={`draw-link text-sm font-medium tracking-wide ${
                  isActive(item.href ?? "/") ? "font-semibold text-accent" : textClass
                }`}
              >
                {item.label}
              </Link>
            )
          )}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={`tel:${PHONE_DISPLAY.replace(/-/g, "")}`}
            className={`flex items-center gap-2 text-sm font-semibold tracking-wide ${subText} transition-colors hover:text-accent`}
            style={{ fontVariantNumeric: "tabular-nums" }}
          >
            <Phone className="h-4 w-4" />
            {PHONE_DISPLAY}
          </a>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full btn-gradient px-6 py-2.5 font-display text-sm font-semibold text-white shadow-lg shadow-accent/30 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
          >
            <MessageCircle className="h-4 w-4" />
            Book Now
          </a>
        </div>

        <button
          type="button"
          className={`-m-1 flex h-11 w-11 items-center justify-center rounded-xl active:bg-white/10 lg:hidden ${textClass}`}
          onClick={() => setMobileOpen(true)}
          aria-label="Open menu"
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav"
        >
          <Menu className="h-6 w-6" />
        </button>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-40 bg-brand/60 backdrop-blur-sm lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.aside
              key="drawer"
              id="mobile-nav"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="fixed inset-y-0 right-0 z-50 flex w-[86%] max-w-sm flex-col bg-brand px-6 py-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] lg:hidden"
              data-lenis-prevent
            >
              <div className="flex items-center justify-between">
                <Logo />
                <button
                  type="button"
                  className="-m-1 flex h-11 w-11 items-center justify-center rounded-xl text-white active:bg-white/10"
                  onClick={() => setMobileOpen(false)}
                  aria-label="Close menu"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="mt-8 flex flex-1 flex-col gap-1.5 overflow-y-auto overscroll-contain">
                {MENU.map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={!prefersReduced ? { opacity: 0, x: 24 } : undefined}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15 + i * 0.05 }}
                  >
                    {item.children ? (
                      <>
                        <button
                          type="button"
                          onClick={() =>
                            setMobileGroup(
                              mobileGroup === item.label ? null : item.label
                            )
                          }
                          className="flex w-full items-center justify-between rounded-xl px-4 py-3 font-display text-lg font-semibold text-white"
                          aria-expanded={mobileGroup === item.label}
                          aria-haspopup="menu"
                        >
                          {item.label}
                          <ChevronDown
                            className={`h-5 w-5 transition-transform duration-300 ${
                              mobileGroup === item.label ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                        <AnimatePresence initial={false}>
                          {mobileGroup === item.label && (
                            <motion.div
                              key="children"
                              initial={
                                !prefersReduced ? { height: 0, opacity: 0 } : undefined
                              }
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                              className="overflow-hidden"
                            >
                              <div className="ml-3 flex flex-col border-l border-white/20 pl-3">
                                {item.children.map((child) => (
                                  <Link
                                    key={child.href}
                                    href={child.href}
                                    className="rounded-lg px-4 py-2.5 text-sm text-slate-100 transition-colors hover:text-accent"
                                  >
                                    {child.label}
                                  </Link>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <Link
                        href={item.href ?? "/"}
                        className={`block rounded-xl px-4 py-3 font-display text-lg font-semibold ${
                          isActive(item.href ?? "/")
                            ? "bg-white/10 text-accent"
                            : "text-white"
                        }`}
                      >
                        {item.label}
                      </Link>
                    )}
                  </motion.div>
                ))}
              </div>

              <div className="mt-6 flex flex-col gap-3 border-t border-white/15 pt-6">
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full btn-gradient px-6 py-3.5 font-display text-sm font-semibold text-white"
                >
                  <MessageCircle className="h-4 w-4" />
                  Book Now on WhatsApp
                </a>
                <a
                  href={`tel:${PHONE_DISPLAY.replace(/-/g, "")}`}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 px-6 py-3.5 font-display text-sm font-semibold text-white"
                >
                  <Phone className="h-4 w-4" />
                  {PHONE_DISPLAY}
                </a>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}