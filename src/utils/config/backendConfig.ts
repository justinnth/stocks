import Dashboard from "supertokens-node/recipe/dashboard"
import SessionNode from "supertokens-node/recipe/session"
import ThirdPartyEmailPasswordNode from "supertokens-node/recipe/thirdpartyemailpassword"
import { TypeInput } from "supertokens-node/types"

import { appInfo } from "@/utils/config/appInfo"

export const backendConfig = (): TypeInput => {
  return {
    framework: "express",
    supertokens: {
      connectionURI:
        "https://dev-d3a72c810c8b11eea5b579bfe02c0a22-eu-west-1.aws.supertokens.io:3572",
      apiKey: "euJxXReryVTAbM1eFLpR8NfI0m-HuP",
    },
    appInfo,
    recipeList: [
      ThirdPartyEmailPasswordNode.init({
        providers: [
          ThirdPartyEmailPasswordNode.Google({
            clientId: "1060725074195-kmeum4crr01uirfl2op9kd5acmi9jutn.apps.googleusercontent.com",
            clientSecret: "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",
          }),
          ThirdPartyEmailPasswordNode.Github({
            clientId: "467101b197249757c71f",
            clientSecret: "e97051221f4b6426e8fe8d51486396703012f5bd",
          }),
          ThirdPartyEmailPasswordNode.Apple({
            clientId: "4398792-io.supertokens.example.service",
            clientSecret: {
              keyId: "7M48Y4RYDL",
              privateKey:
                "-----BEGIN PRIVATE KEY-----\nMIGTAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBHkwdwIBAQQgu8gXs+XYkqXD6Ala9Sf/iJXzhbwcoG5dMh1OonpdJUmgCgYIKoZIzj0DAQehRANCAASfrvlFbFCYqn3I2zeknYXLwtH30JuOKestDbSfZYxZNMqhF/OzdZFTV0zc5u5s3eN+oCWbnvl0hM+9IW0UlkdA\n-----END PRIVATE KEY-----",
              teamId: "YWQCXGJRJL",
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
