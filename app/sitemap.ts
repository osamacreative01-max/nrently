import type { MetadataRoute } from "next";
import { BLOG_POSTS, CATEGORIES, SITE_URL, VEHICLES } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/vehicles", "/about-us", "/contact-us", "/location", "/blogs"];
  const categoryRoutes = CATEGORIES.map((c) => c.href);
  const cityRoutes = ["/karachi", "/lahore", "/islamabad"];
  const vehicleRoutes = VEHICLES.map((v) => `/vehicles/${v.id}`);
  const blogRoutes = BLOG_POSTS.map((p) => `/blogs/${p.slug}`);

  const all: { route: string; date?: string }[] = [
    ...staticRoutes.map((route) => ({ route })),
    ...categoryRoutes.map((route) => ({ route })),
    ...cityRoutes.map((route) => ({ route })),
    ...vehicleRoutes.map((route) => ({ route })),
    ...blogRoutes.map((route) => {
      const post = BLOG_POSTS.find((p) => `/blogs/${p.slug}` === route);
      return { route, date: post ? post.date : undefined };
    }),
  ];

  return all.map(({ route, date }) => ({
    url: `${SITE_URL}${route}`,
    ...(date ? { lastModified: new Date(date) } : {}),
    changeFrequency: "weekly",
    priority:
      route === ""
        ? 1
        : route === "/vehicles"
        ? 0.9
        : route.startsWith("/vehicles/")
        ? 0.8
        : route.startsWith("/blogs/")
        ? 0.6
        : 0.7,
  }));
}