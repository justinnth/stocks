"use client"

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useState } from "react"

import { Button } from "@/components/atoms/Button"
import { Icons } from "@/components/atoms/Icons"

type SocialSignInButtonProps = {
  provider: "google" | "github"
  text: string
}

export const SocialSignInButton = ({ provider, text }: SocialSignInButtonProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const supabase = createClientComponentClient()

  const socialSignInClicked = async () => {
    setIsLoading(true)
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider,
      })

      setIsLoading(false)

      console.log(data, error)
    } catch (err: any) {
      window.alert(err.message)
      window.alert("Oops! Something went wrong.")
    }
  }

  const Icon = () => {
    switch (provider) {
      case "google":
        return <Icons.google className="mr-2 h-4 w-4" />

      case "github":
        return <Icons.gitHub className="mr-2 h-4 w-4" />
    }
  }

  return (
    <Button
      variant="outline"
      type="button"
      disabled={isLoading}
      onClick={socialSignInClicked}
      className="grow"
    >
      {isLoading ? <Icons.spinner className="mr-2 h-4 w-4 animate-spin" /> : <Icon />}
      {text}
    </Button>
  )
}
