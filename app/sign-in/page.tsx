import { cache } from "react"
import { redirect } from "next/navigation"
import { validateRequest } from "@/auth"

import { AnimatedCard } from "@/components/features/sign-in-page/animated-card"

const getQuote = cache(async () => {
  const res = await fetch("https://zenquotes.io/api/today")

  if (!res.ok) {
    // FIXME update
    throw new Error("Failed to fetch data")
  }

  return res.json()
})

export default async function SignIn() {
  const { user } = await validateRequest()

  if (user) {
    return redirect("/")
  }

  const quote = await getQuote().then((res) => res[0].q)

  return (
    <section className="relative flex h-screen flex-col items-center justify-center space-y-4 bg-grid-black/[0.1] dark:bg-grid-white/[0.2]">
      {/* Radial gradient */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-background [mask-image:radial-gradient(ellipse_at_center,transparent_30%,black)]" />

      <AnimatedCard quote={quote} />
    </section>
  )
}
