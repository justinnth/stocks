import Link from "next/link"

import { LoginForm } from "@/components/LoginForm"

export default function Login() {
  return (
    <main>
      <h1>Login</h1>
      <LoginForm />
      <p>
        No account?
        <Link href="/sign-up">Sign up</Link>
      </p>
    </main>
  )
}
