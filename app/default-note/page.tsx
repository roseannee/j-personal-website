import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { getDefaultNote } from "@/actions/db.utils"
import { validateRequest } from "@/auth"

import { AnimatedCard } from "@/components/features/default-note-page/animated-card"
import { PageSection } from "@/components/shared/page-section"

export const metadata: Metadata = {
  title: "Стандартна нотатка",
}

export default async function DefaultNote() {
  const { user } = await validateRequest()
  if (!user) redirect("/sign-in")

  const note = await getDefaultNote()

  return (
    <PageSection className="flex items-center justify-center">
      <AnimatedCard note={note} />
    </PageSection>
  )
}
