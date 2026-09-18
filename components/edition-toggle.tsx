"use client"

import { Moon, Sun } from "lucide-react"
import { useEffect, useState } from "react"

type Edition = "light" | "dark"

export function EditionToggle() {
  const [edition, setEdition] = useState<Edition | null>(null)

  useEffect(() => {
    const current = document.documentElement.dataset.theme as Edition | undefined
    setEdition(current ?? "light")
  }, [])

  function toggle() {
    const next: Edition = edition === "dark" ? "light" : "dark"
    setEdition(next)
    document.documentElement.dataset.theme = next
    try {
      localStorage.setItem("edition", next)
    } catch {
      // storage unavailable — theme still applies for this session
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={edition === "dark" ? "Switch to day edition" : "Switch to night edition"}
      className="font-meta flex items-center gap-1.5 border border-rule px-2.5 py-1 text-[11px] uppercase tracking-[0.14em] text-ink-muted transition-colors hover:border-ink hover:text-ink"
    >
      {edition === "dark" ? <Sun className="size-3.5" /> : <Moon className="size-3.5" />}
      {edition === "dark" ? "Day Edition" : "Night Edition"}
    </button>
  )
}
