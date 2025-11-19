import { inferInput } from "@trpc/tanstack-react-query";
import { trpc, prefetch } from "@/trpc/server";
import { TRPCError } from "@trpc/server";

type Input = inferInput<typeof trpc.workflows.getWorkFlows>;

export const prefetchWorkFlows = (params: Input) => {
  return prefetch(trpc.workflows.getWorkFlows.queryOptions(params));
};

export const prefetchWorkFlow = (id: string) => {
  return prefetch(trpc.workflows.getWorkFlow.queryOptions({ id }));
};
