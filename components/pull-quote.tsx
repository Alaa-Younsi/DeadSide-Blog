import type { ReactNode } from "react"

export function PullQuote({ children, cite }: { children: ReactNode; cite?: string }) {
  return (
    <blockquote className="font-headline my-8 border-y-2 border-ink py-6 text-center text-2xl leading-snug font-bold italic sm:text-3xl">
      &ldquo;{children}&rdquo;
      {cite ? (
        <footer className="font-meta mt-3 text-xs font-normal tracking-[0.1em] text-ink-muted uppercase not-italic">
          — {cite}
        </footer>
      ) : null}
    </blockquote>
  )
}
