import { getDefaultNote } from "@/actions/db.utils"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { UpdateDefaultNotesForm } from "@/components/features/update-default-note-page/update-default-note-form"
import { PageSection } from "@/components/shared/page-section"

export default async function DefaultNote() {
  const note = await getDefaultNote()

  return (
    <PageSection className="flex items-center justify-center">
      <Card className="size-full md:w-1/2" variant="default">
        <CardHeader>
          <CardTitle>Стандартна нотатка</CardTitle>
        </CardHeader>

        <CardContent>
          <UpdateDefaultNotesForm note={note} />
        </CardContent>
      </Card>
    </PageSection>
  )
}
