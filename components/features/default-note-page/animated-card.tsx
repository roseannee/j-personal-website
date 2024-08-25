"use client"

import { m } from "framer-motion"

import { bottomFadeVariants } from "@/lib/framer-variants"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import { UpdateDefaultNotesForm } from "./update-default-note-form"

interface AnimatedCardProps {
  note: string
}

const MCard = m(Card)

export const AnimatedCard = ({ note }: AnimatedCardProps) => {
  return (
    <MCard
      initial="hidden"
      animate="visible"
      variants={bottomFadeVariants({ delay: 0.5 })}
      className="size-full md:w-1/2"
      variant="default"
    >
      <CardHeader>
        <CardTitle>Стандартна нотатка</CardTitle>
      </CardHeader>

      <CardContent>
        <UpdateDefaultNotesForm note={note} />
      </CardContent>
    </MCard>
  )
}
