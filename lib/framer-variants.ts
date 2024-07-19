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

interface HeaderVariantsConfig {
  visible: boolean
}
type HeaderVariantsType = (config: HeaderVariantsConfig) => Variants

export const headerVariants: HeaderVariantsType = (config) => {
  return {
    hidden: {
      opacity: 1,
      y: -100,
    },
    visible: {
      opacity: config.visible ? 1 : 0,
      y: config.visible ? 0 : -100,
      transition: { type: "spring", bounce: 0.4, duration: 0.7 },
    },
  }
}

interface PatentVariantsConfig {
  delay?: number | undefined
}
type ParentVariantsType = (config?: PatentVariantsConfig) => Variants

export const parentVariants: ParentVariantsType = (config?) => {
  return {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.5,
        delay: config?.delay ?? undefined,
      },
    },
  }
}

export const childrenVariants: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
  },
}

export const gradientBackgroundVariants: Variants = {
  hidden: {
    backgroundPosition: "0 50%",
  },
  visible: {
    backgroundPosition: ["0, 50%", "100% 50%", "0 50%"],
  },
}
