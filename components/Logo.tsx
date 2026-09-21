import Image from "next/image";

export default function Logo() {
  return (
    <span className="relative block h-10 w-28 sm:h-14 sm:w-36 overflow-hidden">
      <Image
        src="/logo.png"
        alt="Nrently logo"
        fill
        sizes="144px"
        className="object-contain"
        priority
      />
    </span>
  );
}
