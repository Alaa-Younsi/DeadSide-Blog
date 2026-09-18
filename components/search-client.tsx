"use client"

import Fuse from "fuse.js"
import { Search } from "lucide-react"
import { useMemo, useState } from "react"
import { ArticleCard } from "@/components/article-card"
import type { Post } from "@/lib/content"

export function SearchClient({ posts }: { posts: Post[] }) {
  const [query, setQuery] = useState("")

  const fuse = useMemo(
    () =>
      new Fuse(posts, {
        keys: ["title", "excerpt", "tags", "author"],
        threshold: 0.35,
      }),
    [posts],
  )

  const results = query.trim() ? fuse.search(query).map((result) => result.item) : posts

  return (
    <div>
      <div className="relative">
        <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-ink-muted" />
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search the archive…"
          className="font-body w-full border border-ink bg-transparent py-3 pr-4 pl-10 text-lg outline-none placeholder:text-ink-muted"
        />
      </div>

      <p className="font-meta mt-4 text-xs tracking-[0.1em] text-ink-muted uppercase">
        {results.length} {results.length === 1 ? "story" : "stories"}
        {query.trim() ? ` matching "${query.trim()}"` : ""}
      </p>

      <div className="mt-6 divide-y divide-rule">
        {results.map((post) => (
          <div key={post.url} className="py-5 first:pt-0">
            <ArticleCard post={post} variant="brief" />
          </div>
        ))}
      </div>
    </div>
  )
}
