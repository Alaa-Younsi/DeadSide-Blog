"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { categories } from "@/lib/categories"
import { cn } from "@/lib/utils"

export function SectionNav() {
  const pathname = usePathname()

  return (
    <nav aria-label="Sections" className="border-t border-b border-ink">
      <ul className="font-meta -mx-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-1 px-4 py-2 text-[13px] font-semibold tracking-[0.08em] uppercase sm:gap-x-8">
        <li>
          <Link
            href="/"
            className={cn(
              "border-b-2 border-transparent pb-0.5 transition-colors hover:text-press-red",
              pathname === "/" && "border-press-red text-press-red",
            )}
          >
            Front Page
          </Link>
        </li>
        {categories.map((category) => {
          const href = `/${category.slug}`
          const active = pathname === href
          return (
            <li key={category.slug}>
              <Link
                href={href}
                className={cn(
                  "border-b-2 border-transparent pb-0.5 transition-colors hover:text-press-red",
                  active && "border-press-red text-press-red",
                )}
              >
                {category.name}
              </Link>
            </li>
          )
        })}
        <li>
          <Link
            href="/search"
            className={cn(
              "border-b-2 border-transparent pb-0.5 transition-colors hover:text-press-red",
              pathname === "/search" && "border-press-red text-press-red",
            )}
          >
            Search
          </Link>
        </li>
        <li>
          <Link
            href="/about"
            className={cn(
              "border-b-2 border-transparent pb-0.5 transition-colors hover:text-press-red",
              pathname === "/about" && "border-press-red text-press-red",
            )}
          >
            About
          </Link>
        </li>
      </ul>
    </nav>
  )
}
