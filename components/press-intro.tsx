"use client"

import { useEffect } from "react"
import { site } from "@/lib/site"

const INTRO_MS = 1900

function finish() {
  delete document.documentElement.dataset.intro
}

export function PressIntro() {
  useEffect(() => {
    if (document.documentElement.dataset.intro !== "running") return
    const timer = window.setTimeout(finish, INTRO_MS)
    return () => window.clearTimeout(timer)
  }, [])

  const letters = [...site.nameplate]

  return (
    <div aria-hidden="true" className="press-intro" onClick={finish} onKeyDown={finish}>
      <div className="press-intro-sheet">
        <p className="font-meta press-intro-kicker text-[11px] tracking-[0.3em] uppercase">
          Rolling the presses
        </p>
        <p className="font-headline press-intro-plate text-5xl font-black tracking-tight sm:text-8xl">
          {letters.map((letter, index) => (
            <span
              // biome-ignore lint/suspicious/noArrayIndexKey: static nameplate characters
              key={index}
              className="press-letter"
            >
              {letter === " " ? " " : letter}
            </span>
          ))}
        </p>
        <div className="press-intro-rule" />
        <div className="press-roller" />
      </div>
    </div>
  )
}
