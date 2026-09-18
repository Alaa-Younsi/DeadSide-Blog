interface TocEntry {
  title: string
  url: string
  items: TocEntry[]
}

function TocList({ entries }: { entries: TocEntry[] }) {
  return (
    <ul className="space-y-1.5">
      {entries.map((entry) => (
        <li key={entry.url}>
          <a
            href={entry.url}
            className="font-meta text-[13px] text-ink-muted transition-colors hover:text-press-red"
          >
            {entry.title}
          </a>
          {entry.items.length > 0 ? (
            <div className="mt-1.5 ml-3 border-l border-rule pl-3">
              <TocList entries={entry.items} />
            </div>
          ) : null}
        </li>
      ))}
    </ul>
  )
}

export function ArticleToc({ entries }: { entries: TocEntry[] }) {
  if (entries.length === 0) return null

  return (
    <aside className="border border-rule p-4">
      <p className="font-meta mb-3 text-[11px] font-bold tracking-[0.14em] text-ink uppercase">
        Inside This Story
      </p>
      <TocList entries={entries} />
    </aside>
  )
}
