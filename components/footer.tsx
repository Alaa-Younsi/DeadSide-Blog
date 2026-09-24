import Link from "next/link"
import { categories } from "@/lib/categories"
import { site } from "@/lib/site"

export function Footer() {
  return (
    <footer className="mt-20 border-t-4 border-double border-ink">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div className="grid gap-8 sm:grid-cols-3">
          <div>
            <p className="font-headline text-2xl font-black">{site.nameplate}</p>
            <p className="font-meta mt-2 max-w-xs text-sm text-ink-muted">{site.description}</p>
          </div>

          <div>
            <p className="font-meta text-xs font-semibold tracking-[0.14em] text-ink-muted uppercase">
              Desks
            </p>
            <ul className="mt-2 space-y-1.5">
              {categories.map((category) => (
                <li key={category.slug}>
                  <Link
                    href={`/${category.slug}`}
                    className="font-meta text-sm transition-colors hover:text-press-red"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-meta text-xs font-semibold tracking-[0.14em] text-ink-muted uppercase">
              Masthead
            </p>
            <ul className="mt-2 space-y-1.5">
              <li>
                <Link
                  href="/about"
                  className="font-meta text-sm transition-colors hover:text-press-red"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/archive"
                  className="font-meta text-sm transition-colors hover:text-press-red"
                >
                  Archive
                </Link>
              </li>
              <li>
                <Link
                  href="/tags"
                  className="font-meta text-sm transition-colors hover:text-press-red"
                >
                  Index of Subjects
                </Link>
              </li>
              <li>
                <Link
                  href="/feed.xml"
                  className="font-meta text-sm transition-colors hover:text-press-red"
                >
                  RSS Feed
                </Link>
              </li>
              <li>
                <Link
                  href="/search"
                  className="font-meta text-sm transition-colors hover:text-press-red"
                >
                  Search
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <p className="font-meta mt-10 border-t border-rule pt-4 text-center text-[11px] tracking-[0.1em] text-ink-muted uppercase">
          &copy; {new Date().getFullYear()} {site.nameplate} — Printed digitally, edited by{" "}
          {site.author}
        </p>
      </div>
    </footer>
  )
}
