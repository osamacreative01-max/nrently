import Hero from "@/components/sections/Hero";
import BookingCard from "@/components/sections/BookingCard";
import CategoryGrid from "@/components/sections/CategoryGrid";
import AboutPreview from "@/components/sections/AboutPreview";
import ContactCta from "@/components/sections/ContactCta";

export default function Home() {
  return (
    <>
      <Hero />
      <BookingCard />
      <CategoryGrid />
      <AboutPreview />
      <ContactCta />
    </>
  );
}
