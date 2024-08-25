import Link from "next/link"
import { Patient } from "@/types"
import { SiInstagram, SiTelegram } from "@icons-pack/react-simple-icons"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Typography } from "@/components/ui/typography"
import { Icons } from "@/components/shared/icons"

interface ContactSectionProps {
  phoneNumber: Patient["phoneNumber"]
  telegram: Patient["telegram"]
  instagram: Patient["instagram"]
}

export const ContactSection = ({
  phoneNumber,
  telegram,
  instagram,
}: ContactSectionProps) => {
  return phoneNumber || telegram || instagram ? (
    <div>
      <Typography variant="large">Способи зв&apos;язку</Typography>

      {phoneNumber && (
        <Link
          href={`tel:+380${phoneNumber}`}
          className={cn(buttonVariants({ variant: "outline" }))}
        >
          +380{phoneNumber}
          <Icons.phone className="ml-auto opacity-50" />
        </Link>
      )}

      {telegram && (
        <Link
          href={`https://t.me/${telegram}`}
          className={cn(buttonVariants({ variant: "outline" }))}
        >
          @{telegram}
          <SiTelegram className="ml-auto size-5 opacity-50" />
        </Link>
      )}

      {instagram && (
        <Link
          href={`https://www.instagram.com/${instagram}`}
          className={cn(buttonVariants({ variant: "outline" }))}
        >
          @{instagram}
          <SiInstagram className="ml-auto size-5 opacity-50" />
        </Link>
      )}
    </div>
  ) : null
}
