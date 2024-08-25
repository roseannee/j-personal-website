"use client"

import { m } from "framer-motion"

import { bottomFadeVariants } from "@/lib/framer-variants"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import { CreatePatientForm } from "./create-patient-form"

const MCard = m(Card)

export const AnimatedNewPatientCard = () => {
  return (
    <MCard
      initial="hidden"
      animate="visible"
      variants={bottomFadeVariants({ delay: 0.5 })}
      className="w-[320px] md:w-max"
      variant="default"
    >
      <CardHeader>
        <CardTitle>Новий пацієнт</CardTitle>
      </CardHeader>

      <CardContent>
        <CreatePatientForm />
      </CardContent>
    </MCard>
  )
}
