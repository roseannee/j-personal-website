import React from "react"

import { Button } from "./button"

export const CloseButton = React.forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<typeof Button>
>(({ children, ...props }, ref) => {
  return (
    <Button ref={ref} variant="ghost" {...props}>
      Ні
    </Button>
  )
})
CloseButton.displayName = "CloseButton"
