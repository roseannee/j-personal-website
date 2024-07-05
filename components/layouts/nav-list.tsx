"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { NavItem } from "@/types/nav"
import { cn } from "@/lib/utils"

import { typographyVariants } from "../ui/typography"

interface NavListProps {
  items: NavItem[]
}

export function NavList({ items }: NavListProps) {
  const currentPath = usePathname()

  return (
    <nav className="flex gap-6">
      {items?.map(
        (item, index) =>
          item.href && (
            <Link
              key={index}
              href={item.href}
              className={cn(
                typographyVariants({ variant: "small" }),
                "flex items-center text-muted-foreground transition-colors hover:text-foreground",
                item.disabled && "cursor-not-allowed opacity-80",
                currentPath === item.href && "text-foreground"
              )}
            >
              {item.title}
            </Link>
          )
      )}
    </nav>
  )
}
