import { differenceInYears, format } from "date-fns"

import { Separator } from "@/components/ui/separator"
import { Typography } from "@/components/ui/typography"
import { Icons } from "@/components/shared/icons"

import { GeneralInfoCardProps } from "./general-info-card"

export const GeneralSection = ({ patient }: GeneralInfoCardProps) => {
  return (
    <div className="flex flex-col space-y-2">
      <Typography variant="large">General info</Typography>

      <div className="group flex items-center space-x-2">
        <Icons.calendar className="size-5 opacity-50" />
        <Typography>{format(patient.birthdate, "dd.MM.yyyy")}</Typography>

        <Separator orientation="vertical" className="h-8" />

        <Typography>
          {differenceInYears(new Date(), patient.birthdate)} y.o.
        </Typography>
      </div>

      <Typography variant="small" className="italic">
        {patient.allergies ? (
          <span className="text-destructive">Has allergies</span>
        ) : (
          "Not allergic"
        )}
      </Typography>
    </div>
  )
}
