import Link from "next/link"
import { getCategory } from "@/lib/categories"
import { getAllPosts } from "@/lib/content"

export function NewsTicker() {
  const posts = getAllPosts().slice(0, 8)
  if (posts.length === 0) return null

  const items = posts.map((post) => (
    <li key={post.url} className="flex shrink-0 items-center gap-3 pr-10">
      <span className="text-press-red">◆</span>
      <span className="text-ink-muted">{getCategory(post.category)?.name}</span>
      <Link href={post.url} className="text-ink hover:text-press-red">
        {post.title}
      </Link>
    </li>
  ))

  return (
    <div className="ticker font-meta flex items-stretch border-b border-ink text-[12px] font-semibold tracking-[0.08em] uppercase">
      <p className="relative z-10 flex shrink-0 items-center gap-2 bg-ink px-3 py-1.5 text-background">
        <span className="ticker-dot size-1.5 rounded-full bg-press-red" />
        Latest
      </p>
      <div className="ticker-viewport relative flex-1 overflow-hidden py-1.5 pl-4">
        <div className="ticker-track flex w-max">
          <ul className="flex">{items}</ul>
          <ul className="flex" aria-hidden="true" inert>
            {items}
          </ul>
        </div>
      </div>
    </div>
  )
}
