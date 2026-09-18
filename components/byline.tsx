import { formatDateline } from "@/lib/utils"

export function Byline({
  author,
  date,
  readingTime,
}: {
  author: string
  date: string
  readingTime: string
}) {
  return (
    <p className="font-meta text-xs tracking-[0.08em] text-ink-muted uppercase">
      By <span className="font-semibold text-ink">{author}</span> · {formatDateline(date)} ·{" "}
      {readingTime}
    </p>
  )
}
