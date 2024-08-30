import { Patient } from "@/types"

import { FormProps } from "@/types/form-props"

import { GenderSelector } from "../gender-selector"
import { PhoneInput } from "../phone-input"
import { Button } from "../ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible"
import { DateSelector } from "../ui/date-selector"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form"
import { Input } from "../ui/input"
import { RequiredFieldLabel } from "../ui/required-field-label"
import { SubmitButton } from "../ui/submit-button"
import { Switch } from "../ui/switch"
import { Icons } from "./icons"

export const GeneralInfoForm = ({
  form,
  onSubmit,
  status,
}: FormProps<Patient>) => {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <RequiredFieldLabel>ПІБ</RequiredFieldLabel>

              <FormControl>
                <Input placeholder="Іван Іванович Іваненко" {...field} />
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
              <RequiredFieldLabel>Стать</RequiredFieldLabel>

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
              <RequiredFieldLabel>Дата народження</RequiredFieldLabel>

              <DateSelector field={field} />

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="allergies"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between">
              <FormLabel>Алергія</FormLabel>

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
            <FormLabel>Способи зв&apos;язку</FormLabel>

            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="icon">
                <Icons.chevrons />
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

                  <FormDescription>
                    Номер телефону. Немає необхідності вписувати код країни.
                  </FormDescription>
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

        <SubmitButton status={status} />
      </form>
    </Form>
  )
}
