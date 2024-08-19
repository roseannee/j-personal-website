import Link from "next/link"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Icons } from "@/components/shared/icons"

export const QuickActions = () => {
  return (
    <>
      <Icons.newPatient className="size-16 transition-colors group-hover/item:text-ring md:size-20" />

      <Link
        href={siteConfig.mainNav[2].href}
        className={cn("group/button gap-3", buttonVariants({ size: "lg" }))}
      >
        Додати нового пацієнта
        <Icons.arrow className="transition-all group-hover/button:translate-x-2" />
      </Link>

      <Separator />

      <Link
        href="/default-note"
        className={cn(buttonVariants({ variant: "secondary", size: "lg" }))}
      >
        Оновити стандартну нотатку
      </Link>
    </>
  )
}
