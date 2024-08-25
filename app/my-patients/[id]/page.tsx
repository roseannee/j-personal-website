import type { Metadata } from "next"
import { notFound, redirect } from "next/navigation"
import { getPatient } from "@/actions/db-select.actions"
import { validateRequest } from "@/auth"

import { Tab } from "@/types/tab"
import { fetchLastPatients } from "@/lib/utils"
import { AnimatedPatientSection } from "@/components/features/my-patients-page/select/animated-patient-section"
import { ImagesCard } from "@/components/features/my-patients-page/select/images-card"
import { NoteCard } from "@/components/features/my-patients-page/select/note-card"
import { TreatmentsCard } from "@/components/features/my-patients-page/select/treatments-card"
import { PageSection } from "@/components/shared/page-section"

interface PatientCardPageProps {
  params: {
    id: string
  }
}
export async function generateMetadata({
  params,
}: PatientCardPageProps): Promise<Metadata> {
  const id = params.id

  const fullName = (await getPatient(id)).data?.patient.fullName

  return {
    title: fullName,
  }
}

export default async function PatientCardPage({
  params,
}: PatientCardPageProps) {
  const { user } = await validateRequest()
  if (!user) redirect("/sign-in")

  const { data: patientData } = await getPatient(params.id)
  if (!patientData) return notFound()

  const patient = patientData.patient!
  const note = patientData.note
  const appointments = patientData.formattedAppointments

  const lastPatients = await fetchLastPatients()
  if (!lastPatients) return []

  const tabs: Tab[] = [
    {
      title: "Нотатки",
      value: "notes",
      content: <NoteCard note={note} />,
    },
    {
      title: "Процедури",
      value: "treatments",
      content: <TreatmentsCard appointment={appointments} />,
    },
    {
      title: "Світлини",
      value: "photos",
      content: <ImagesCard patientId={params.id} />,
    },
  ]

  return (
    <PageSection className="flex flex-col gap-4 md:flex-row">
      <AnimatedPatientSection
        patient={patient}
        lastPatients={lastPatients}
        tabs={tabs}
      />
    </PageSection>
  )
}
