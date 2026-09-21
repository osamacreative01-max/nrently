import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import BlogCard from "@/components/BlogCard";
import SectionHeading from "@/components/ui/SectionHeading";
import { Stagger, StaggerItem } from "@/components/ui/Stagger";
import { BLOG_POSTS } from "@/lib/site";

export const metadata: Metadata = {
  title: "Blogs & Travel Guides",
  description:
    "Road trip guides, rental tips and travel inspiration from the Nrently blog — for drivers across Pakistan.",
};

export default function BlogsPage() {
  return (
    <>
      <PageHero
        eyebrow="Nrently Blog"
        title="Ideas for your next drive"
        subtitle="Road trip itineraries, packing tips and everything you need to know about renting in Pakistan."
        image="/images/AUDI A5.png"
        imageAlt="Nrently car rental blog"
      />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <SectionHeading
          eyebrow="All Articles"
          title="Stories from the road"
        />
        <Stagger className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {BLOG_POSTS.map((post) => (
            <StaggerItem key={post.slug}>
              <BlogCard post={post} />
            </StaggerItem>
          ))}
        </Stagger>
      </section>
    </>
  );
}