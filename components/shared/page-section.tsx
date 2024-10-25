import { cn } from "@/lib/utils"

import { RadialGradient } from "../ui/radial-gradient"

interface PageSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export const PageSection = ({ children, className }: PageSectionProps) => {
  return (
    <section className="min-h-lvh pb-6 pt-24 bg-dot-black/[0.4] dark:bg-dot-white/[0.4] md:pb-10">
      <RadialGradient />

      <div
        className={cn(
          "container relative h-full min-h-[calc(100vh_-_24px_-_96px)] md:min-h-[calc(100vh_-_40px_-_96px)]",
          className
        )}
      >
        {children}
      </div>
    </section>
  )
}
