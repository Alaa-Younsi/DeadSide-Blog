"use client"

import { Moon, Sun } from "lucide-react"
import { type MouseEvent, useEffect, useState } from "react"
import { flushSync } from "react-dom"

type Edition = "light" | "dark"

function applyEdition(next: Edition) {
  document.documentElement.dataset.theme = next
  try {
    localStorage.setItem("edition", next)
  } catch {
    // storage unavailable — theme still applies for this session
  }
}

export function EditionToggle() {
  const [edition, setEdition] = useState<Edition | null>(null)

  useEffect(() => {
    const current = document.documentElement.dataset.theme as Edition | undefined
    setEdition(current ?? "light")
  }, [])

  function toggle(event: MouseEvent<HTMLButtonElement>) {
    const next: Edition = edition === "dark" ? "light" : "dark"
    const root = document.documentElement
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    if (calm || typeof document.startViewTransition !== "function") {
      applyEdition(next)
      setEdition(next)
      return
    }

    const rect = event.currentTarget.getBoundingClientRect()
    const x = rect.left + rect.width / 2
    const y = rect.top + rect.height / 2
    const radius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y),
    )
    root.style.setProperty("--flood-x", `${x}px`)
    root.style.setProperty("--flood-y", `${y}px`)
    root.style.setProperty("--flood-r", `${radius}px`)

    document.startViewTransition(() => {
      flushSync(() => setEdition(next))
      applyEdition(next)
    })
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={edition === "dark" ? "Switch to day edition" : "Switch to night edition"}
      className="font-meta group flex items-center gap-1.5 border border-rule px-2.5 py-1 text-[11px] tracking-[0.14em] text-ink-muted uppercase transition-colors hover:border-ink hover:text-ink"
    >
      <span className="transition-transform duration-500 group-hover:rotate-45">
        {edition === "dark" ? <Sun className="size-3.5" /> : <Moon className="size-3.5" />}
      </span>
      {edition === "dark" ? "Day Edition" : "Night Edition"}
    </button>
  )
}
