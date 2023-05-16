
import { t, publicProcedure } from "../trpc"

export const sampleRouter = t.router({
  get: publicProcedure.query(async ({ input, ctx }) => {
      return { text: "Hello world!" }
  }),
})
