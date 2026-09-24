import type { Metadata } from "next"
import Link from "next/link"
import { getTagCounts } from "@/lib/content"

export const metadata: Metadata = {
  title: "Index of Subjects",
  description: "Every subject covered in the paper, with the stories filed under each.",
}

export default function TagsPage() {
  const tags = getTagCounts().sort((a, b) => a.tag.localeCompare(b.tag))

  return (
    <div className="mx-auto max-w-4xl">
      <header className="border-b-2 border-ink pb-4 text-center">
        <p className="font-meta text-xs font-bold tracking-[0.16em] text-press-red uppercase">
          Reference
        </p>
        <h1 className="ink-settle font-headline mt-1 text-4xl font-black sm:text-5xl">
          Index of Subjects
        </h1>
        <p className="font-meta mt-2 text-xs tracking-[0.14em] text-ink-muted uppercase">
          {tags.length} subjects on file
        </p>
      </header>

      {tags.length === 0 ? (
        <p className="font-meta mt-8 text-center text-ink-muted">No subjects filed yet.</p>
      ) : (
        <ul className="mt-10 gap-10 sm:columns-2 lg:columns-3">
          {tags.map(({ tag, count }) => (
            <li key={tag} className="break-inside-avoid">
              <Link
                href={`/tags/${tag}`}
                className="group flex items-baseline gap-2 py-1.5 transition-colors hover:text-press-red"
              >
                <span className="font-headline text-lg font-bold capitalize">
                  {tag.replaceAll("-", " ")}
                </span>
                <span aria-hidden="true" className="leader min-w-6 flex-1" />
                <span className="font-meta text-xs tracking-[0.1em] text-ink-muted">{count}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
