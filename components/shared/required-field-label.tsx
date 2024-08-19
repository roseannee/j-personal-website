import { FormLabel } from "../ui/form"
import { Asterisk } from "./asterisk"

export const RequiredFieldLabel = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return (
    <FormLabel>
      {children}
      <Asterisk />
    </FormLabel>
  )
}
