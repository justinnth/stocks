import { LineChart } from "lucide-react"
import { Metadata } from "next"
import Link from "next/link"

import { buttonVariants } from "@/components/atoms/Button"
import { SignUpForm } from "@/components/SignUpForm"
import { cn } from "@/lib/utils"

export const metadata: Metadata = {
  title: "Signup to Stocks",
  description: "Signup page",
}

export default function SignUp() {
  return (
    <>
      <div className="container relative hidden h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <Link
          href="/login"
          className={cn(
            buttonVariants({ variant: "ghost", size: "sm" }),
            "absolute right-4 top-4 md:right-8 md:top-8",
          )}
        >
          Login
        </Link>
        <div className="relative hidden h-screen flex-col bg-muted p-10 text-white dark:border-r lg:flex">
          <div
            className="absolute inset-0 bg-cover"
            style={{
              backgroundImage:
                "url(https://images.unsplash.com/photo-1590069261209-f8e9b8642343?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1376&q=80)",
            }}
          />
          <div className="relative z-20 flex items-center text-lg font-medium">
            <LineChart className="mr-2 h-6 w-6" /> Stocks
          </div>
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">Create an account</h1>
              <p className="text-sm text-muted-foreground">
                Enter your email below to create your account
              </p>
            </div>
            <SignUpForm />
          </div>
        </div>
      </div>
    </>
  )
}
