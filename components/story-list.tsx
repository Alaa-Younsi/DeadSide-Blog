import Link from "next/link"
import { CategoryBadge } from "@/components/category-badge"
import { getCategory } from "@/lib/categories"
import type { Post } from "@/lib/content"

function shortDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    timeZone: "UTC",
  })
}

export function StoryList({ posts }: { posts: Post[] }) {
  return (
    <ol className="divide-y divide-rule">
      {posts.map((post) => {
        const category = getCategory(post.category)
        return (
          <li key={post.url} className="group grid gap-x-6 gap-y-1 py-4 sm:grid-cols-[4.5rem_1fr]">
            <time
              dateTime={post.date}
              className="font-meta pt-1 text-xs tracking-[0.12em] text-ink-muted uppercase"
            >
              {shortDate(post.date)}
            </time>
            <div className="min-w-0">
              <div className="flex items-baseline gap-3">
                <h3 className="font-headline min-w-0 text-xl leading-snug font-bold">
                  <Link
                    href={post.url}
                    className="decoration-2 underline-offset-4 group-hover:underline"
                  >
                    {post.title}
                  </Link>
                </h3>
                <span
                  aria-hidden="true"
                  className="leader hidden min-w-8 flex-1 self-center sm:block"
                />
                <span className="font-meta hidden shrink-0 text-[11px] tracking-[0.1em] text-ink-muted uppercase sm:inline">
                  {post.readingTime}
                </span>
              </div>
              <p className="font-body mt-1 text-sm text-ink-muted">{post.excerpt}</p>
              {category ? (
                <CategoryBadge
                  slug={category.slug}
                  name={category.name}
                  accent={category.accent}
                  className="mt-2"
                />
              ) : null}
            </div>
          </li>
        )
      })}
    </ol>
  )
}
