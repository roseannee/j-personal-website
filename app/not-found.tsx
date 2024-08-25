import { BackHomeButton } from "@/components/ui/back-home-button"
import { Typography } from "@/components/ui/typography"
import { PageSection } from "@/components/shared/page-section"

export default function NotFound() {
  return (
    <PageSection className="flex flex-col items-center justify-center space-y-4">
      <Typography variant="h2">Такої сторінки не існує ☹</Typography>

      <BackHomeButton />
    </PageSection>
  )
}
