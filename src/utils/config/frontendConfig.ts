import { redirect } from "next/navigation"
import SessionReact from "supertokens-auth-react/recipe/session"
import ThirdPartyEmailPasswordReact from "supertokens-auth-react/recipe/thirdpartyemailpassword"

import { appInfo } from "@/utils/config/appInfo"

export const frontendConfig = {
  appInfo,
  recipeList: [
    ThirdPartyEmailPasswordReact.init({
      signInAndUpFeature: {
        providers: [
          ThirdPartyEmailPasswordReact.Google.init(),
          ThirdPartyEmailPasswordReact.Github.init(),
          ThirdPartyEmailPasswordReact.Apple.init(),
        ],
      },
    }),
    SessionReact.init(),
  ],
  windowHandler: (oI: any) => {
    return {
      ...oI,
      location: {
        ...oI.location,
        setHref: (href: string) => {
          console.log(href)
          redirect(href)
        },
      },
    }
  },
}
