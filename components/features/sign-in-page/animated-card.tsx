"use client"

import { m } from "framer-motion"

import { bottomFadeVariants } from "@/lib/framer-variants"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TextGenerateEffect } from "@/components/ui/text-generate-effect"

import { SignInForm } from "./sign-in-form"

const MCard = m(Card)

export function AnimatedCard({ quote }: { quote: string }) {
  return (
    <>
      <MCard
        initial="hidden"
        animate="visible"
        variants={bottomFadeVariants()}
        className="w-[350px]"
      >
        <CardHeader>
          <CardTitle>Sign in</CardTitle>
        </CardHeader>
        <CardContent>
          <SignInForm />
        </CardContent>
        {/* TODO maybe make submit button there? */}
      </MCard>

      <TextGenerateEffect words={quote} />
    </>
  )
}
