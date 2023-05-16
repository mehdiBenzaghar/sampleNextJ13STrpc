import type { CreateNextContextOptions } from "@trpc/server/adapters/next"
import { inferAsyncReturnType } from "@trpc/server"
import { Session } from "next-auth";
import { getServerAuthSession } from "../auth/get-server-auth-session";


export const createContext = async ({ req, res }: CreateNextContextOptions) => {
 
  const session: Session | null = await getServerAuthSession({ req, res });
  return {
    session,
  }
}

export type Context = inferAsyncReturnType<typeof createContext>