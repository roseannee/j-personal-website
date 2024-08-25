"use client"

import { m } from "framer-motion"

import { bottomFadeVariants } from "@/lib/framer-variants"
import { Typography } from "@/components/ui/typography"

const MTypography = m(Typography)

export const AnimatedHeading = () => {
  return (
    <MTypography
      initial="hidden"
      animate="visible"
      variants={bottomFadeVariants({ delay: 0.5 })}
      variant="h1"
    >
      Мої пацієнти
    </MTypography>
  )
}
