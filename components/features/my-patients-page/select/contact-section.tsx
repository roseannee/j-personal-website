import Link from "next/link"
import { SiInstagram, SiTelegram } from "@icons-pack/react-simple-icons"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Typography } from "@/components/ui/typography"
import { Icons } from "@/components/shared/icons"

import { GeneralInfoCardProps } from "./general-info-card"

export const ContactSection = ({ patient }: GeneralInfoCardProps) => {
  return patient.phoneNumber || patient.telegram || patient.instagram ? (
    <div>
      <Typography variant="large">Contact</Typography>

      {patient.phoneNumber && (
        <Link
          href={`tel:+380${patient.phoneNumber}`}
          className={cn(buttonVariants({ variant: "outline" }))}
        >
          {patient.phoneNumber}
          <Icons.phone className="ml-auto opacity-50" />
        </Link>
      )}

      {patient.telegram && (
        <Link
          href={`https://t.me/${patient.telegram}`}
          className={cn(buttonVariants({ variant: "outline" }))}
        >
          {patient.telegram}
          <SiTelegram className="ml-auto size-5 opacity-50" />
        </Link>
      )}

      {patient.instagram && (
        <Link
          href={`https://www.instagram.com/${patient.instagram}`}
          className={cn(buttonVariants({ variant: "outline" }))}
        >
          {patient.instagram}
          <SiInstagram className="ml-auto size-5 opacity-50" />
        </Link>
      )}
    </div>
  ) : null
}
