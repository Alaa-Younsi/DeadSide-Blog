export function Fold({ label = "Above the fold" }: { label?: string }) {
  return (
    <div aria-hidden="true" className="fold relative my-2 flex items-center justify-center">
      <span className="font-meta relative z-10 bg-background px-3 text-[10px] tracking-[0.3em] text-ink-muted uppercase">
        ▲ {label} ▲
      </span>
    </div>
  )
}
