import prisma from "@/lib/db";
import {
  createTRPCRouter,
  premiumProcedure,
  protectedProcedure,
} from "@/trpc/init";
import { z } from "zod";
import { generateSlug } from "random-word-slugs";

export const workFlowsRouter = createTRPCRouter({
  create: premiumProcedure.mutation(async ({ ctx }) => {
    return await prisma.workFlow.create({
      data: {
        name: generateSlug(3),
        userId: ctx.auth.user.id,
      },
    });
  }),
  remove: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return await prisma.workFlow.delete({
        where: {
          id: input.id,
          userId: ctx.auth.user.id,
        },
      });
    }),

  updateName: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string().min(4),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return await prisma.workFlow.update({
        where: {
          id: input.id,
          userId: ctx.auth.user.id,
        },
        data: {
          name: input.name,
        },
      });
    }),

  getWorkFlows: protectedProcedure.query(async ({ ctx }) => {
    return await prisma.workFlow.findMany({
      where: {
        userId: ctx.auth.user.id,
      },
    });
  }),
  getWorkFlow: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      return await prisma.workFlow.findFirst({
        where: {
          id: input.id,
          userId: ctx.auth.user.id,
        },
      });
    }),
});
