import type { Metadata } from "next"
import { StoryList } from "@/components/story-list"
import { getAllPosts, getArchive } from "@/lib/content"
import { site } from "@/lib/site"

export const metadata: Metadata = {
  title: "Archive",
  description: `Every story ever printed in ${site.name}, by month.`,
}

export default function ArchivePage() {
  const archive = getArchive()
  const total = getAllPosts().length

  return (
    <div className="mx-auto max-w-4xl">
      <header className="border-b-2 border-ink pb-4 text-center">
        <p className="font-meta text-xs font-bold tracking-[0.16em] text-press-red uppercase">
          Back Issues
        </p>
        <h1 className="ink-settle font-headline mt-1 text-4xl font-black sm:text-5xl">
          The Archive
        </h1>
        <p className="font-meta mt-2 text-xs tracking-[0.14em] text-ink-muted uppercase">
          {total} {total === 1 ? "story" : "stories"} across {archive.length}{" "}
          {archive.length === 1 ? "month" : "months"}
        </p>
      </header>

      <div className="mt-10 space-y-12">
        {archive.map((month) => (
          <section key={month.label} className="lg:grid lg:grid-cols-[10rem_1fr] lg:gap-8">
            <h2 className="font-headline mb-2 border-b border-ink pb-1 text-2xl font-black lg:sticky lg:top-6 lg:mb-0 lg:self-start lg:border-b-0 lg:pb-0">
              {month.label}
            </h2>
            <StoryList posts={month.posts} />
          </section>
        ))}
      </div>
    </div>
  )
}
