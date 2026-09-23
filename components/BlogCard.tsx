import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays, Clock } from "lucide-react";
import type { BlogPost } from "@/lib/site";

export default function BlogCard({ post }: { post: BlogPost }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-[#121212] shadow-sm transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-brand/10">
      <Link
        href={`/blogs/${post.slug}`}
        className="block"
      >
        <div className="relative aspect-[16/10] overflow-hidden bg-night">
          <Image
            src={post.image}
            alt={post.title}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
        </div>
        <h3 className="p-4 pb-0 font-display text-lg font-bold leading-snug text-white transition-colors group-hover:text-accent sm:p-6 sm:pb-0">
          {post.title}
        </h3>
      </Link>
      <div className="flex flex-1 flex-col p-4 sm:p-6">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate">
          <span className="font-semibold uppercase tracking-wide text-accent">
            {post.category}
          </span>
          <span className="flex items-center gap-1.5">
            <CalendarDays className="h-3.5 w-3.5 text-accent" />
            {new Date(post.date).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5 text-accent" />
            {post.readTime}
          </span>
        </div>
        <p className="mt-2 line-clamp-2 flex-1 text-sm leading-relaxed text-slate">
          {post.excerpt}
        </p>
        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
          Read article
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </div>
    </article>
  );
}