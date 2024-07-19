import Link from "next/link"
import { redirect } from "next/navigation"
import { validateRequest } from "@/auth"

import { cn, getQuote } from "@/lib/utils"
import { AnimantedGradientBackground } from "@/components/ui/animated-gradient-background"
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid"
import { buttonVariants } from "@/components/ui/button"
import { RadialGradient } from "@/components/ui/radial-gradient"
import { Typography } from "@/components/ui/typography"
import { Icons } from "@/components/shared/icons"

export default async function Home() {
  const { user } = await validateRequest()

  if (!user) {
    redirect("/sign-in")
  }

  const quote = await getQuote()

  return (
    <section className="h-screen py-6 !pt-24 bg-dot-black/[0.4] dark:bg-dot-white/[0.4] md:py-10">
      <RadialGradient />

      <div className="container relative">
        <BentoGrid>
          <BentoGridItem className="relative md:col-span-2">
            <AnimantedGradientBackground />

            <div className="relative z-10 flex h-full flex-col items-center justify-center space-y-2 p-4 *:text-center">
              <Typography variant="h1">Welcome!</Typography>

              <Typography variant="large">
                Today is {new Date().toLocaleDateString()}.
              </Typography>

              <Typography variant="small" className="pt-2 italic text-ring">
                {quote}
              </Typography>
            </div>
          </BentoGridItem>

          <BentoGridItem className="group/item items-center justify-center">
            <Icons.newPatient className="size-16 transition-colors group-hover/item:text-ring md:size-24" />

            <Link
              href="/patients/add"
              className={cn(
                "group/button gap-3",
                buttonVariants({ size: "lg" })
              )}
            >
              Add new patient
              <Icons.arrow className="transition-all group-hover/button:translate-x-2" />
            </Link>
          </BentoGridItem>

          <BentoGridItem className="items-center justify-center">
            <Typography variant="muted">Upcoming events</Typography>
          </BentoGridItem>

          <BentoGridItem className="items-center justify-center md:col-span-2">
            <Typography variant="muted">
              Small representation of the patient table
            </Typography>
          </BentoGridItem>
        </BentoGrid>
      </div>
    </section>
  )
}
