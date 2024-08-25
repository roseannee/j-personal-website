import Link from "next/link"

import { Icons } from "../shared/icons"
import { buttonVariants } from "./button"

export const BackHomeButton = () => {
  return (
    <Link href="/" className={buttonVariants({ variant: "outline" })}>
      Повернутися на головну
      <Icons.home className="ml-2" />
    </Link>
  )
}
