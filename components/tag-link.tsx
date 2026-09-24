import Link from "next/link"

export function TagLink({ tag, count }: { tag: string; count?: number }) {
  return (
    <Link
      href={`/tags/${tag}`}
      className="font-meta inline-flex items-center gap-1 border border-rule px-2 py-0.5 text-[11px] tracking-[0.1em] text-ink-muted uppercase transition-colors hover:border-ink hover:text-ink"
    >
      <span className="text-press-red">#</span>
      {tag}
      {count === undefined ? null : <span className="text-ink-muted/70">({count})</span>}
    </Link>
  )
}
