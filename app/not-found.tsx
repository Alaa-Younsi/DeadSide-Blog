import Link from "next/link"

export default function NotFound() {
  return (
    <div className="border-y-4 border-double border-ink py-20 text-center">
      <p className="font-meta text-xs font-bold tracking-[0.2em] text-press-red uppercase">
        Page Not Found
      </p>
      <h1 className="font-headline mt-3 text-6xl font-black sm:text-8xl">404</h1>
      <p className="font-body mt-4 text-ink-muted">
        This story appears to have been pulled from the edition.
      </p>
      <Link
        href="/"
        className="font-meta mt-6 inline-block border border-ink px-4 py-2 text-xs tracking-[0.12em] uppercase transition-colors hover:bg-ink hover:text-background"
      >
        Return to the Front Page
      </Link>
    </div>
  )
}
