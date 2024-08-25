import React from "react"

import { ButtonStatus } from "@/types/button-status"

import { Icons } from "../shared/icons"
import { Button } from "./button"

interface SubmitDeleteButtonProps
  extends React.ComponentPropsWithoutRef<typeof Button> {
  status: ButtonStatus
  handleSubmit: () => void
}

export const SubmitDeleteButton = React.forwardRef<
  HTMLButtonElement,
  SubmitDeleteButtonProps
>(({ status, handleSubmit, children, ...props }, ref) => {
  return (
    <form onSubmit={() => handleSubmit()}>
      <Button
        ref={ref}
        type="submit"
        variant="destructive"
        disabled={status === "loading"}
        {...props}
      >
        {status === "loading" ? (
          <>
            Видалення...
            <Icons.loader className="mr-2 animate-spin" />
          </>
        ) : (
          "Так"
        )}
      </Button>
    </form>
  )
})
SubmitDeleteButton.displayName = "SubmitDeleteButton"
