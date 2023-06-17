"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { emailPasswordSignIn } from "supertokens-auth-react/recipe/thirdpartyemailpassword"
import { z } from "zod"

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

type LoginSchemaType = z.infer<typeof loginSchema>

export const LoginForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async ({ email, password }: LoginSchemaType) => {
    try {
      let response = await emailPasswordSignIn({
        formFields: [
          {
            id: "email",
            value: email,
          },
          {
            id: "password",
            value: password,
          },
        ],
      })

      if (response.status === "FIELD_ERROR") {
        response.formFields.forEach((formField) => {
          if (formField.id === "email") {
            // Email validation failed (for example incorrect email syntax).
            window.alert(formField.error)
          }
        })
      } else if (response.status === "WRONG_CREDENTIALS_ERROR") {
        window.alert("Email password combination is incorrect.")
      } else {
        // sign in successful. The session tokens are automatically handled by
        // the frontend SDK.
        window.location.href = "/"
      }
    } catch (err: any) {
      if (err.isSuperTokensGeneralError === true) {
        // this may be a custom error message sent from the API by you.
        window.alert(err.message)
      } else {
        window.alert("Oops! Something went wrong.")
      }
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="email">Email</label>
      <Controller
        name="email"
        control={control}
        rules={{ required: true }}
        render={({ field }) => <input id="email" type="email" {...field} />}
      />

      <label htmlFor="password">Password</label>
      <Controller
        name="password"
        control={control}
        rules={{ required: true }}
        render={({ field }) => <input id="password" type="password" {...field} />}
      />
      <button type="submit">Login</button>
    </form>
  )
}
