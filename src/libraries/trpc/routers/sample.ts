
import { t, publicProcedure } from "../trpc"

export const sampleRouter = t.router({
  get: publicProcedure.query(() => {
      return { text: "Hello world!" }
  }),
})
