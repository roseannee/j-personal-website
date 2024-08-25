import React from "react"

import { Button } from "./button"

export const ButtonTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<typeof Button>
>(({ children, ...props }, ref) => {
  return (
    <Button
      ref={ref}
      variant="ghost"
      size="sm"
      click="static"
      className="w-full justify-start px-2 py-1.5"
      {...props}
    >
      {children}
    </Button>
  )
})
ButtonTrigger.displayName = "ButtonTrigger"
