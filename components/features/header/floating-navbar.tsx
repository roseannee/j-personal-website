"use client"

import React, { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { signOut } from "@/actions/auth.actions"
import {
  AnimatePresence,
  m,
  useMotionValueEvent,
  useScroll,
} from "framer-motion"

import { siteConfig } from "@/config/site"
import { headerVariants } from "@/lib/framer-variants"
import { cn } from "@/lib/utils"

import { Icons } from "../../shared/icons"
import { Button, buttonVariants } from "../../ui/button"
import { Separator } from "../../ui/separator"
import { ThemeToggle } from "./theme-toggle"

export const FloatingNavbar = () => {
  const { scrollY } = useScroll()
  const [visible, setVisible] = useState(true)

  const currentPath = usePathname()

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious()

    if (typeof previous === "number") {
      if (latest > previous && latest > 0.05) {
        setVisible(false)
      } else {
        setVisible(true)
      }
    }
  })

  return (
    <AnimatePresence mode="wait">
      <m.header
        initial="hidden"
        animate="visible"
        variants={headerVariants({ visible })}
        className="fixed inset-x-0 top-5 z-50 mx-auto max-w-fit rounded-full border border-border bg-background px-8 py-2 shadow-header"
      >
        <nav className="flex items-center justify-center space-x-4">
          {siteConfig.mainNav.map((item, index) => (
            <Link
              key={`nav-item-${index}`}
              href={item.href}
              className={cn(
                "group transition-colors",
                buttonVariants({
                  variant: "ghost",
                  size: "icon",
                })
              )}
            >
              {/* IMPROVE */}
              {React.cloneElement(item.icon as React.ReactElement, {
                className: cn(
                  currentPath === item.href
                    ? "text-ring"
                    : "text-muted-foreground group-hover:text-foreground"
                ),
              })}
              <span className="sr-only">{item.title}</span>
            </Link>
          ))}

          <Separator orientation="vertical" className="h-8" />

          <ThemeToggle />

          <form action={signOut}>
            <Button type="submit" size="icon" variant="ghost">
              <Icons.signOut />
              <span className="sr-only">Sign out</span>
            </Button>
          </form>
        </nav>
      </m.header>
    </AnimatePresence>
  )
}
