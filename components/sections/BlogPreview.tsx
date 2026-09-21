import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { Stagger, StaggerItem } from "@/components/ui/Stagger";
import BlogCard from "@/components/BlogCard";
import { BLOG_POSTS } from "@/lib/site";

export default function BlogPreview() {
  const posts = BLOG_POSTS.slice(0, 3);

  return (
    <section className="bg-[#121212] py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            align="left"
            eyebrow="From the Blog"
            title="Road trip inspiration & rental tips"
          />
          <Link
            href="/blogs"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 font-display text-sm font-semibold text-white transition-all duration-300 hover:border-accent hover:bg-accent hover:text-white"
          >
            All articles
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <Stagger className="mt-10 grid gap-6 md:grid-cols-3">
          {posts.map((post) => (
            <StaggerItem key={post.slug}>
              <BlogCard post={post} />
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}