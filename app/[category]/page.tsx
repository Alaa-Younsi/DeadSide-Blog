import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { ArticleCard } from "@/components/article-card"
import { ArticleGrid } from "@/components/article-grid"
import { categories, getCategory } from "@/lib/categories"
import { getPostsByCategory } from "@/lib/content"
import { site } from "@/lib/site"

export const dynamicParams = false

export function generateStaticParams() {
  return categories.map((category) => ({ category: category.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>
}): Promise<Metadata> {
  const { category: slug } = await params
  const category = getCategory(slug)
  if (!category) return {}

  return {
    title: category.name,
    description: category.description,
    openGraph: { title: `${category.name} — ${site.name}`, description: category.description },
  }
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category: slug } = await params
  const category = getCategory(slug)
  if (!category) notFound()

  const posts = getPostsByCategory(category.slug)
  const [lead, ...rest] = posts

  return (
    <div>
      <header className="border-b-2 border-ink pb-4">
        <p className="font-meta text-xs font-bold tracking-[0.16em] text-press-red uppercase">
          {category.desk}
        </p>
        <h1 className="font-headline mt-1 text-4xl font-black sm:text-5xl">{category.name}</h1>
        <p className="font-body mt-2 max-w-2xl text-ink-muted">{category.description}</p>
      </header>

      {posts.length === 0 ? (
        <p className="font-meta mt-8 text-ink-muted">
          Nothing filed under {category.name} yet — check back soon.
        </p>
      ) : (
        <div className="mt-10 space-y-10">
          {lead ? <ArticleCard post={lead} variant="lead" /> : null}
          {rest.length > 0 ? (
            <ArticleGrid className="grid gap-8 border-t border-rule pt-8 sm:grid-cols-2 lg:grid-cols-3">
              {rest.map((post) => (
                <ArticleCard key={post.url} post={post} variant="secondary" />
              ))}
            </ArticleGrid>
          ) : null}
        </div>
      )}
    </div>
  )
}
