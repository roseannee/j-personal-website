import { Button } from "../ui/button"

export const ButtonTrigger = ({ children }: { children: React.ReactNode }) => {
  return (
    <Button
      variant="ghost"
      size="sm"
      click="static"
      className="w-full justify-start px-2 py-1.5"
    >
      {children}
    </Button>
  )
}
