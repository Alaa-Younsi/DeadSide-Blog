import Link from "next/link"
import type { Accent } from "@/lib/categories"
import { cn } from "@/lib/utils"

const accentClass: Record<Accent, string> = {
  "press-red": "text-press-red border-press-red",
  "ink-blue": "text-ink-blue border-ink-blue",
}

export function CategoryBadge({
  slug,
  name,
  accent,
  className,
}: {
  slug: string
  name: string
  accent: Accent
  className?: string
}) {
  return (
    <Link
      href={`/${slug}`}
      className={cn(
        "font-meta inline-block border px-1.5 py-0.5 text-[10px] font-bold tracking-[0.12em] uppercase",
        accentClass[accent],
        className,
      )}
    >
      {name}
    </Link>
  )
}
