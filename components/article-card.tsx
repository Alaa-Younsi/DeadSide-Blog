import Image from "next/image"
import Link from "next/link"
import { CategoryBadge } from "@/components/category-badge"
import { HeadlineReveal } from "@/components/headline-reveal"
import { getCategory } from "@/lib/categories"
import type { Post } from "@/lib/content"
import { cn, formatShortDate } from "@/lib/utils"

type Variant = "lead" | "secondary" | "brief"

export function ArticleCard({
  post,
  variant,
  animateHeadline = false,
  showImage = true,
}: {
  post: Post
  variant: Variant
  animateHeadline?: boolean
  showImage?: boolean
}) {
  const category = getCategory(post.category)
  if (!category) return null

  const href = post.url

  if (variant === "brief") {
    return (
      <article className="py-4 first:pt-0">
        <CategoryBadge slug={category.slug} name={category.name} accent={category.accent} />
        <h3 className="font-headline mt-2 text-lg leading-snug font-bold">
          <Link href={href} className="decoration-2 underline-offset-4 hover:underline">
            {post.title}
          </Link>
        </h3>
        <p className="font-meta mt-1.5 text-[11px] tracking-[0.06em] text-ink-muted uppercase">
          {formatShortDate(post.date)} · {post.readingTime}
        </p>
      </article>
    )
  }

  const isLead = variant === "lead"

  return (
    <article className="group">
      {post.cover && showImage ? (
        <Link
          href={href}
          className={cn(
            "relative block overflow-hidden border border-ink bg-background-raised",
            isLead ? "aspect-16/9" : "aspect-3/2",
          )}
        >
          <Image
            src={post.cover}
            alt=""
            fill
            sizes={isLead ? "(min-width: 1024px) 66vw, 100vw" : "(min-width: 1024px) 33vw, 100vw"}
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        </Link>
      ) : null}

      <div className={post.cover && showImage ? "mt-3" : ""}>
        <CategoryBadge slug={category.slug} name={category.name} accent={category.accent} />
        <h2
          className={cn(
            "font-headline mt-2 leading-[1.05] font-black",
            isLead ? "text-4xl sm:text-5xl" : "text-2xl",
          )}
        >
          <Link href={href} className="decoration-2 underline-offset-4 group-hover:underline">
            {animateHeadline ? <HeadlineReveal text={post.title} /> : post.title}
          </Link>
        </h2>
        <p className={cn("font-body mt-2 text-ink-muted", isLead ? "text-lg" : "text-sm")}>
          {post.excerpt}
        </p>
        <p className="font-meta mt-2 text-[11px] tracking-[0.08em] text-ink-muted uppercase">
          By {post.author} · {formatShortDate(post.date)} · {post.readingTime}
        </p>
      </div>
    </article>
  )
}
