import { type Variants } from "framer-motion"

interface BottomFadeVariantsConfig {
  delay?: number | undefined
}
type BottomFadeVariantsType = (config?: BottomFadeVariantsConfig) => Variants

export const bottomFadeVariants: BottomFadeVariantsType = (config?) => {
  return {
    hidden: {
      opacity: 0,
      y: 25,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        bounce: 0.5,
        duration: 0.9,
        delay: config?.delay ?? undefined,
      },
    },
  }
}
