import Reveal from "./Reveal";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  dark?: boolean;
}

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  dark = false,
}: SectionHeadingProps) {
  const alignClass = align === "center" ? "text-center mx-auto" : "text-left";
  return (
    <Reveal className={`max-w-3xl ${alignClass}`}>
      {eyebrow && (
        <p className="mb-3 font-display text-xs font-semibold uppercase tracking-[0.18em] text-accent sm:text-sm sm:tracking-[0.25em]">
          {eyebrow}
        </p>
      )}
      <h2
        className={`text-2xl font-bold leading-tight sm:text-4xl lg:text-[2.6rem] ${
          dark ? "text-white" : "text-white"
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-3 max-w-2xl text-sm leading-relaxed sm:mt-4 sm:text-lg ${
            align === "center" ? "mx-auto" : ""
          } ${dark ? "text-slate-300" : "text-slate"}`}
        >
          {subtitle}
        </p>
      )}
    </Reveal>
  );
}