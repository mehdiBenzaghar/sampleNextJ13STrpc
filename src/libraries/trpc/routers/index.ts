import { inferRouterInputs, inferRouterOutputs } from "@trpc/server"
import { sampleRouter } from "./sample"
import { t } from "../trpc"

export const router = t.router({
  sample: sampleRouter,
})

/** export type definition of API */
export type Router = typeof router

/**
 * Inference helper for inputs
 *
 * @example type HelloInput = RouterInputs['example']['hello']
 **/
export type RouterInputs = inferRouterInputs<Router>

/**
 * Inference helper for outputs
 *
 * @example type HelloOutput = RouterOutputs['example']['hello']
 **/
export type RouterOutputs = inferRouterOutputs<Router>