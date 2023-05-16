import { NextPageContext } from "next";
import type { Router } from "./routers";
import { createTRPCReact } from "@trpc/react-query";

export const trpc = createTRPCReact<Router, NextPageContext, "ExperimentalSuspense">();