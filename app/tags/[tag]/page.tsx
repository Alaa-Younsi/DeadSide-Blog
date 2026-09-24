import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { StoryList } from "@/components/story-list"
import { getAllTags, getPostsByTag } from "@/lib/content"
import { site } from "@/lib/site"

export const dynamicParams = false

export function generateStaticParams() {
  return getAllTags().map((tag) => ({ tag }))
}

function label(tag: string): string {
  return tag.replaceAll("-", " ")
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tag: string }>
}): Promise<Metadata> {
  const { tag } = await params
  const description = `Stories filed under “${label(tag)}” in ${site.name}.`
  return {
    title: `Filed under ${label(tag)}`,
    description,
    openGraph: { title: `Filed under ${label(tag)} — ${site.name}`, description },
  }
}

export default async function TagPage({ params }: { params: Promise<{ tag: string }> }) {
  const { tag } = await params
  const posts = getPostsByTag(tag)
  if (posts.length === 0) notFound()

  return (
    <div className="mx-auto max-w-4xl">
      <header className="border-b-2 border-ink pb-4 text-center">
        <p className="font-meta text-xs font-bold tracking-[0.16em] text-press-red uppercase">
          Filed Under
        </p>
        <h1 className="ink-settle font-headline mt-1 text-4xl font-black capitalize sm:text-5xl">
          {label(tag)}
        </h1>
        <p className="font-meta mt-2 text-xs tracking-[0.14em] text-ink-muted uppercase">
          {posts.length} {posts.length === 1 ? "story" : "stories"} ·{" "}
          <Link href="/tags" className="underline-offset-4 hover:text-press-red hover:underline">
            All subjects
          </Link>
        </p>
      </header>

      <div className="mt-8">
        <StoryList posts={posts} />
      </div>
    </div>
  )
}
