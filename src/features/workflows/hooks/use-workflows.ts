import { useTRPC } from "@/trpc/client";
import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useSuspenseWorkFlows = () => {
  const trpc = useTRPC();
  return useSuspenseQuery(trpc.workflows.getWorkFlows.queryOptions());
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
          trpc.workflows.getWorkFlows.queryOptions()
        );
      },
      onError: (error) => {
        toast.error(`Failed to create a workflow ${error.message}`);
      },
    })
  );
};
