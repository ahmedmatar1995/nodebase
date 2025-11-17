import { inngest } from "@/inngest/client";
import { baseProcedure, createTRPCRouter, protectedProcedure } from "../init";
import prisma from "@/lib/db";
import { z } from "zod";
import { google } from "@ai-sdk/google";
import { workFlowsRouter } from "@/features/workflows/server/router";

export const appRouter = createTRPCRouter({
  workflows: workFlowsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
