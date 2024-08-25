import { Suspense } from "react"
import { redirect } from "next/navigation"
import { getFutureAppointments } from "@/actions/db-select.actions"
import { validateRequest } from "@/auth"

import { fetchLastPatients } from "@/lib/utils"
import { AnimatedBgGradient } from "@/components/ui/animated-bg-gradient"
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid"
import { DataTableSkeleton } from "@/components/ui/data-table-skeleton"
import { FutureAppointmentsDataTable } from "@/components/data-tables/future-appointments-data-table"
import { LastPatientsDataTable } from "@/components/data-tables/last-patients-data-table"
import { QuickActions } from "@/components/features/home-page/quick-actions"
import { Welcome } from "@/components/features/home-page/welcome"
import { PageSection } from "@/components/shared/page-section"

export default async function Home() {
  const { user } = await validateRequest()
  if (!user) redirect("/sign-in")

  const lastPatients = await fetchLastPatients()
  if (!lastPatients) return []

  const lastAppointments = (await getFutureAppointments()).data
  if (!lastAppointments) return []

  return (
    <PageSection>
      <BentoGrid>
        <BentoGridItem className="relative h-72 md:col-span-2">
          <AnimatedBgGradient />
          <Welcome />
        </BentoGridItem>

        <BentoGridItem className="*:w-56">
          <QuickActions />
        </BentoGridItem>

        <BentoGridItem>
          <Suspense
            fallback={
              <DataTableSkeleton
                columnCount={2}
                rowCount={3}
                withPagination={false}
                className="*:!m-0 *:!p-0"
              />
            }
          >
            <LastPatientsDataTable data={lastPatients} />
          </Suspense>
        </BentoGridItem>

        <BentoGridItem className="md:col-span-2">
          <Suspense
            fallback={
              <DataTableSkeleton
                columnCount={4}
                rowCount={3}
                withPagination={false}
                className="*:!m-0 *:!p-0"
              />
            }
          >
            <FutureAppointmentsDataTable data={lastAppointments} />
          </Suspense>
        </BentoGridItem>
      </BentoGrid>
    </PageSection>
  )
}
