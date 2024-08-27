import { Suspense } from "react"
import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { getAllPatients } from "@/actions/db-select.actions"
import { validateRequest } from "@/auth"

import { DataTableSkeleton } from "@/components/ui/data-table-skeleton"
import { AllPatientsDataTable } from "@/components/data-tables/all-patients-data-table"
import { AnimatedHeading } from "@/components/features/my-patients-page/animated-heading"
import { PageSection } from "@/components/shared/page-section"

export const metadata: Metadata = {
  title: "Мої пацієнти",
}

export default async function MyPatients() {
  const { user } = await validateRequest()
  if (!user) redirect("/sign-in")

  const { data } = await getAllPatients()
  if (!data) return []

  return (
    <PageSection className="flex flex-col space-y-3">
      <AnimatedHeading />

      <Suspense
        fallback={
          <DataTableSkeleton
            columnCount={4}
            rowCount={6}
            searchableColumnCount={1}
          />
        }
      >
        <AllPatientsDataTable data={data} />
      </Suspense>
    </PageSection>
  )
}
