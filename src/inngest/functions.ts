import prisma from "@/lib/db";
import { inngest } from "./client";

export const createWorkFlow = inngest.createFunction(
  { id: "create-workflow" },
  { event: "app/create-workflow" },
  async ({ event, step }) => {
    await step.sleep("Fetching The Video", "5s");

    await step.sleep("Transcribing The Video", "5s");

    await step.sleep("Sending The Video To AI", "5s");

    await step.run("create-workflow", async () => {
      return await prisma.workFlow.create({
        data: {
          name: "hello trpc",
        },
      });
    });
  }
);
