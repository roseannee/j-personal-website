"use client"

import { Patient } from "@/types"
import { m } from "framer-motion"

import { PatientBrief } from "@/types/patient-brief"
import { Tab } from "@/types/tab"
import { bottomFadeVariants } from "@/lib/framer-variants"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs } from "@/components/ui/tabs"
import { LastPatientsDataTable } from "@/components/data-tables/last-patients-data-table"

import { GeneralInfoCard } from "./general-info-card"

interface AnimatedSectionProps {
  patient: Patient
  lastPatients: PatientBrief[]
  tabs: Tab[]
}

export const AnimatedPatientSection = ({
  patient,
  lastPatients,
  tabs,
}: AnimatedSectionProps) => {
  return (
    <>
      <m.div
        initial="hidden"
        animate="visible"
        variants={bottomFadeVariants({ delay: 0.5 })}
        className="flex flex-col justify-stretch space-y-4 md:w-1/3 xl:w-1/4"
      >
        <GeneralInfoCard patient={patient} />

        <Card>
          <CardContent className="flex items-center pt-6">
            <LastPatientsDataTable data={lastPatients} />
          </CardContent>
        </Card>
      </m.div>

      <m.div
        initial="hidden"
        animate="visible"
        variants={bottomFadeVariants({ delay: 0.8 })}
        className="flex-1"
      >
        <Tabs tabs={tabs} />
      </m.div>
    </>
  )
}
