"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import {
  emailPasswordSignUp,
  getAuthorisationURLWithQueryParamsAndSetState,
} from "supertokens-auth-react/recipe/thirdpartyemailpassword"
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

  const googleSignInClicked = async () => {
    try {
      const authUrl = await getAuthorisationURLWithQueryParamsAndSetState({
        providerId: "google",
        authorisationURL: "http://localhost:3000/auth/callback/google",
      })

      /*
        Example value of authUrl: https://accounts.google.com/o/oauth2/v2/auth/oauthchooseaccount?scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email&access_type=offline&include_granted_scopes=true&response_type=code&client_id=1060725074195-kmeum4crr01uirfl2op9kd5acmi9jutn.apps.googleusercontent.com&state=5a489996a28cafc83ddff&redirect_uri=https%3A%2F%2Fsupertokens.io%2Fdev%2Foauth%2Fredirect-to-app&flowName=GeneralOAuthFlow
        */

      console.log(authUrl)

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

  const githubSignInClicked = async () => {
    try {
      const authUrl = await getAuthorisationURLWithQueryParamsAndSetState({
        providerId: "github",
        authorisationURL: "http://localhost:3000/auth/callback/github",
      })

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

  const appleSignInClicked = async () => {
    try {
      const authUrl = await getAuthorisationURLWithQueryParamsAndSetState({
        providerId: "apple",
        authorisationURL: "http://localhost:3000/auth/callback/apple",
      })

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

  return (
    <>
      <button onClick={googleSignInClicked}>Sign up with Google</button>
      <button onClick={githubSignInClicked}>Sign up with Github</button>
      <button onClick={appleSignInClicked}>Sign up with Apple</button>
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
    </>
  )
}
