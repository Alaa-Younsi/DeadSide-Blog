import { posts as allPosts } from "../.velite"

export type Post = (typeof allPosts)[number]

function byDateDesc(a: Post, b: Post): number {
  return new Date(b.date).getTime() - new Date(a.date).getTime()
}

export function getAllPosts(): Post[] {
  return [...allPosts].sort(byDateDesc)
}

export function getPostsByCategory(category: string): Post[] {
  return getAllPosts().filter((post) => post.category === category)
}

export function getPost(category: string, slug: string): Post | undefined {
  return allPosts.find((post) => post.category === category && post.slug === slug)
}

export function getAllTags(): string[] {
  const tags = new Set<string>()
  for (const post of allPosts) {
    for (const tag of post.tags) tags.add(tag)
  }
  return [...tags].sort()
}

/**
 * Front-page editorial selection: explicit `featured` posts (ordered by
 * `featuredOrder` when set) stand in for an editor's picks; recent posts
 * fill in when nothing has been flagged yet.
 */
export function getFrontPage(): { lead: Post | undefined; secondary: Post[]; briefs: Post[] } {
  const sorted = getAllPosts()
  const featured = sorted
    .filter((post) => post.featured)
    .sort((a, b) => (a.featuredOrder ?? 99) - (b.featuredOrder ?? 99))

  const ranked = featured.length > 0 ? featured : sorted
  const [lead, ...rest] = ranked
  const secondary = rest.slice(0, 3)
  const usedSlugs = new Set([lead?.slug, ...secondary.map((post) => post.slug)])
  const briefs = sorted.filter((post) => !usedSlugs.has(post.slug)).slice(0, 6)

  return { lead, secondary, briefs }
}
