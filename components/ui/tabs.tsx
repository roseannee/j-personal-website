"use client"

import { useState } from "react"
import { AnimatePresence, m } from "framer-motion"
import { useIsClient, useMediaQuery } from "usehooks-ts"

import { Tab } from "@/types/tab"

import { Button } from "./button"
import { Card } from "./card"

interface TabsProps {
  tabs: Tab[]
}

export const Tabs = ({ tabs: propTabs }: TabsProps) => {
  const [active, setActive] = useState<Tab>(propTabs[0])
  const [tabs, setTabs] = useState<Tab[]>(propTabs)
  const [hovering, setHovering] = useState(false)

  const moveSelectedTabToTop = (index: number) => {
    const newTabs = [...propTabs]
    const selectedTab = newTabs.splice(index, 1)
    newTabs.unshift(selectedTab[0])
    setTabs(newTabs)
    setActive(newTabs[0])
  }

  return (
    <div className="flex flex-1 flex-col space-y-5">
      <div className="no-visible-scrollbar relative flex flex-row space-x-2">
        {propTabs.map((tab, index) => (
          <Button
            key={tab.title}
            onClick={() => {
              moveSelectedTabToTop(index)
            }}
            onPointerEnter={() => setHovering(true)}
            onPointerLeave={() => setHovering(false)}
            variant={active.value === tab.value ? "default" : "outline"}
          >
            {tab.title}
          </Button>
        ))}
      </div>

      <div className="relative z-40 h-[calc(24rem_*_1.5)] w-full md:h-full">
        <TabContent
          key={active.value}
          tabs={tabs}
          active={active}
          hovering={hovering}
        />
      </div>
    </div>
  )
}

const MCard = m(Card)

export const TabContent = ({
  tabs,
  hovering,
}: {
  key: string
  tabs: Tab[]
  active: Tab
  hovering: boolean
}) => {
  const isClient = useIsClient()
  const isDesktop = useMediaQuery("(min-width: 768px)")

  const isActive = (tab: Tab) => {
    return tab.value === tabs[0].value
  }

  return tabs.map((tab, idx) => (
    <AnimatePresence mode="wait" initial={false} key={tab.value}>
      <MCard
        initial={false}
        layoutId={tab.value}
        animate={{
          y: isActive(tab) ? [0, 40, 0] : 0,
          scale: 1 - idx * 0.1,
          // TODO mobile ver
          top: isClient && !isDesktop ? idx * -40 : hovering ? idx * -40 : 0,
          // top: hovering ? idx * -40 : 0,
          zIndex: -idx,
          opacity: 1 - idx * 0.1,
        }}
        className="absolute inset-0"
      >
        {tab.content}
      </MCard>
    </AnimatePresence>
  ))
}
