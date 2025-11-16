import prisma from "@/lib/db";
import { inngest } from "./client";

import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { generateText } from "ai";

const google = createGoogleGenerativeAI();

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

export const execute = inngest.createFunction(
  { id: "execute-ai" },
  { event: "execute/ai" },
  async ({ event, step }) => {
    const { steps } = await step.ai.wrap("gemini-generate-text", generateText, {
      model: google("gemini-2.5-flash"),
      system: "You are a helpful assistant",
      prompt: "What is 2 + 2?",
    });

    return steps;
  }
);
