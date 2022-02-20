import { createPagesFunctionHandler } from "@remix-run/cloudflare-pages"
import { createCloudflareKVSessionStorage } from "@remix-run/cloudflare-pages"

import * as build from "@remix-run/dev/server-build";

const handleRequest = createPagesFunctionHandler({
  build,
  getLoadContext: (context) => {
    console.log(context);
    if (!context.env.COOKIE_SECRET) {
      throw Error("Missing COOKIE_SECRET env.")
    }

    const sessionStorage = createCloudflareKVSessionStorage({
      cookie: {
        name: "SESSION_ID",
        secrets: [context.env.COOKIE_SECRET],
        secure: true,
        sameSite: "strict",
        maxAge: 14 * 24 * 60 * 60
      },
      kv: context.env.sessionStorage,
    })

    return { sessionStorage }
  },
})

export function onRequest(context) {
  return handleRequest(context)
}
