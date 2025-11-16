import { inngest } from "@/inngest/client";
import { baseProcedure, createTRPCRouter, protectedProcedure } from "../init";
import prisma from "@/lib/db";
import { z } from "zod";
import { google } from "@ai-sdk/google";
import { generateText } from "ai";

export const appRouter = createTRPCRouter({
  testAI: protectedProcedure.mutation(async () => {
    const steps = await inngest.send({
      name: "execute/ai",
    });

    return { success: true, steps };
  }),
  getWorkFlows: protectedProcedure.query(async ({ ctx }) => {
    const workFlows = await prisma.workFlow.findMany();
    return workFlows;
  }),
  createWorkFlows: protectedProcedure
    .input(
      z.object({
        name: z.string().min(4),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const response = await inngest.send({
        name: "app/create-workflow",
      });

      return { success: true };
    }),
});

// export type definition of API
export type AppRouter = typeof appRouter;
