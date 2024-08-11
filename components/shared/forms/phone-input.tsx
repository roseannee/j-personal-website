import { PatientSchema } from "@/types"
import { ControllerRenderProps } from "react-hook-form"
import { z } from "zod"

import { Input } from "@/components/ui/input"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"

interface PhoneInputProps {
  field: ControllerRenderProps<z.infer<typeof PatientSchema>, "phoneNumber">
}

export const PhoneInput = ({ field }: PhoneInputProps) => {
  return (
    <>
      <div className="mt-2 hidden md:block">
        <InputOTP maxLength={9} {...field}>
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            <InputOTPSlot index={5} />
            <InputOTPSlot index={6} />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            <InputOTPSlot index={7} />
            <InputOTPSlot index={8} />
          </InputOTPGroup>
        </InputOTP>
      </div>

      <Input placeholder="95 111 22 33" className="md:hidden" {...field} />
    </>
  )
}
