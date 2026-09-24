import Link from "next/link"
import { ArticleCard } from "@/components/article-card"
import { ArticleGrid } from "@/components/article-grid"
import { Fold } from "@/components/fold"
import { categories } from "@/lib/categories"
import { getFrontPage, getPostsByCategory } from "@/lib/content"

export default function HomePage() {
  const { lead, secondary, briefs } = getFrontPage()

  return (
    <div className="space-y-16">
      {lead ? (
        <section className="grid items-start gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <ArticleCard post={lead} variant="lead" animateHeadline />
          </div>
          <div className="divide-y divide-rule border-t border-rule lg:border-t-0 lg:border-l lg:pl-8">
            {secondary.map((post) => (
              <div key={post.url} className="py-5 first:pt-0 lg:py-6">
                <ArticleCard post={post} variant="secondary" showImage={false} />
              </div>
            ))}
          </div>
        </section>
      ) : (
        <p className="font-meta text-ink-muted">
          No dispatches yet — the first edition is still on the press.
        </p>
      )}

      {lead ? <Fold /> : null}

      {briefs.length > 0 ? (
        <section>
          <h2 className="font-meta border-b border-ink pb-2 text-sm font-bold tracking-[0.16em] uppercase">
            Also in This Edition
          </h2>
          <ArticleGrid className="mt-2 divide-y divide-rule sm:grid sm:grid-cols-2 sm:gap-x-10 sm:divide-y-0 lg:grid-cols-3">
            {briefs.map((post) => (
              <ArticleCard key={post.url} post={post} variant="brief" />
            ))}
          </ArticleGrid>
        </section>
      ) : null}

      <section className="space-y-12">
        {categories.map((category) => {
          const posts = getPostsByCategory(category.slug).slice(0, 2)
          if (posts.length === 0) return null

          return (
            <div key={category.slug} className="rule-draw relative pt-4">
              <div className="flex items-baseline justify-between">
                <h2 className="font-headline text-2xl font-black">{category.desk}</h2>
                <Link
                  href={`/${category.slug}`}
                  className="font-meta text-xs tracking-[0.1em] text-ink-muted uppercase hover:text-press-red"
                >
                  More from {category.name} &rarr;
                </Link>
              </div>
              <ArticleGrid className="mt-4 grid gap-8 sm:grid-cols-2">
                {posts.map((post) => (
                  <ArticleCard key={post.url} post={post} variant="secondary" />
                ))}
              </ArticleGrid>
            </div>
          )
        })}
      </section>
    </div>
  )
}
