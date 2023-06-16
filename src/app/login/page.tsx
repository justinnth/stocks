import { SignInForm } from "@/components/SignInForm"
import { SignUpForm } from "@/components/SignUpForm"

export default function Login() {
  return (
    <main>
      <h1>Ceate account</h1>
      <SignUpForm />
      <hr />
      <h1>Login</h1>
      <SignInForm />
    </main>
  )
}
