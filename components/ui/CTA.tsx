import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { WHATSAPP_URL } from "@/lib/site";

interface CTAProps {
  href?: string;
  children: React.ReactNode;
  variant?: "primary" | "outline" | "dark";
  className?: string;
  external?: boolean;
  type?: "link" | "whatsapp";
}

export default function CTA({
  href,
  children,
  variant = "primary",
  className = "",
  external,
  type = "link",
}: CTAProps) {
  const base = [
    "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 font-display text-xs font-semibold tracking-wide transition-all duration-300 sm:px-7 sm:text-sm",
    "hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
    className,
  ].join(" ");

  const variants: Record<string, string> = {
    primary: "btn-gradient text-white shadow-lg shadow-accent/30 hover:shadow-xl",
    outline: "border border-white/20 bg-transparent text-white hover:border-white/40",
    dark: "bg-[#121212] text-white shadow-lg shadow-black/30 hover:bg-[#1a1a1a]",
  };

  const content = (
    <>
      {type === "whatsapp" && <MessageCircle className="h-4 w-4" />}
      {children}
    </>
  );

  const finalHref = type === "whatsapp" ? WHATSAPP_URL : href ?? "/";

  if (external) {
    return (
      <a
        href={finalHref}
        target="_blank"
        rel="noopener noreferrer"
        className={`${base} ${variants[variant]}`}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={finalHref} className={`${base} ${variants[variant]}`}>
      {content}
    </Link>
  );
}