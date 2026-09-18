import Link from "next/link"
import { EditionToggle } from "@/components/edition-toggle"
import { SectionNav } from "@/components/section-nav"
import { site } from "@/lib/site"
import { formatDateline, getIssueLabel } from "@/lib/utils"

export function Masthead() {
  const today = new Date()

  return (
    <header className="mx-auto max-w-6xl px-4 pt-6 sm:px-6">
      <div className="font-meta flex flex-wrap items-center justify-between gap-2 text-[11px] tracking-[0.14em] text-ink-muted uppercase">
        <span>{formatDateline(today.toISOString())}</span>
        <span>{getIssueLabel(site.founded, today)}</span>
        <EditionToggle />
      </div>

      <div className="masthead-rule mt-3 py-4 text-center">
        <Link href="/" className="block">
          <h1 className="font-headline text-5xl font-black tracking-tight sm:text-7xl">
            {site.nameplate}
          </h1>
        </Link>
        <p className="font-meta mt-2 text-xs tracking-[0.2em] text-ink-muted uppercase sm:text-sm">
          {site.tagline}
        </p>
      </div>

      <div className="mt-3">
        <SectionNav />
      </div>
    </header>
  )
}
