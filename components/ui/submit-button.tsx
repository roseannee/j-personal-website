import { ButtonStatus } from "@/types/button-status"
import { cn } from "@/lib/utils"

import { Icons } from "../shared/icons"
import { Button } from "../ui/button"

interface SubmitButtonProps extends React.ComponentProps<typeof Button> {
  status: ButtonStatus
}

export const SubmitButton = ({ status, className }: SubmitButtonProps) => {
  return (
    <Button
      type="submit"
      disabled={status === "loading"}
      className={cn("w-full gap-2", className)}
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
