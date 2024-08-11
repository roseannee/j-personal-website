import { notFound } from "next/navigation"
import { getPatient } from "@/actions/patient.actions"

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Typography } from "@/components/ui/typography"
import { GeneralInfoCard } from "@/components/features/my-patients-page/select/general-info-card"
import { PageSection } from "@/components/shared/page-section"

interface PatientCardPageProps {
  params: {
    id: string
  }
}

export default async function PatientCardPage({
  params,
}: PatientCardPageProps) {
  const patient = (await getPatient(params.id)).data?.patient

  if (!patient) notFound()

  return (
    <PageSection className="flex flex-col gap-4 md:h-[82vh] md:flex-row">
      <div className="flex flex-col justify-stretch space-y-4 *:h-full xl:w-1/4">
        <GeneralInfoCard patient={patient} />
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
    </PageSection>
  )
}
