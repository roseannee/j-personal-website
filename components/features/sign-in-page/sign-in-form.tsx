import { useState } from "react"
import { useRouter } from "next/navigation"
import { signIn } from "@/actions/auth.actions"
import { SignIn, SignInSchema } from "@/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

import { ButtonStatus } from "@/types/button-status"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { SubmitButton } from "@/components/ui/submit-button"

export const SignInForm = () => {
  const router = useRouter()

  const [status, setStatus] = useState<ButtonStatus>("idle")

  const form = useForm<SignIn>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  })

  async function onSubmit(values: SignIn) {
    setStatus("loading")

    const res = await signIn(values)

    setStatus("idle")

    if (res.success) {
      form.reset()
      toast.success("Авторизація пройшла успішно!")
      router.push("/")
    } else {
      toast.error(`Щось пішло не так: ${res.message}`)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ім&apos;я користувача</FormLabel>

              <FormControl>
                <Input placeholder="john_doe" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Пароль</FormLabel>

              <FormControl>
                <Input type="password" placeholder="*******" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <SubmitButton status={status} className="!mt-6" />
      </form>
    </Form>
  )
}
