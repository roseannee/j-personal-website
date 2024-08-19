import { notFound } from "next/navigation"
import { getPatient } from "@/actions/db-select.actions"

import { Tab } from "@/types/tab"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Tabs } from "@/components/ui/tabs"
import { Typography } from "@/components/ui/typography"
import { GeneralInfoCard } from "@/components/features/my-patients-page/select/general-info-card"
import { NoteCard } from "@/components/features/my-patients-page/select/note-card"
import { TreatmentsCard } from "@/components/features/my-patients-page/select/treatments-card"
import { PageSection } from "@/components/shared/page-section"

interface PatientCardPageProps {
  params: {
    id: string
  }
}

export default async function PatientCardPage({
  params,
}: PatientCardPageProps) {
  const { data } = await getPatient(params.id)
  const patient = data?.patient

  // TODO make notFound page
  if (!patient) {
    notFound()
  }

  const tabs: Tab[] = [
    {
      title: "Нотатки",
      value: "notes",
      content: (
        <NoteCard patientId={patient.id} note={patient.note.noteContent} />
      ),
    },
    {
      title: "Процедури",
      value: "treatments",
      content: <TreatmentsCard appointment={patient.appointments} />,
    },
  ]

  return (
    <PageSection className="flex flex-col gap-4 md:h-[82vh] md:flex-row">
      <div className="flex flex-col justify-stretch space-y-4 *:h-full xl:w-1/4">
        <GeneralInfoCard
          // IMPROVE
          patient={{
            ...patient,
            phoneNumber: patient.phoneNumber ?? undefined,
            telegram: patient.telegram ?? undefined,
            instagram: patient.instagram ?? undefined,
          }}
        />

        <Card>
          <CardHeader />
          <CardContent>
            <Typography variant="muted" className="italic">
              Quick info
            </Typography>
          </CardContent>
          <CardFooter />
        </Card>
      </div>

      <Tabs tabs={tabs} />
    </PageSection>
  )
}
