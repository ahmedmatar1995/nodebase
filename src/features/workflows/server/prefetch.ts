import { inferInput } from "@trpc/tanstack-react-query";
import { trpc, prefetch } from "@/trpc/server";

type Input = inferInput<typeof trpc.workflows.getWorkFlows>;

export const prefetchWorkFlows = (params: Input) => {
  return prefetch(trpc.workflows.getWorkFlows.queryOptions());
};
