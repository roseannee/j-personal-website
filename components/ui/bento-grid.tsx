"use client"

import { m } from "framer-motion"

import { childrenVariants, parentVariants } from "@/lib/framer-variants"
import { cn } from "@/lib/utils"

interface BentoGridProps {
  children: React.ReactNode
}

export const BentoGrid = ({ children }: BentoGridProps) => {
  return (
    <m.div
      initial="hidden"
      animate="visible"
      variants={parentVariants({ delay: 0.5 })}
      className="grid grid-cols-1 gap-4 md:auto-rows-[20rem] md:grid-cols-3"
    >
      {children}
    </m.div>
  )
}

interface BentoGridItemProps {
  className?: string
  children?: React.ReactNode
}

export const BentoGridItem = ({ className, children }: BentoGridItemProps) => {
  return (
    <m.div
      variants={childrenVariants}
      className={cn(
        "group/bento flex cursor-pointer flex-col space-y-2 rounded-xl border border-border bg-background p-4 shadow-sm transition-all hover:shadow-custom dark:hover:border-ring/70",
        className
      )}
    >
      {children}
    </m.div>
  )
}
