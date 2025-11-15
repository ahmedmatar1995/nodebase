"use client";

import React from "react";
import { Logout } from "@/features/auth/components/logout";
import { useTRPC } from "@/trpc/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

function page() {
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const { data } = useQuery(trpc.getWorkFlows.queryOptions());
  const create = useMutation(
    trpc.createWorkFlows.mutationOptions({
      onSuccess: () => {
        toast.success("Job Queued");
      },
    })
  );
  return (
    <div>
      <p>home page</p>
      <p>{JSON.stringify(data, null, 2)}</p>
      <Button
        variant="outline"
        className="m-4"
        onClick={() => create.mutate({ name: "hello trpc" })}
        disabled={create.isPending}
      >
        create workflow
      </Button>

      <Logout />
    </div>
  );
}

export default page;
