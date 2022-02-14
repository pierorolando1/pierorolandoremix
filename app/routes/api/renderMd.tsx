import { DataFunctionArgs } from "@remix-run/server-runtime"
import { log } from "~/utils"

export const action = async (ctx: DataFunctionArgs) => {
  switch (ctx.request.method) {
    case "POST": {
      log(ctx.request.headers)
      log((await ctx.request.json()).pinga)
      return {
        status: 200,
      }

    }
  }
}
