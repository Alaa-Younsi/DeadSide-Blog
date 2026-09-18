import { Feed } from "feed"
import { getAllPosts } from "@/lib/content"
import { site } from "@/lib/site"

export function GET() {
  const feed = new Feed({
    title: site.name,
    description: site.description,
    id: site.url,
    link: site.url,
    language: "en",
    favicon: `${site.url}/icon.svg`,
    copyright: `All rights reserved ${new Date().getFullYear()}, ${site.author}`,
    feedLinks: { rss: `${site.url}/feed.xml` },
  })

  for (const post of getAllPosts()) {
    feed.addItem({
      title: post.title,
      id: `${site.url}${post.url}`,
      link: `${site.url}${post.url}`,
      description: post.excerpt,
      author: [{ name: post.author }],
      date: new Date(post.date),
      category: [{ name: post.category }],
    })
  }

  return new Response(feed.rss2(), {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  })
}
