import type { Metadata } from "next"
import Image from "next/image"
import { notFound } from "next/navigation"
import { ArticleCard } from "@/components/article-card"
import { ArticleToc } from "@/components/article-toc"
import { Byline } from "@/components/byline"
import { CategoryBadge } from "@/components/category-badge"
import { MdxContent } from "@/components/mdx-content"
import { getCategory } from "@/lib/categories"
import { getAllPosts, getPost, getPostsByCategory } from "@/lib/content"
import { site } from "@/lib/site"
import { cn } from "@/lib/utils"

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ category: post.category, slug: post.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; slug: string }>
}): Promise<Metadata> {
  const { category, slug } = await params
  const post = getPost(category, slug)
  if (!post) return {}

  return {
    title: post.title,
    description: post.excerpt,
    authors: [{ name: post.author }],
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      publishedTime: post.date,
      authors: [post.author],
      images: post.cover ? [{ url: post.cover }] : undefined,
    },
  }
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ category: string; slug: string }>
}) {
  const { category: categorySlug, slug } = await params
  const post = getPost(categorySlug, slug)
  if (!post) notFound()

  const category = getCategory(post.category)
  const related = getPostsByCategory(post.category)
    .filter((p) => p.slug !== post.slug)
    .slice(0, 3)

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.updated ?? post.date,
    author: { "@type": "Person", name: post.author },
    publisher: { "@type": "Organization", name: site.name },
    image: post.cover ? [`${site.url}${post.cover}`] : undefined,
    mainEntityOfPage: `${site.url}${post.url}`,
  }

  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <header className="mx-auto max-w-3xl border-b border-rule pb-6 text-center">
        {category ? (
          <CategoryBadge
            slug={category.slug}
            name={category.name}
            accent={category.accent}
            className="mx-auto"
          />
        ) : null}
        <h1 className="font-headline mt-3 text-4xl leading-[1.05] font-black sm:text-5xl">
          {post.title}
        </h1>
        <p className="font-body mt-4 text-lg text-ink-muted">{post.excerpt}</p>
        <div className="mt-4 flex justify-center">
          <Byline author={post.author} date={post.date} readingTime={post.readingTime} />
        </div>
      </header>

      {post.cover ? (
        <div className="relative mx-auto mt-8 aspect-16/9 max-w-4xl overflow-hidden border border-ink">
          <Image src={post.cover} alt="" fill className="object-cover" priority />
        </div>
      ) : null}

      <div
        className={cn(
          "mx-auto mt-10 grid max-w-5xl gap-10",
          post.toc.length > 0 ? "lg:grid-cols-[1fr_240px]" : "max-w-3xl",
        )}
      >
        <MdxContent code={post.body} />
        {post.toc.length > 0 ? (
          <div className="order-first lg:order-last">
            <div className="lg:sticky lg:top-8">
              <ArticleToc entries={post.toc} />
            </div>
          </div>
        ) : null}
      </div>

      {related.length > 0 ? (
        <footer className="mx-auto mt-16 max-w-5xl border-t-2 border-ink pt-6">
          <h2 className="font-meta text-sm font-bold tracking-[0.16em] uppercase">
            More from {category?.name}
          </h2>
          <div className="mt-6 grid gap-8 sm:grid-cols-3">
            {related.map((relatedPost) => (
              <ArticleCard key={relatedPost.url} post={relatedPost} variant="secondary" />
            ))}
          </div>
        </footer>
      ) : null}
    </article>
  )
}
