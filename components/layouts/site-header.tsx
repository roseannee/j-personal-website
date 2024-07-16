import Link from "next/link"
import { signOut } from "@/actions/auth.actions"

import { siteConfig } from "@/config/site"
import { Button, buttonVariants } from "@/components/ui/button"

import { Icons } from "../shared/icons"
import { MainNav } from "./main-nav"
import { ThemeToggle } from "./theme-toggle"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/60 backdrop-blur-sm">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        {/* TODO make floating navbar */}
        <MainNav />

        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">
            <Link
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
              className={buttonVariants({
                size: "icon",
                variant: "ghost",
              })}
            >
              <Icons.gitHub className="size-6" />
              <span className="sr-only">GitHub</span>
            </Link>

            <ThemeToggle />

            {/* TODO make toast */}
            <form action={signOut}>
              <Button type="submit" size="icon" variant="ghost">
                <Icons.signOut />
                <span className="sr-only">Sign out</span>
              </Button>
            </form>
          </nav>
        </div>
      </div>
    </header>
  )
}
