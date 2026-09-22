import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays, Clock } from "lucide-react";
import type { BlogPost } from "@/lib/site";

export default function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/blogs/${post.slug}`}
      className="group block h-full overflow-hidden rounded-2xl border border-line bg-[#121212] shadow-sm transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-brand/10"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-night">
        <Image
          src={post.image}
          alt={post.title}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <span className="absolute left-3 top-3 rounded-full bg-accent px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">
          {post.category}
        </span>
      </div>
      <div className="p-4 sm:p-6">
        <div className="flex items-center gap-4 text-xs text-slate">
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
        <h3 className="mt-3 font-display text-lg font-bold leading-snug text-white transition-colors group-hover:text-accent">
          {post.title}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-slate">
          {post.excerpt}
        </p>
        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
          Read article
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}