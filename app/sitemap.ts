import type { MetadataRoute } from "next";
import { BLOG_POSTS, CATEGORIES, SITE_URL, VEHICLES } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/vehicles",
    "/about-us",
    "/contact-us",
    "/location",
    "/blogs",
  ];
  const categoryRoutes = CATEGORIES.map((c) => c.href);
  const cityRoutes = ["/karachi", "/lahore", "/islamabad"];
  const vehicleRoutes = VEHICLES.map((v) => `/vehicles/${v.id}`);
  const blogRoutes = BLOG_POSTS.map((p) => `/blogs/${p.slug}`);

  const all = [
    ...staticRoutes,
    ...categoryRoutes,
    ...cityRoutes,
    ...vehicleRoutes,
    ...blogRoutes,
  ];

  return all.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: route.includes("/vehicles/") ? "weekly" : "weekly",
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