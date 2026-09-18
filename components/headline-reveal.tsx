"use client"

import { motion } from "motion/react"

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.045, delayChildren: 0.1 } },
}

const word = {
  hidden: { opacity: 0, clipPath: "inset(0 0 100% 0)", y: 6 },
  show: {
    opacity: 1,
    clipPath: "inset(0 0 0% 0)",
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
}

export function HeadlineReveal({ text }: { text: string }) {
  const words = text.split(" ")

  return (
    <motion.span initial="hidden" animate="show" variants={container} className="inline">
      {words.map((w, index) => (
        <motion.span
          // biome-ignore lint/suspicious/noArrayIndexKey: headline words are static per render
          key={index}
          variants={word}
          className="inline-block"
        >
          {w}
          {index < words.length - 1 ? " " : ""}
        </motion.span>
      ))}
    </motion.span>
  )
}
