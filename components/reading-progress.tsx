"use client"

import { motion, useScroll, useSpring } from "motion/react"
import { useEffect, useState } from "react"
import { createPortal } from "react-dom"

export function ReadingProgress() {
  const [mounted, setMounted] = useState(false)
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 28, restDelta: 0.001 })

  useEffect(() => setMounted(true), [])
  if (!mounted) return null

  return createPortal(
    <motion.div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-press-red"
      style={{ scaleX }}
    />,
    document.body,
  )
}
