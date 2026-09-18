import type { MetadataRoute } from "next"
import { categories } from "@/lib/categories"
import { getAllPosts } from "@/lib/content"
import { site } from "@/lib/site"

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: site.url, changeFrequency: "daily", priority: 1 },
    { url: `${site.url}/about`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${site.url}/search`, changeFrequency: "monthly", priority: 0.3 },
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
