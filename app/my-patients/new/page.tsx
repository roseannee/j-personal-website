import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CreatePatientForm } from "@/components/features/my-patients-page/create/create-patient-form"
import { PageSection } from "@/components/shared/page-section"

export default async function AddNewPatient() {
  return (
    <PageSection className="flex items-center justify-center">
      <Card className="w-[320px] md:w-max" variant="default">
        <CardHeader>
          <CardTitle>Новий пацієнт</CardTitle>
        </CardHeader>

        <CardContent>
          <CreatePatientForm />
        </CardContent>
      </Card>
    </PageSection>
  )
}
