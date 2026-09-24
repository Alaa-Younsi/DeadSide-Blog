export function GrainOverlay() {
  return (
    <>
      <div aria-hidden="true" className="paper-vignette pointer-events-none fixed inset-0 z-40" />
      <div
        aria-hidden="true"
        className="grain-overlay pointer-events-none fixed inset-0 z-50 mix-blend-multiply"
      />
    </>
  )
}
