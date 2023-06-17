"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { HTMLAttributes, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { emailPasswordSignUp } from "supertokens-auth-react/recipe/thirdpartyemailpassword"
import { z } from "zod"

import { Button } from "@/components/atoms/Button"
import { Icons } from "@/components/atoms/Icons"
import { Input } from "@/components/atoms/Input"
import { Label } from "@/components/atoms/Label"
import { SocialSignInButton } from "@/components/molecules/SocialSignInButton"
import { cn } from "@/lib/utils"

const signUpSchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

type SignUpSchemaType = z.infer<typeof signUpSchema>

interface SignUpFormProps extends HTMLAttributes<HTMLDivElement> {}

export const SignUpForm = ({ className, ...props }: SignUpFormProps) => {
  const [isLoading, setIsLoading] = useState(false)

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpSchemaType>({
    resolver: zodResolver(signUpSchema),
  })

  const onSubmit = async ({ email, password }: SignUpSchemaType) => {
    setIsLoading(true)

    try {
      const response = await emailPasswordSignUp({
        formFields: [
          {
            id: "email",
            value: email,
          },
          {
            id: "password",
            value: password,
          },
        ],
      })

      if (response.status === "FIELD_ERROR") {
        // one of the input formFields failed validaiton
        response.formFields.forEach((formField) => {
          if (formField.id === "email") {
            // Email validation failed (for example incorrect email syntax),
            // or the email is not unique.
            window.alert(formField.error)
          } else if (formField.id === "password") {
            // Password validation failed.
            // Maybe it didn't match the password strength
            window.alert(formField.error)
          }
        })
      } else {
        setIsLoading(false)
        window.location.href = "/dashboard"
      }
    } catch (err: any) {
      if (err.isSuperTokensGeneralError === true) {
        // this may be a custom error message sent from the API by you.
        window.alert(err.message)
      } else {
        window.alert("Oops! Something went wrong.")
      }
    }
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Controller
              name="email"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Input
                  id="email"
                  placeholder="name@example.com"
                  type="email"
                  autoCapitalize="none"
                  autoComplete="email"
                  autoCorrect="off"
                  disabled={isLoading}
                  {...field}
                />
              )}
            />

            <Label className="sr-only" htmlFor="password">
              Password
            </Label>

            <Controller
              name="password"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Input
                  id="password"
                  type="password"
                  placeholder="password"
                  autoCapitalize="none"
                  autoCorrect="off"
                  disabled={isLoading}
                  {...field}
                />
              )}
            />
          </div>
          <Button type="submit" disabled={isLoading}>
            {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
            Create account with email
          </Button>
        </div>
      </form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
        </div>
      </div>

      <div className="flex justify-between">
        <SocialSignInButton provider="google" text="Google" />
        <SocialSignInButton provider="github" text="Github" />
        <SocialSignInButton provider="apple" text="Apple" />
      </div>
    </div>
  )
}
