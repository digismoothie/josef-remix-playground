import { createPagesFunctionHandler } from "@remix-run/cloudflare-pages"
import { createCloudflareKVSessionStorage } from "@remix-run/cloudflare-pages"

import * as build from "@remix-run/dev/server-build";

const handleRequest = createPagesFunctionHandler({
  build,
  getLoadContext: (context) => {
    const sessionStorage = createCloudflareKVSessionStorage({
      cookie: {
        name: "SESSION_ID",
        secrets: ["YOUR_COOKIE_SECRET"],
        secure: true,
        sameSite: "strict",
      },
      kv: context.env.sessionStorage,
    })

    return { sessionStorage }
  },
})

export function onRequest(context) {
  return handleRequest(context)
}
