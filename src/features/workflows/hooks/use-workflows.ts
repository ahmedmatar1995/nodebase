import { useTRPC } from "@/trpc/client";
import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useWorkFlowParams } from "./use-workflow-params";

export const useSuspenseWorkFlows = () => {
  const trpc = useTRPC();
  const [params] = useWorkFlowParams();
  return useSuspenseQuery(trpc.workflows.getWorkFlows.queryOptions(params));
};

export const useSuspenseWorkFlow = (id: string) => {
  const trpc = useTRPC();
  return useSuspenseQuery(trpc.workflows.getWorkFlow.queryOptions({ id }));
};

export const useCreateWorkFlow = () => {
  const router = useRouter();
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  return useMutation(
    trpc.workflows.create.mutationOptions({
      onSuccess: (data) => {
        toast.success("a workflow has been creatd");
        console.log(data);
        router.push(`/workflows/${data.id}`);
        queryClient.invalidateQueries(
          trpc.workflows.getWorkFlows.queryOptions({})
        );
      },
      onError: (error) => {
        toast.error(`Failed to create a workflow ${error.message}`);
      },
    })
  );
};

export const useRemoveWorkFlow = () => {
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  return useMutation(
    trpc.workflows.remove.mutationOptions({
      onSuccess: (data) => {
        console.log(data);
        toast.success(`WorkFlow "${data.name}" has been removed`);
        queryClient.invalidateQueries(
          trpc.workflows.getWorkFlows.queryOptions({})
        );
        queryClient.invalidateQueries(
          trpc.workflows.getWorkFlow.queryFilter({ id: data.id })
        );
      },
      onError: (error) => {
        toast.error(error.message);
      },
    })
  );
};

export const useUpdateWorkFlow = () => {
  const trpc = useTRPC();
  const router = useRouter();
  const queryClient = useQueryClient();
  return useMutation(
    trpc.workflows.updateName.mutationOptions({
      onSuccess: (data) => {
        toast.success(`WorkFlow "${data.name}" has been updated`);
        queryClient.invalidateQueries(
          trpc.workflows.getWorkFlows.queryOptions({})
        );
        queryClient.invalidateQueries(
          trpc.workflows.getWorkFlow.queryOptions({ id: data.id })
        );
      },
      onError: (error) => {
        toast.error(`Failed to Update Workflow ${error.message}`);
      },
    })
  );
};
