"use client"

import dynamic from "next/dynamic"
import { useEffect } from "react"
import { redirectToAuth } from "supertokens-auth-react"
import { ThirdPartyEmailPasswordPreBuiltUI } from "supertokens-auth-react/recipe/thirdpartyemailpassword/prebuiltui"
import { canHandleRoute, getRoutingComponent } from "supertokens-auth-react/ui"

const SuperTokensComponentNoSSR = dynamic<{}>(
  new Promise((res) => res(() => getRoutingComponent([ThirdPartyEmailPasswordPreBuiltUI]))),
  { ssr: false },
)

export default function Auth() {
  // if the user visits a page that is not handled by us (like /auth/random), then we redirect them back to the auth page.
  useEffect(() => {
    if (canHandleRoute([ThirdPartyEmailPasswordPreBuiltUI]) === false) {
      redirectToAuth()
    }
  }, [])

  return <SuperTokensComponentNoSSR />
}
