import { PatientSchema } from "@/types"
import { UseFormReturn } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Icons } from "@/components/shared/icons"

import { DobSelector } from "./dob-selector"
import { GenderSelector } from "./gender-selector"
import { PhoneInput } from "./phone-input"

interface GeneralInfoFormProps {
  form: UseFormReturn<
    {
      fullName: string
      gender: "male" | "female"
      birthdate: Date
      allergies: boolean
      phoneNumber?: string | undefined
      telegram?: string | undefined
      instagram?: string | undefined
    },
    any,
    undefined
  >
  onSubmit: (values: z.infer<typeof PatientSchema>) => Promise<void>
  status: "idle" | "loading"
}

export const GeneralInfoForm = ({
  form,
  onSubmit,
  status,
}: GeneralInfoFormProps) => {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full name</FormLabel>
              <FormControl>
                <Input placeholder="Ivan Ivanovich Ivanov" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="gender"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Gender</FormLabel>
              <GenderSelector form={form} field={field} />
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="birthdate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date of birth</FormLabel>
              <DobSelector field={field} />
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="allergies"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between">
              <FormLabel>Allergies</FormLabel>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  className="!m-0"
                />
              </FormControl>
            </FormItem>
          )}
        />

        <Collapsible>
          <div className="flex items-center justify-between">
            <FormLabel>Contact methods</FormLabel>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="icon">
                <Icons.chevrons />
                <span className="sr-only">Toggle</span>
              </Button>
            </CollapsibleTrigger>
          </div>

          <div>
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <PhoneInput field={field} />
                  </FormControl>
                  <FormDescription>Phone number</FormDescription>
                </FormItem>
              )}
            />
          </div>

          <CollapsibleContent className="mt-3.5 space-y-3.5">
            <FormField
              control={form.control}
              name="telegram"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="telegram_username" {...field} />
                  </FormControl>
                  <FormDescription>Telegram</FormDescription>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="instagram"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="instagram_username" {...field} />
                  </FormControl>
                  <FormDescription>Instagram</FormDescription>
                </FormItem>
              )}
            />
          </CollapsibleContent>
        </Collapsible>

        <Button
          type="submit"
          disabled={status === "loading"}
          className="w-full gap-2"
        >
          {status === "loading" ? (
            <>
              Submitting...
              <Icons.loader className="animate-spin" />
            </>
          ) : (
            "Submit"
          )}
        </Button>
      </form>
    </Form>
  )
}
