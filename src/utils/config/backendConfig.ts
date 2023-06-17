import Dashboard from "supertokens-node/recipe/dashboard"
import SessionNode from "supertokens-node/recipe/session"
import ThirdPartyEmailPasswordNode from "supertokens-node/recipe/thirdpartyemailpassword"
import { TypeInput } from "supertokens-node/types"

import { appInfo } from "@/utils/config/appInfo"

export const backendConfig = (): TypeInput => {
  return {
    framework: "express",
    supertokens: {
      connectionURI: process.env.SUPERTOKENS_CONNECTION_URI,
      apiKey: process.env.SUPERTOKENS_API_KEY,
    },
    appInfo,
    recipeList: [
      ThirdPartyEmailPasswordNode.init({
        providers: [
          ThirdPartyEmailPasswordNode.Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          }),
          ThirdPartyEmailPasswordNode.Github({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
          }),
          ThirdPartyEmailPasswordNode.Apple({
            clientId: process.env.APPLE_CLIENT_ID,
            clientSecret: {
              keyId: process.env.APPLE_KEY_ID,
              privateKey: process.env.APPLE_PRIVATE_KEY,
              teamId: process.env.APPLE_TEAM_ID,
            },
          }),
        ],
      }),
      SessionNode.init(),
      Dashboard.init(),
    ],
    isInServerlessEnv: true,
  }
}
