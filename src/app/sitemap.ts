import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { sitemapPages } from "@/config/pages";
import { getBlogPosts } from "@/lib/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;

  const staticPages: MetadataRoute.Sitemap = sitemapPages.map((page) => {
    const isHome = page.path === "/";
    return {
      url: isHome ? baseUrl : `${baseUrl}${page.path}`,
      lastModified: new Date(),
      changeFrequency: isHome ? "monthly" : "weekly",
      priority: isHome ? 1 : 0.8,
    };
  });

  const blogPosts = getBlogPosts();
  const blogPages: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticPages, ...blogPages];
}
