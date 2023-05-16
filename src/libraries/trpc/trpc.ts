import { initTRPC, TRPCError } from "@trpc/server"
import superjson from "superjson"
import { Context } from "./context"

export const t = initTRPC.context<Context>().create({
  transformer: superjson,
})

export const isAuthed = t.middleware(({ ctx, next }) => {
  if (!ctx.session?.user?.email) {
    throw new TRPCError({ code: "UNAUTHORIZED" })
  }
  return next({
    ctx: {
      auth: ctx.session.user,
    },
  })
})

export const publicProcedure = t.procedure
export const authedProcedure = t.procedure.use(isAuthed)
