"use client"

import { AnimatePresence, motion } from "motion/react"
import { usePathname } from "next/navigation"
import type { ReactNode } from "react"

export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname()

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial={{ opacity: 0, clipPath: "inset(0 0 0 100%)" }}
        animate={{ opacity: 1, clipPath: "inset(0 0 0 0%)" }}
        exit={{ opacity: 0, clipPath: "inset(0 100% 0 0)" }}
        transition={{ duration: 0.55, ease: [0.65, 0, 0.35, 1] }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
