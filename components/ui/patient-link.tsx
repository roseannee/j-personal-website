import Link from "next/link"

import { cn } from "@/lib/utils"

import { Icons } from "../shared/icons"
import { buttonVariants } from "./button"

interface PatientLinkProps {
  patientId: string
}

export const PatientLink = ({ patientId }: PatientLinkProps) => {
  return (
    <Link
      href={`/my-patients/${patientId}`}
      className={cn(
        "w-full",
        buttonVariants({ variant: "outline", size: "sm" })
      )}
    >
      <Icons.arrow />
    </Link>
  )
}
