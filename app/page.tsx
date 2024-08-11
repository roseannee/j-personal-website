import { AnimatedBgGradient } from "@/components/ui/animated-bg-gradient"
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid"
import { Typography } from "@/components/ui/typography"
import { QuickPatient } from "@/components/features/home-page/quick-patient"
import { Welcome } from "@/components/features/home-page/welcome"
import { PageSection } from "@/components/shared/page-section"

export default async function Home() {
  // const { user } = await validateRequest()

  // if (!user) {
  //   redirect("/sign-in")
  // }

  return (
    <PageSection>
      <BentoGrid>
        <BentoGridItem className="relative md:col-span-2">
          <AnimatedBgGradient />
          <Welcome />
        </BentoGridItem>

        <BentoGridItem>
          <QuickPatient />
        </BentoGridItem>

        <BentoGridItem>
          <Typography variant="muted">Upcoming events</Typography>
        </BentoGridItem>

        <BentoGridItem className="md:col-span-2">
          <Typography variant="muted">
            Small representation of the patient table
          </Typography>
        </BentoGridItem>
      </BentoGrid>
    </PageSection>
  )
}
