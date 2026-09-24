import Link from "next/link"
import type { ReactNode } from "react"
import { EditionToggle } from "@/components/edition-toggle"
import { NewsTicker } from "@/components/news-ticker"
import { SectionNav } from "@/components/section-nav"
import { categories } from "@/lib/categories"
import { getAllPosts } from "@/lib/content"
import { site } from "@/lib/site"
import { formatDateline, getIssueLabel } from "@/lib/utils"

function Ear({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="hidden w-40 shrink-0 border border-ink p-2 text-left md:block">
      <p className="font-meta border-b border-ink pb-1 text-[10px] font-bold tracking-[0.18em] uppercase">
        {label}
      </p>
      <div className="font-body pt-1.5 text-[11px] leading-snug text-ink-muted">{children}</div>
    </div>
  )
}

export function Masthead() {
  const today = new Date()
  const storyCount = getAllPosts().length

  return (
    <header className="mx-auto max-w-6xl px-4 pt-6 sm:px-6">
      <svg aria-hidden="true" className="absolute size-0">
        <filter id="letterpress" x="-5%" y="-10%" width="110%" height="120%">
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="1" seed="7" />
          <feDisplacementMap in="SourceGraphic" scale="1.1" />
          <feGaussianBlur stdDeviation="0.2" />
        </filter>
      </svg>

      <div className="font-meta flex flex-wrap items-center justify-between gap-2 text-[11px] tracking-[0.14em] text-ink-muted uppercase">
        <span>{formatDateline(today.toISOString())}</span>
        <span className="hidden sm:inline">{getIssueLabel(site.founded, today)} · Price: Free</span>
        <EditionToggle />
      </div>

      <div className="masthead-rule mt-3 flex items-center gap-6 py-4">
        <Ear label="Weather">
          Dense fog rolling off the press. Visibility low, ink running high.
        </Ear>

        <div className="min-w-0 flex-1 text-center">
          <Link href="/" className="nameplate-link block">
            <h1 className="nameplate font-headline text-4xl font-black tracking-tight whitespace-nowrap sm:text-6xl lg:text-7xl">
              {site.nameplate}
            </h1>
          </Link>
          <p className="font-meta mt-2 text-xs tracking-[0.2em] text-ink-muted uppercase sm:text-sm">
            <span className="ornament">❦</span> {site.tagline} <span className="ornament">❦</span>
          </p>
        </div>

        <Ear label="This Edition">
          {storyCount} stories across {categories.length} desks. Printed without a backend since{" "}
          {site.founded}.
        </Ear>
      </div>

      <div className="mt-3">
        <SectionNav />
        <NewsTicker />
      </div>
    </header>
  )
}
