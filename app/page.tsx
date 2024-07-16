import { redirect } from "next/navigation"
import { validateRequest } from "@/auth"

import { Typography } from "@/components/ui/typography"

export default async function Home() {
  const { user } = await validateRequest()

  if (!user) {
    redirect("/sign-in")
  }

  return (
    <section className="container flex flex-col space-y-4 py-6 md:py-10">
      <Typography variant="h1">Welcome!</Typography>
    </section>
  )
}
