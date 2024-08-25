import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { validateRequest } from "@/auth"

import { getQuote } from "@/lib/utils"
import { RadialGradient } from "@/components/ui/radial-gradient"
import { AnimatedSection } from "@/components/features/sign-in-page/animated-section"

export const metadata: Metadata = {
  title: "Вхід",
}

export default async function SignIn() {
  const { user } = await validateRequest()

  if (user) {
    redirect("/")
  }

  const quote = await getQuote()

  return (
    <section className="flex min-h-screen bg-dot-black/[0.4] dark:bg-dot-white/[0.4] md:py-10">
      <RadialGradient />

      <div className="container relative flex flex-1 flex-col items-center justify-center space-y-4">
        <AnimatedSection quote={quote} />
      </div>
    </section>
  )
}
