"use client"

import { SessionAuth } from "supertokens-auth-react/recipe/session"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <SessionAuth>{children}</SessionAuth>
}
