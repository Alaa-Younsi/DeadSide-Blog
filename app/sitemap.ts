import type { MetadataRoute } from "next"
import { categories } from "@/lib/categories"
import { getAllPosts, getAllTags } from "@/lib/content"
import { site } from "@/lib/site"

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: site.url, changeFrequency: "daily", priority: 1 },
    { url: `${site.url}/about`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${site.url}/search`, changeFrequency: "monthly", priority: 0.3 },
    { url: `${site.url}/archive`, changeFrequency: "weekly", priority: 0.5 },
    { url: `${site.url}/tags`, changeFrequency: "weekly", priority: 0.4 },
    ...getAllTags().map((tag) => ({
      url: `${site.url}/tags/${tag}`,
      changeFrequency: "weekly" as const,
      priority: 0.4,
    })),
    ...categories.map((category) => ({
      url: `${site.url}/${category.slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    })),
  ]

  const postRoutes: MetadataRoute.Sitemap = getAllPosts().map((post) => ({
    url: `${site.url}${post.url}`,
    lastModified: post.updated ?? post.date,
    changeFrequency: "monthly",
    priority: 0.7,
  }))

  return [...staticRoutes, ...postRoutes]
}
