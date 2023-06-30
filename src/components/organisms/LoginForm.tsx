"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { usePathname, useRouter } from "next/navigation"
import { HTMLAttributes, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/atoms/Button"
import { Icons } from "@/components/atoms/Icons"
import { Input } from "@/components/atoms/Input"
import { Label } from "@/components/atoms/Label"
import { SocialSignInButton } from "@/components/molecules/SocialSignInButton"
import { cn } from "@/utils/cn"
import { signUp } from "@/utils/signUp"

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

type LoginSchemaType = z.infer<typeof loginSchema>

interface LoginFormProps extends HTMLAttributes<HTMLDivElement> {}

export const LoginForm = ({ className, ...props }: LoginFormProps) => {
  const [isLoading, setIsLoading] = useState(false)

  const pathname = usePathname()
  const supabase = createClientComponentClient()
  const router = useRouter()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
  })

  const handleSignUp = async ({ email, password }: LoginSchemaType) => {
    setIsLoading(true)
    const res = await signUp(email, password)

    if (res && res.id) {
      setIsLoading(false)
      router.replace("/dashboard")
    }
  }

  const handleSignIn = async ({ email, password }: LoginSchemaType) => {
    try {
      setIsLoading(true)

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        throw error
      }

      if (data.user) {
        setIsLoading(false)
        window.location.href = "/dashboard"
      }
    } catch (err: any) {
      window.alert(err.message)
      window.alert("Oops! Something went wrong.")
    }
  }

  const onSubmit = ({ email, password }: LoginSchemaType) => {
    if (pathname === "/sign-up") {
      handleSignUp({ email, password })
    } else {
      handleSignIn({ email, password })
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
            {pathname === "/sign-up" ? "Sign up" : "Sign in"}
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

      <div className="flex gap-2">
        <SocialSignInButton provider="google" text="Google" />
        <SocialSignInButton provider="github" text="Github" />
      </div>
    </div>
  )
}
