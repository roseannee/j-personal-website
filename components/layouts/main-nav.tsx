import Link from "next/link"

import { NavItem } from "@/types/nav"
import { siteConfig } from "@/config/site"

import { Icons } from "../shared/icons"
import { Typography } from "../ui/typography"
import { NavList } from "./nav-list"

export function MainNav() {
  return (
    <div className="flex gap-6 md:gap-10">
      <Link href="/" className="flex items-center space-x-2">
        <Icons.logo className="size-6" />
        <Typography variant="large">{siteConfig.name}</Typography>
      </Link>

      <NavList items={siteConfig.mainNav} />
    </div>
  )
}
