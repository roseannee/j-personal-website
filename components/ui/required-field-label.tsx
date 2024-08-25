import { Asterisk } from "./asterisk"
import { FormLabel } from "./form"

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
