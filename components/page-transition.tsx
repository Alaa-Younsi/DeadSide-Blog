"use client"

import { motion } from "motion/react"
import { usePathname } from "next/navigation"
import type { ReactNode } from "react"

const EASE = [0.65, 0, 0.35, 1] as const

export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname()

  return (
    <div key={pathname} className="relative overflow-x-clip">
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: EASE }}
      >
        {children}
      </motion.div>
      <motion.div
        aria-hidden="true"
        className="page-turn-shade pointer-events-none absolute inset-y-0 left-0 w-1/3"
        initial={{ x: "-110%", opacity: 0 }}
        animate={{ x: "320%", opacity: [0, 1, 0] }}
        transition={{ duration: 0.75, ease: EASE }}
      />
    </div>
  )
}
