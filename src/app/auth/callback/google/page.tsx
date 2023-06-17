"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { thirdPartySignInAndUp } from "supertokens-auth-react/recipe/thirdpartyemailpassword"

import { Alert, AlertDescription, AlertTitle } from "@/components/atoms/Alert"
import { Icons } from "@/components/atoms/Icons"

export default function GoogleCallback() {
  const router = useRouter()

  useEffect(() => {
    handleGoogleCallback()
  })

  const handleGoogleCallback = async () => {
    try {
      const response = await thirdPartySignInAndUp()

      if (response.status === "OK") {
        if (response.createdNewUser) {
          // sign up successful
        } else {
          // sign in successful
        }
        router.replace("/")
      } else {
        alert("No email provided by social login. Please use another form of login")
        router.replace("/login")
      }
    } catch (err: any) {
      if (err.isSuperTokensGeneralError === true) {
        // this may be a custom error message sent from the API by you.
        alert(err.message)
      } else {
        alert("Oops! Something went wrong.")
      }
    }
  }

  return (
    <div className="container mx-auto">
      <Alert>
        <Icons.spinner className="h-4 w-4 animate-spin" />
        <AlertTitle>Google</AlertTitle>
        <AlertDescription>Sign in successful. Redirecting...</AlertDescription>
      </Alert>
    </div>
  )
}
