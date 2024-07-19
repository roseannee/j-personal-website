import { redirect } from "next/navigation"
import { validateRequest } from "@/auth"

import { getQuote } from "@/lib/utils"
import { RadialGradient } from "@/components/ui/radial-gradient"
import { AnimatedSection } from "@/components/features/sign-in-page/animated-section"

export default async function SignIn() {
  const { user } = await validateRequest()

  if (user) {
    redirect("/")
  }

  const quote = await getQuote()

  return (
    <section className="relative mx-5 h-screen bg-grid-black/[0.1] dark:bg-grid-white/[0.2]">
      <RadialGradient />
      <AnimatedSection quote={quote} />
    </section>
  )
}
