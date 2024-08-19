import { Patient } from "@/types"
import { differenceInYears } from "date-fns"

import { formatDate } from "@/lib/utils"
import { Separator } from "@/components/ui/separator"
import { Typography } from "@/components/ui/typography"
import { Icons } from "@/components/shared/icons"

interface GeneralSectionProps {
  birthdate: Patient["birthdate"]
  allergies: Patient["allergies"]
}

export const GeneralSection = ({
  birthdate,
  allergies,
}: GeneralSectionProps) => {
  return (
    <div className="flex flex-col space-y-2">
      <Typography variant="large">Загальна інформація</Typography>

      <div className="group flex items-center space-x-2">
        <Icons.calendar className="size-5 opacity-50" />
        <Typography>{formatDate(birthdate)}</Typography>

        <Separator orientation="vertical" className="h-8" />

        <Typography>{differenceInYears(new Date(), birthdate)}</Typography>
      </div>

      <Typography variant="small" className="italic">
        {allergies ? (
          <span className="text-destructive">Має алергію</span>
        ) : (
          "Не є алергіком"
        )}
      </Typography>
    </div>
  )
}
