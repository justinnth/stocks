"use client"

import { useState } from "react"
import { getAuthorisationURLWithQueryParamsAndSetState } from "supertokens-auth-react/recipe/thirdpartyemailpassword"

import { Button } from "@/components/atoms/Button"
import { Icons } from "@/components/atoms/Icons"

type SocialSignInButtonProps = {
  provider: string
  text: string
}

export const SocialSignInButton = ({ provider, text }: SocialSignInButtonProps) => {
  const [isLoading, setIsLoading] = useState(false)

  const socialSignInClicked = async () => {
    setIsLoading(true)
    try {
      const authUrl = await getAuthorisationURLWithQueryParamsAndSetState({
        providerId: provider,
        authorisationURL: `http://localhost:3000/auth/callback/${provider}`,
      })

      setIsLoading(false)

      /*
        Example value of authUrl: https://accounts.google.com/o/oauth2/v2/auth/oauthchooseaccount?scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email&access_type=offline&include_granted_scopes=true&response_type=code&client_id=1060725074195-kmeum4crr01uirfl2op9kd5acmi9jutn.apps.googleusercontent.com&state=5a489996a28cafc83ddff&redirect_uri=https%3A%2F%2Fsupertokens.io%2Fdev%2Foauth%2Fredirect-to-app&flowName=GeneralOAuthFlow
        */

      // we redirect the user to google for auth.
      window.location.assign(authUrl)
    } catch (err: any) {
      if (err.isSuperTokensGeneralError === true) {
        // this may be a custom error message sent from the API by you.
        window.alert(err.message)
      } else {
        window.alert("Oops! Something went wrong.")
      }
    }
  }

  const Icon = () => {
    switch (provider) {
      case "google":
        return <Icons.google className="mr-2 h-4 w-4" />

      case "apple":
        return <Icons.apple className="mr-2 h-4 w-4" />

      case "github":
        return <Icons.gitHub className="mr-2 h-4 w-4" />
    }
  }

  return (
    <Button variant="outline" type="button" disabled={isLoading} onClick={socialSignInClicked}>
      {isLoading ? <Icons.spinner className="mr-2 h-4 w-4 animate-spin" /> : <Icon />}
      {text}
    </Button>
  )
}
