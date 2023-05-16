import { createNextApiHandler } from "@trpc/server/adapters/next"
import { env } from "@/env.mjs"
import { router } from "@/libraries/trpc/routers"
import { createContext } from "@/libraries/trpc/context"

// export API handler
export default createNextApiHandler({
  router,
  createContext,
  onError:
    env.NODE_ENV === "development"
      ? ({ path, error }) => {
          console.error(`❌ tRPC failed on ${path ?? "<no-path>"}: ${error.message}`)
        }
      : undefined,
})