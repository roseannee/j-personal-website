import { Patient } from "@/server/schema"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import { UpdatePatient } from "../update/update-patient"
import { ContactSection } from "./contact-section"
import { GeneralSection } from "./general-section"

export interface GeneralInfoCardProps {
  patient: Patient
}

export const GeneralInfoCard = ({ patient }: GeneralInfoCardProps) => {
  return (
    <Card>
      <CardHeader className="relative">
        <CardTitle
          className={patient.gender === "male" ? "text-ring" : "text-pink-400"}
        >
          {patient.fullName}
        </CardTitle>

        <UpdatePatient patient={patient} />
      </CardHeader>
      <CardContent className="flex flex-col space-y-8 *:flex *:flex-col *:space-y-2">
        <GeneralSection patient={patient} />
        <ContactSection patient={patient} />
      </CardContent>
    </Card>
  )
}
