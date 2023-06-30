import { Metadata } from "next"
import Link from "next/link"

import { buttonVariants } from "@/components/atoms/Button"
import { LoginForm } from "@/components/organisms/LoginForm"
import { cn } from "@/utils/cn"

export const metadata: Metadata = {
  title: "Login to Stocks",
  description: "Login page",
}

export default function Login() {
  return (
    <>
      <Link
        href="/sign-up"
        className={cn(
          buttonVariants({ variant: "ghost", size: "sm" }),
          "absolute right-4 top-4 md:right-8 md:top-8",
        )}
      >
        Create an account
      </Link>
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">Sign in to your account</h1>
            <p className="text-sm text-muted-foreground">Enter your email below to sign in</p>
          </div>
          <LoginForm />
        </div>
      </div>
    </>
  )
}
