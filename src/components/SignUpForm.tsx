"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { emailPasswordSignUp } from "supertokens-auth-react/recipe/thirdpartyemailpassword"
import { z } from "zod"

const signUpSchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

type SignUpSchemaType = z.infer<typeof signUpSchema>

export const SignUpForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpSchemaType>({
    resolver: zodResolver(signUpSchema),
  })

  const onSubmit = async ({ email, password }: SignUpSchemaType) => {
    try {
      const response = await emailPasswordSignUp({
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
        // one of the input formFields failed validaiton
        response.formFields.forEach((formField) => {
          if (formField.id === "email") {
            // Email validation failed (for example incorrect email syntax),
            // or the email is not unique.
            window.alert(formField.error)
          } else if (formField.id === "password") {
            // Password validation failed.
            // Maybe it didn't match the password strength
            window.alert(formField.error)
          }
        })
      } else {
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
      <button type="submit">Create account</button>
    </form>
  )
}
