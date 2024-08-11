import Link from "next/link"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/shared/icons"

export const QuickPatient = () => {
  return (
    <>
      <Icons.newPatient className="size-16 transition-colors group-hover/item:text-ring md:size-24" />

      <Link
        href={siteConfig.mainNav[2].href}
        className={cn("group/button gap-3", buttonVariants({ size: "lg" }))}
      >
        Add new patient
        <Icons.arrow className="transition-all group-hover/button:translate-x-2" />
      </Link>
    </>
  )
}
