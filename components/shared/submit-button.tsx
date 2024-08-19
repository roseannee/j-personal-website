import { ButtonStatus } from "@/types/button-status"

import { Button } from "../ui/button"
import { Icons } from "./icons"

interface SubmitButtonProps {
  status: ButtonStatus
}

export const SubmitButton = ({ status }: SubmitButtonProps) => {
  return (
    <Button
      type="submit"
      disabled={status === "loading"}
      className="w-full gap-2"
    >
      {status === "loading" ? (
        <>
          Підтвердження...
          <Icons.loader className="animate-spin" />
        </>
      ) : (
        "Підтвердити"
      )}
    </Button>
  )
}
