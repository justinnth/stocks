import { z } from "zod"

const envVariables = z.object({
  SUPERTOKENS_CONNECTION_URI: z.string(),
  SUPERTOKENS_API_KEY: z.string(),
  GOOGLE_CLIENT_ID: z.string(),
  GOOGLE_CLIENT_SECRET: z.string(),
  GITHUB_CLIENT_ID: z.string(),
  GITHUB_CLIENT_SECRET: z.string(),
  APPLE_CLIENT_ID: z.string(),
  APPLE_KEY_ID: z.string(),
  APPLE_PRIVATE_KEY: z.string(),
  APPLE_TEAM_ID: z.string(),
  DATABASE_URL: z.string(),
})

envVariables.parse(process.env)

declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof envVariables> {}
  }
}
