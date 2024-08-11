"use client"

import { m } from "framer-motion"

import { gradientBackgroundVariants } from "@/lib/framer-variants"

export const AnimatedBgGradient = () => {
  return (
    <m.div
      initial="hidde"
      animate="visible"
      variants={gradientBackgroundVariants}
      transition={{
        duration: 4,
        repeat: Infinity,
        repeatType: "reverse",
      }}
      className="pointer-events-none absolute inset-4 rounded-lg opacity-40"
      style={{
        background:
          "linear-gradient(45deg, #818CF8, #F882C9, #F8EC82, #82F8B1)",
        backgroundSize: "400% 400%",
      }}
    />
  )
}
