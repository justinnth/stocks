import Link from "next/link"

import { SignUpForm } from "@/components/SignUpForm"

export default function SignUp() {
  return (
    <main>
      <h1>Ceate account</h1>
      <SignUpForm />
      <p>
        Already have an account? <Link href="/login">Sign in</Link>
      </p>
    </main>
  )
}
