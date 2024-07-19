"use client"

import { m } from "framer-motion"

import { gradientBackgroundVariants } from "@/lib/framer-variants"

export function AnimantedGradientBackground() {
  return (
    <m.div
      initial="initial"
      animate="animate"
      variants={gradientBackgroundVariants}
      transition={{
        duration: 5,
        repeat: Infinity,
        repeatType: "reverse",
      }}
      // TODO calc rounded-lg
      className="pointer-events-none absolute inset-4 rounded-lg opacity-40"
      style={{
        background:
          // IMPROVE gradient colors
          "linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)",
        backgroundSize: "400% 400%",
      }}
    />
  )
}
