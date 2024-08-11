import { useEffect } from "react"
import { m, stagger, useAnimate } from "framer-motion"

import { Typography } from "./typography"

interface TextGenerateEffectProps {
  words: string
}

export const TextGenerateEffect = ({ words }: TextGenerateEffectProps) => {
  const [scope, animate] = useAnimate()

  let wordsArray = words.split(" ")

  useEffect(() => {
    animate(
      "span",
      {
        opacity: 1,
      },
      {
        duration: 2,
        delay: stagger(0.2),
      }
    )
  }, [animate])

  const renderWords = () => {
    return (
      <m.div ref={scope}>
        {wordsArray.map((word, idx) => {
          return (
            <m.span key={word + idx} className="opacity-0">
              {word}{" "}
            </m.span>
          )
        })}
      </m.div>
    )
  }

  return (
    <Typography
      variant="small"
      className="text-center italic text-muted-foreground"
    >
      {renderWords()}
    </Typography>
  )
}
