import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarDays, Clock, MessageCircle } from "lucide-react";
import { BLOG_POSTS, SITE_URL, WHATSAPP_URL } from "@/lib/site";
import BlogCard from "@/components/BlogCard";
import ContactCta from "@/components/sections/ContactCta";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    return { title: "Article Not Found" };
  }

  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blogs/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: new Date(post.date).toISOString(),
      images: [{ url: `${SITE_URL}${post.image}`, width: 800, height: 800 }],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) notFound();

  const related = BLOG_POSTS.filter((p) => p.slug !== slug).slice(0, 3);
  const formattedDate = new Date(post.date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <article>
      <section className="mx-auto max-w-4xl px-4 pb-16 pt-28 sm:px-6 sm:pt-36">
        <Link
          href="/blogs"
          className="inline-flex items-center gap-2 text-sm text-slate transition-colors duration-200 hover:text-white"
        >
          <ArrowLeft className="h-4 w-4 text-accent" />
          All articles
        </Link>

        <header className="mt-8">
          <span className="rounded-full border border-accent/20 bg-accent/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-accent">
            {post.category}
          </span>
          <h1 className="mt-4 font-display text-3xl font-extrabold leading-tight text-white sm:text-4xl">
            {post.title}
          </h1>
          <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-slate">
            <span className="flex items-center gap-1.5">
              <CalendarDays className="h-4 w-4 text-accent" />
              {formattedDate}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-4 w-4 text-accent" />
              {post.readTime}
            </span>
          </div>
        </header>

        <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-2xl border border-line bg-[#121212]">
          <Image
            src={post.image}
            alt={post.title}
            fill
            priority
            sizes="(min-width: 1024px) 56rem, 100vw"
            className="object-contain"
          />
        </div>

        <div className="prose-invert mt-8 space-y-5 text-base leading-relaxed text-slate-200 sm:text-lg">
          <p>{post.excerpt}</p>
          <p>
            Planning a trip? Book your car on WhatsApp and our team will confirm
            availability and price within minutes.
          </p>
          <div className="flex flex-col items-center gap-4 rounded-2xl border border-line bg-[#121212] p-6 text-center sm:flex-row sm:justify-between sm:text-left">
            <p className="text-sm text-slate">
              Ready to get on the road? Your next rental is one message away.
            </p>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex shrink-0 items-center gap-2 rounded-full bg-mint px-6 py-3 font-display text-sm font-semibold text-white shadow-lg shadow-mint/20 transition-all duration-300 hover:-translate-y-0.5"
            >
              <MessageCircle className="h-4 w-4" />
              Book on WhatsApp
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <h2 className="text-center font-display text-2xl font-bold text-white sm:text-3xl">
          Keep reading
        </h2>
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {related.map((item) => (
            <BlogCard key={item.slug} post={item} />
          ))}
        </div>
      </section>

      <ContactCta />
    </article>
  );
}