"use client"

import { type PropsWithChildren } from "react"
import { LazyMotion } from "framer-motion"
import { Provider } from "jotai"

const loadFeatures = () => import("./features").then((res) => res.default)

const Providers = ({ children }: PropsWithChildren) => {
  return (
    <Provider>
      <LazyMotion strict features={loadFeatures}>
        {children}
      </LazyMotion>
    </Provider>
  )
}

export default Providers
