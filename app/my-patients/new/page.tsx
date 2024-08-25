import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { validateRequest } from "@/auth"

import { AnimatedNewPatientCard } from "@/components/features/my-patients-page/create/animated-new-patient-card"
import { PageSection } from "@/components/shared/page-section"

export const metadata: Metadata = {
  title: "Новий пацієнт",
}

export default async function AddNewPatient() {
  const { user } = await validateRequest()
  if (!user) redirect("/sign-in")

  return (
    <PageSection className="flex items-center justify-center">
      <AnimatedNewPatientCard />
    </PageSection>
  )
}
