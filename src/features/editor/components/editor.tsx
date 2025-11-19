"use client";

import { useSuspenseWorkFlow } from "@/features/workflows/hooks/use-workflows";

export const Editor = ({ workflowId }: { workflowId: string }) => {
  const { data: workflow } = useSuspenseWorkFlow(workflowId);
  return (
    <div>
      <p>{JSON.stringify(workflow, null, 2)}</p>
    </div>
  );
};
