import { Metadata } from "next"
import Link from "next/link"

import { buttonVariants } from "@/components/atoms/Button"
import { LoginForm } from "@/components/organisms/LoginForm"
import { cn } from "@/utils/utils"

export const metadata: Metadata = {
  title: "Signup to Stocks",
  description: "Signup page",
}

export default function SignUp() {
  return (
    <>
      <Link
        href="/login"
        className={cn(
          buttonVariants({ variant: "ghost", size: "sm" }),
          "absolute right-4 top-4 md:right-8 md:top-8",
        )}
      >
        Login
      </Link>
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">Create an account</h1>
            <p className="text-sm text-muted-foreground">
              Enter your email below to create your account
            </p>
          </div>
          <LoginForm />
        </div>
      </div>
    </>
  )
}
