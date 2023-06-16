"use client"

import { ReactNode } from "react"
import { SuperTokensWrapper } from "supertokens-auth-react"
import SuperTokensReact from "supertokens-auth-react"

import { frontendConfig } from "@/utils/config/frontendConfig"

if (typeof window !== "undefined") {
  // we only want to call this init function on the frontend, so we check typeof window !== 'undefined'
  SuperTokensReact.init(frontendConfig)
}

export const Providers = ({ children }: { children: ReactNode }) => {
  return <SuperTokensWrapper>{children}</SuperTokensWrapper>
}
