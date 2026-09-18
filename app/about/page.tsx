import type { Metadata } from "next"
import { categories } from "@/lib/categories"
import { site } from "@/lib/site"

export const metadata: Metadata = {
  title: "About",
  description: `About ${site.name} — ${site.description}`,
}

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-2xl">
      <header className="border-b-2 border-ink pb-4 text-center">
        <p className="font-meta text-xs font-bold tracking-[0.16em] text-press-red uppercase">
          Masthead
        </p>
        <h1 className="font-headline mt-1 text-4xl font-black sm:text-5xl">About {site.name}</h1>
      </header>

      <div className="article-body font-body prose prose-lg dark:prose-invert prose-headings:font-headline mt-8 max-w-none">
        <p>
          {site.name} is a one-person newspaper — a place to publish thoughts, stories, and
          experiments without sorting them into a single lane. Some days that means writing about
          software. Other days it&rsquo;s culture, or a half-finished side project, or something
          that doesn&rsquo;t fit anywhere else.
        </p>
        <p>
          The paper is organized into a handful of desks, each covering a different kind of writing:
        </p>
        <ul>
          {categories.map((category) => (
            <li key={category.slug}>
              <strong>{category.name}</strong> — {category.description}
            </li>
          ))}
        </ul>
        <p>
          Founded in {site.founded}, edited and typeset by {site.author}. New editions ship whenever
          there&rsquo;s something worth printing.
        </p>
      </div>
    </div>
  )
}
