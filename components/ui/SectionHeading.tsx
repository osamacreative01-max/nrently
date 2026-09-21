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
        <p className="mb-3 font-display text-sm font-semibold uppercase tracking-[0.25em] text-accent">
          {eyebrow}
        </p>
      )}
      <h2
        className={`text-3xl font-bold leading-tight sm:text-4xl lg:text-[2.6rem] ${
          dark ? "text-white" : "text-white"
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-4 text-base leading-relaxed sm:text-lg ${
            dark ? "text-slate-300" : "text-slate"
          }`}
        >
          {subtitle}
        </p>
      )}
    </Reveal>
  );
}