import type { Metadata } from "next"
import { SearchClient } from "@/components/search-client"
import { getAllPosts } from "@/lib/content"

export const metadata: Metadata = {
  title: "Search",
  description: "Search the Dead Side archive.",
}

export default function SearchPage() {
  const posts = getAllPosts()

  return (
    <div className="mx-auto max-w-2xl">
      <header className="border-b-2 border-ink pb-4 text-center">
        <p className="font-meta text-xs font-bold tracking-[0.16em] text-press-red uppercase">
          Archive
        </p>
        <h1 className="font-headline mt-1 text-4xl font-black sm:text-5xl">Search</h1>
      </header>
      <div className="mt-8">
        <SearchClient posts={posts} />
      </div>
    </div>
  )
}
